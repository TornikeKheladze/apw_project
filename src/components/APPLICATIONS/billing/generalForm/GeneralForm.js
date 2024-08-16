import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import Radio from "components/form/Radio";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useGeneralForm from "./useGeneralForm";

const GeneralForm = (props) => {
  const {
    formArray,
    submitHandler,
    optionsObj,
    isLoading,
    updateDataObj = {},
  } = props;

  const {
    register,
    handleSubmit,
    errors,
    formData,
    handleFormChange,
    // imageForDisplay,
  } = useGeneralForm(formArray, updateDataObj);

  return (
    <form
      onChange={handleFormChange}
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
                rules={{
                  required: "ველი აუცილებელია",
                }}
              >
                <option disabled value="">
                  {label}
                </option>
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
                  label={name === "has_ring_number" ? "ჩართვა" : "დიახ"}
                  register={register}
                  value="1"
                  checked={formData[name]?.toString() === "1"}
                />
                <Radio
                  name={name}
                  label={name === "has_ring_number" ? "გამორთვა" : "არა"}
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
