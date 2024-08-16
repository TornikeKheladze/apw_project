import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useForm } from "react-hook-form";

const AuthForm = ({
  formArray,
  submitHandler,
  optionsObj,
  isLoading,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      {formArray.map(({ name, label, type, notRequired }) => {
        if (type === "select") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}{" "}
                {notRequired ? <></> : <span className="text-danger">*</span>}
              </Label>
              <CustomSelect
                name={name}
                register={register}
                className={`${errors[name] ? "border-danger" : ""}`}
                rules={notRequired ? {} : { required: "ველი აუცილებელია" }}
              >
                <option value="">{label}</option>
                {optionsObj &&
                  optionsObj[name]?.map((item) => (
                    <option
                      className="p-3"
                      key={item.id.toString() + item.name}
                      value={item.id}
                    >
                      {item.label || item.name || item.category_name}
                    </option>
                  ))}
              </CustomSelect>
            </div>
          );
        } else if (type === "textarea") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}{" "}
                {notRequired ? <></> : <span className="text-danger">*</span>}
              </Label>
              <textarea
                name={name}
                step="any"
                {...register(name, {
                  required: notRequired ? false : true,
                })}
                className={`${
                  errors[name] ? "border-danger" : ""
                } form-control`}
              />
            </div>
          );
        } else if (name === "tell") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}{" "}
                {notRequired ? <></> : <span className="text-danger">*</span>}
              </Label>
              <div className="flex gap-2">
                <input
                  className="form-control w-20"
                  value="+995"
                  disabled
                  readOnly
                />
                <CustomInput
                  name={name}
                  type={type}
                  step="any"
                  register={register}
                  rules={
                    notRequired
                      ? {}
                      : {
                          required: "ველი აუცილებელია",
                        }
                  }
                  className={`${errors[name] ? "border-danger" : ""}`}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label}{" "}
                {notRequired ? <></> : <span className="text-danger">*</span>}
              </Label>

              <CustomInput
                name={name}
                type={type}
                step="any"
                register={register}
                defaultValue={name === "tell" ? "995" : ""}
                rules={
                  notRequired
                    ? {}
                    : {
                        required: "ველი აუცილებელია",
                      }
                }
                className={`${errors[name] ? "border-danger" : ""}`}
              />
            </div>
          );
        }
      })}
      <div className="flex items-center justify-between">
        <Button disabled={isLoading} className="w-max">
          დადასტურება
        </Button>
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
};

export default AuthForm;
