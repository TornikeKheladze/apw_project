import Alert from "components/Alert";
import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDocumentById, updateDocument } from "services/documents";

const DocumentEdit = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  let editor = useRef(null);

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

  const [content, setContent] = useState("");

  const { data: document, isLoading: documentLoading } = useQuery({
    queryKey: ["getDocumentById", id],
    queryFn: () => getDocumentById(id).then((res) => res.data.data),
    onSuccess: (data) => {
      setContent(data.document_code);
    },
  });

  // const { data } = useQuery({
  //   queryFn: () => getAllDocuments().then((res) => res.data.data),
  // });

  const { mutate: updateDocumentMutation, isLoading: isUpdating } = useMutation(
    {
      mutationFn: () => updateDocument({ ...document, document_code: content }),
      onSuccess: () => {
        afterRequestHandler("დოკუმენტი განახლებულია", "success");
      },
      onError: (error) => {
        afterRequestHandler("დოკუმენტი არ განახლდა", "danger");
      },
    }
  );

  const config = useMemo(() => {
    return {
      readonly: false,
      showPlaceholder: false,
      extraButtons: [
        // {
        //   name: "ცვლადის ჩასმა",
        //   exec: () => {
        //     setOpenModal({ open: true, action: "ცვლადის ჩასმა" });
        //   },
        // },
        // {
        //   name: "ციფრული მმართველობის სააგენტოს ბეჭდის ადგილი",
        //   exec: (editor) => {
        //     editor.selection.insertHTML(
        //       "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
        //       // "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; display:inline-block;'>TEST</span>"
        //     );
        //   },
        // },
      ],
      height: 600,
      // uploader: {
      //   insertImageAsBase64URI: true,
      // },
    };
  }, []);

  return (
    <main className="workspace">
      <div className="card p-5">
        {documentLoading && <LoadingSpinner blur />}
        <Alert message={alert.message} dismissable color={alert.type} />

        <h3 className="mb-5">{document?.document_name}</h3>
        {/* <div className="flex gap-1"></div> */}

        <JoditEditor
          className="jodit"
          ref={(instance) => (editor = instance)}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => {}}
        />
        <Button onClick={updateDocumentMutation} className="p-2 mt-10">
          {isUpdating ? <LoadingSpinner /> : "შენახვა"}
        </Button>
      </div>
    </main>
  );
};

export default DocumentEdit;
