import { Editor } from "@tinymce/tinymce-react";
import LoadingSpinner from "components/icons/LoadingSpinner";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllDocuments, getDocumentById } from "services/documents";

const DocumentEdit = () => {
  const { documentId } = useParams();
  const tinymceRef = useRef(null);
  const [templateCode, setTemplateCode] = useState("");

  const { data: columns = [], isLoading: columnLoading } = useQuery({
    queryKey: ["getDocumentById", documentId],
    queryFn: () => getDocumentById(documentId).then((res) => res.data.data),
  });

  const { data } = useQuery({
    queryFn: () => getAllDocuments().then((res) => res.data.data),
  });

  console.log(data, columns);

  const loading = columnLoading;

  return (
    <main className="workspace">
      <div className="card p-5">
        {loading && <LoadingSpinner blur />}
        {/* <h4 className="mb-3">{template.template_name}</h4> */}
        <div className="flex gap-1"></div>

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
      </div>
    </main>
  );
};

export default DocumentEdit;
