import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Footer from "partials/Footer";
import { useState } from "react";

const DocEditor = () => {
  const tags = ["test", "TEST", "tagi"];
  const [data, setData] = useState("");

  return (
    <main className="workspace">
      <div className="card p-5">
        <h3>EDITOR</h3>
        <div>
          {tags.map((tag) => (
            <button
              onClick={() => {
                setData((prevState) => {
                  console.log(prevState);
                  return `${prevState} <span>${tag}</span>`;
                });
              }}
              key={tag}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <CKEditor
            editor={ClassicEditor}
            data={data}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setData(data);
              // console.log({ event, editor, data });

              console.log(data);
            }}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DocEditor;
