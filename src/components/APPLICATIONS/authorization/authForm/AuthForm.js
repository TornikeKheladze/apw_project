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

  // const navigate = useNavigate();
  // onSubmit={handleSubmit(async (data) => {
  //   await submitHandler(data);
  //   navigate(-1);
  // })}

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
                {label}
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
