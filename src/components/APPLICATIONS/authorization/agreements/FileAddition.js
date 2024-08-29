import Label from "components/form/Label";
import FileDownload from "./FileDownload";
import CustomInput from "components/form/CustomInput";
import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";

const FileAddition = ({
  documentList = [],
  disableFields,
  fieldArray = [],
  register,
  append,
  remove,
  label,
  fieldName,
}) => {
  console.log(fieldArray);
  console.log(documentList);
  console.log(disableFields);
  return (
    <div className="border p-2 rounded-md">
      <h4 className="mb-2">{label}</h4>
      {disableFields && documentList ? (
        <>
          {documentList.map((item) => (
            <FileDownload
              key={item.id}
              name={item.doc_name}
              docId={item.doc_id}
            />
          ))}
        </>
      ) : (
        <>
          {fieldArray.map((item, index) => {
            return (
              <div
                className="mb-1 flex items-center justify-between border p-2 rounded-md border-gray-700"
                key={item.id}
              >
                <div className="w-4/5 flex flex-col gap-2">
                  <Label
                    htmlFor={`${fieldName}${index}.name`}
                    className={`block mb-1`}
                  >
                    ფაილის დასახელება
                  </Label>
                  <CustomInput
                    id={`${fieldName}${index}.name`}
                    name={`${fieldName}${index}.name`}
                    type="text"
                    step="any"
                    register={register}
                    rules={{}}
                    className="h-11 mb-1"
                    placeholder="ფაილის დასახელება"
                    disabled={disableFields ? true : false}
                  />
                  <CustomInput
                    name={`${fieldName}${index}.file`}
                    type="file"
                    step="any"
                    register={register}
                    rules={{}}
                    disabled={disableFields ? true : false}
                  />
                </div>
                {disableFields ? (
                  <></>
                ) : (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                  >
                    <span className="la la-trash-alt"></span>
                  </button>
                )}
              </div>
            );
          })}
          {disableFields ? (
            <></>
          ) : (
            <Button
              type="button"
              className="p-2 mt-3"
              onClick={() =>
                append({
                  file: "",
                  name: "",
                })
              }
            >
              ფაილის დამატება
              <PlusIcon />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FileAddition;
