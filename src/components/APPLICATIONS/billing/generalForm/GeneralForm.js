import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import Radio from "components/form/Radio";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useGeneralForm from "./useGeneralForm";
import FormDropdowns from "components/APPLICATIONS/authorization/users/userForm/formDropdown/FormDropdowns";
import { useEffect } from "react";

const GeneralForm = (props) => {
  const {
    formArray,
    submitHandler,
    optionsObj,
    isLoading,
    updateDataObj = {},
    externalFields,
  } = props;

  const {
    register,
    handleSubmit,
    errors,
    formData,
    handleFormChange,
    // imageForDisplay,
    setValue,
    formObject,
  } = useGeneralForm(formArray, updateDataObj);
  // const navigate = useNavigate();
  // onSubmit={handleSubmit(async (data) => {
  //   await submitHandler(data);
  //   navigate(-1);
  // })}

  // only for user editing
  useEffect(() => {
    if (externalFields) {
      setValue("oid", {
        name: externalFields?.o_name,
        id: externalFields?.oid,
      });
      setValue("did", {
        department_name: externalFields?.department_name,
        id: externalFields?.did,
      });
      setValue("pid", {
        position_name: externalFields?.position_name,
        id: externalFields?.pid,
      });
    }
  }, [setValue, externalFields]);

  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      {formArray.map(({ name, label, type }) => {
        if (type === "select") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}
              </Label>
              <CustomSelect
                name={name}
                register={register}
                className={`${errors[name] ? "border-danger" : ""}`}
                rules={{
                  required: "ველი აუცილებელია",
                }}
              >
                <option value="">{label}</option>
                {optionsObj &&
                  optionsObj[name]?.map((item) => (
                    <option
                      className="p-3"
                      key={item.id?.toString() + item.name}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </CustomSelect>
            </div>
          );
        } else if (type === "radio") {
          if (optionsObj && optionsObj[name]) {
            return (
              <div key={name} className="flex flex-col gap-y-2 mt-5">
                <Label
                  className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
                >
                  {label}
                </Label>
                {optionsObj[name].map((item) => (
                  <Radio
                    key={item.name + item.value}
                    name={name}
                    label={item.name}
                    register={register}
                    value={item.value}
                    checked={formData[name]?.toString() === item.value}
                  />
                ))}
              </div>
            );
          } else {
            return (
              <div key={name} className="flex flex-col gap-y-2 mt-5">
                <Label
                  className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
                >
                  {label}
                </Label>
                <Radio
                  name={name}
                  label="დიახ"
                  register={register}
                  value="1"
                  checked={formData[name]?.toString() === "1"}
                />
                <Radio
                  name={name}
                  label="არა"
                  register={register}
                  value="0"
                  checked={formData[name]?.toString() === "0"}
                />
              </div>
            );
          }
        } else {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}
              </Label>

              <CustomInput
                name={name}
                type={type}
                step="any"
                register={register}
                rules={
                  name === "tell"
                    ? {
                        validate: (val) => {
                          const regex = /^9955\d{8}$/;
                          if (!regex.test(val)) {
                            return "არასწორი ფორმატი. მაგ.: 9955XXXXXXXX";
                          }
                        },
                      }
                    : {
                        required: "ველი აუცილებელია",
                      }
                }
                className={`${errors[name] ? "border-danger" : ""}`}
              />
              {name === "tell" && errors[name] && (
                <p className="text-danger text-xs">{errors[name].message}</p>
              )}

              {/* {type === "file" && (
                <img
                  src={
                    imageForDisplay ||
                    JSON.parse(localStorage.getItem("formInputData"))?.image
                  }
                  alt=""
                  className="h-32 w-auto rounded mt-2"
                />
              )} */}
            </div>
          );
        }
      })}

      {/*  only for user editing */}
      {externalFields && (
        <>
          <FormDropdowns
            formObject={formObject}
            setValue={setValue}
            errors={errors}
          />
          <input
            hidden
            name="oid"
            {...register("oid", { required: "სავალდებულო" })}
          />
          <input
            hidden
            name="did"
            {...register("did", { required: "სავალდებულო" })}
          />
          <input
            hidden
            name="pid"
            {...register("pid", { required: "სავალდებულო" })}
          />
        </>
      )}
      <div className="flex items-center justify-between">
        <Button
          disabled={isLoading}
          className="w-max min-w-[135px] flex justify-center"
        >
          {isLoading ? <LoadingSpinner /> : "დადასტურება"}
        </Button>
      </div>
    </form>
  );
};

export default GeneralForm;
