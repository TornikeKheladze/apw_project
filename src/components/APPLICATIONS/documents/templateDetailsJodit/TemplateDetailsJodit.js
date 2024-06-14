import Alert from "components/Alert";
import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  createTemplateColumn,
  getAllTemplateColumnsType,
  getTemplateById,
  getTemplateColumnsByTemplateId,
  updateTemplate,
} from "services/documents";
import JoditEditor from "jodit-react";
import { convertBase64 } from "helpers/convertBase64";
import Modal, { ModalBody, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import "./jodit.css";
import PlusIcon from "components/icons/PlusIcon";
import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import { templateColumnsInTemplatesArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";

const TemplateDetailsJodit = () => {
  const { templateId } = useParams();
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [openModal, setOpenModal] = useState({ open: false, action: "" });
  let editor = useRef(null);
  const queryClient = useQueryClient();

  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const imageInputRef = useRef(null);

  const [content, setContent] = useState("");

  const { data: columns = [], isLoading: columnLoading } = useQuery({
    queryKey: ["getTemplateColumnsByTemplateId", templateId],
    queryFn: () =>
      getTemplateColumnsByTemplateId(templateId).then((res) => res.data.data),
  });

  useEffect(() => {
    if (columns?.length) {
      setFilteredColumns(columns);
    }
  }, [columns]);

  const {
    data: template = {},
    isLoading: templateLoading,
    refetch,
  } = useQuery({
    queryKey: ["getTemplateById", templateId],
    queryFn: () => getTemplateById(templateId).then((res) => res.data.data),
    onSuccess: (data) => {
      setContent(data?.template_code);
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    refetch();
  }, [templateId, refetch]);

  const afterRequestHandler = (message, type) => {
    setAlert({
      type,
      message,
    });
    setTimeout(() => {
      setAlert({
        type: "success",
        message: "",
      });
      setOpenModal({ open: false });
    }, 3000);
  };

  const { mutate: updateTemplateMutation, isLoading: isUpdating } = useMutation(
    {
      mutationFn: () => updateTemplate({ ...template, template_code: content }),
      onSuccess: () => {
        afterRequestHandler("შაბლონი განახლებულია", "success");
      },
      onError: (error) => {
        afterRequestHandler("შაბლონი არ განახლდა", "danger");
      },
    }
  );

  const loading = columnLoading || templateLoading;

  const config = useMemo(() => {
    return {
      readonly: false,
      showPlaceholder: false,
      extraButtons: [
        {
          name: "ცვლადის ჩასმა",
          exec: () => {
            setOpenModal({ open: true, action: "ცვლადის ჩასმა" });
          },
        },
        {
          name: "ბეჭდის ადგილი",
          exec: (editor) => {
            editor.selection.insertHTML(
              "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
              // "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; display:inline-block;'>TEST</span>"
            );
          },
        },
      ],
      height: 600,
      uploader: {
        insertImageAsBase64URI: true,
      },
    };
  }, []);

  const { data: templateColumnsType = [] } = useQuery({
    queryKey: "getAllTemplateColumnsType",
    queryFn: () => getAllTemplateColumnsType().then((res) => res.data.data),
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createTemplateColumn,
    onSuccess: () => {
      afterRequestHandler("column წარმატებით დაემატა", "success");
      queryClient.invalidateQueries("getTemplateColumnsByTemplateId");
    },
    onError: () => afterRequestHandler("error.response.data.message", "danger"),
  });

  const createColumn = (data) => {
    createMutate({ ...data, template_id: templateId });
  };

  return (
    <main className="workspace">
      <div className="card p-5">
        {loading && <LoadingSpinner blur />}
        <Alert message={alert.message} dismissable color={alert.type} />
        <div className="flex justify-between mb-4">
          <h3 className="mb-5">{template.template_name}</h3>

          <div className="flex gap-2 md:flex-row flex-col">
            <Button
              className="text-xs"
              to={`/documents/templateColumns/${templateId}`}
            >
              არსებული ცვლადები
            </Button>

            <Button
              className="text-xs flex gap-2"
              onClick={() =>
                setOpenModal({ open: true, action: "ცვლადის შექმნა" })
              }
            >
              <span>ცვლადის შექმნა</span> <PlusIcon />
            </Button>
          </div>
        </div>

        <input
          ref={imageInputRef}
          onChange={async (e) => {
            const bs64 = await convertBase64(e.target.files[0]);
            editor.selection.insertImage(bs64, null, 250);
            // setBase64IMG(bs64);
          }}
          onClick={(event) => (event.target.value = "")}
          type="file"
          accept="image/*"
          hidden
        />

        <Modal
          active={openModal.open}
          centered
          onClose={() => {
            setOpenModal({ open: false });
          }}
        >
          <ModalHeader>ცვლადები</ModalHeader>
          <ModalBody>
            {openModal.action === "ცვლადის ჩასმა" && (
              <>
                <Input
                  placeholder="მოძებნე სასურველი ცვლადი"
                  type="text"
                  onChange={(e) =>
                    setFilteredColumns(
                      columns.filter((column) =>
                        column.column_placeholder.includes(e.target?.value)
                      )
                    )
                  }
                />
                <div className="flex flex-col gap-4 mt-4 md:w-[400px] w-[300px] h-[200px] overflow-y-auto dark:bg-gray-900 bg-gray-100 px-3 py-4 rounded">
                  {filteredColumns?.length > 0 ? (
                    filteredColumns.map((column) => (
                      <button
                        onClick={() => {
                          setOpenModal({ open: false });
                          // console.log(editor.selection);
                          editor.selection.insertHTML(
                            `<span>{${column.column_marker}}</span>`
                          );
                          setFilteredColumns(columns);
                        }}
                        className="px-3 py-1 text-left border-primary-400 dark:border-gray-700 border rounded hover:bg-primary-800 hover:text-white dark:hover:text-white"
                        key={column.id}
                      >
                        {column.column_placeholder}
                      </button>
                    ))
                  ) : (
                    <p>ცვლადი არ მოიძებნა</p>
                  )}
                </div>
              </>
            )}
            {openModal.action === "ცვლადის შექმნა" && (
              <div className="p-5">
                <AuthForm
                  formArray={templateColumnsInTemplatesArr}
                  submitHandler={createColumn}
                  isLoading={createLoading}
                  optionsObj={{
                    column_type_id: templateColumnsType.map((item) => {
                      return { ...item, name: item.column_type };
                    }),
                  }}
                />
              </div>
            )}
          </ModalBody>
        </Modal>

        <JoditEditor
          className="jodit"
          ref={(instance) => (editor = instance)}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => {}}
        />
        <Button onClick={updateTemplateMutation} className="p-2 mt-10">
          {isUpdating ? <LoadingSpinner /> : "შენახვა"}
        </Button>
      </div>
    </main>
  );
};

export default TemplateDetailsJodit;
