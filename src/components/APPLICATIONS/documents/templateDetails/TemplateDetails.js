import { Editor } from "@tinymce/tinymce-react";
import Alert from "components/Alert";
import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getTemplateById,
  getTemplateColumnsByTemplateId,
  updateTemplate,
} from "services/documents";

const TemplateDetails = () => {
  const { templateId } = useParams();
  const tinymceRef = useRef(null);
  const [templateCode, setTemplateCode] = useState("");
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const { data: columns = [], isLoading: columnLoading } = useQuery({
    queryKey: ["getTemplateColumnsByTemplateId", templateId],
    queryFn: () =>
      getTemplateColumnsByTemplateId(templateId).then((res) => res.data.data),
  });

  const {
    data: template = {},
    isLoading: templateLoading,
    refetch,
  } = useQuery({
    queryKey: ["getTemplateById", templateId],
    queryFn: () => getTemplateById(templateId).then((res) => res.data.data),
    onSuccess: (data) => {
      setTemplateCode(data.template_code);
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
    }, 3000);
  };

  const { mutate: updateTemplateMutation, isLoading: isUpdating } = useMutation(
    {
      mutationFn: () =>
        updateTemplate({ ...template, template_code: templateCode }),
      onSuccess: () => {
        afterRequestHandler("შაბლონი განახლებულია", "success");
      },
      onError: (error) => {
        afterRequestHandler("შაბლონი არ განახლდა", "danger");
      },
    }
  );

  const loading = columnLoading || templateLoading;

  return (
    <main className="workspace">
      <div className="card p-5">
        {loading && <LoadingSpinner blur />}
        <Alert message={alert.message} dismissable color={alert.type} />
        <h4 className="mb-3">{template.template_name}</h4>
        <div className="flex gap-1">
          {columns.map((column) => (
            <Button
              onClick={() => {
                tinymceRef.current?.editor.insertContent(
                  `<span>{${column.column_placeholder}}</span>`
                );
              }}
              className="p-1"
              key={column.id}
              outlined
            >
              {column.column_placeholder}
            </Button>
          ))}
        </div>

        <Editor
          apiKey="wcddv5w1ze3mxgx3txo2uzqwzu9pn33f2q652u47buh40yam"
          init={{
            selector: "textarea",
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          value={templateCode}
          onEditorChange={(e) => setTemplateCode(e)}
          ref={tinymceRef}
        />
        <Button onClick={updateTemplateMutation} className="p-2">
          {isUpdating ? <LoadingSpinner /> : "შენახვა"}
        </Button>
      </div>
    </main>
  );
};

export default TemplateDetails;
