import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { addDaysToDate, daysDifference } from "helpers/dateFunctions";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

const CustomServiceForm = (props) => {
  const {
    formArray,
    submitHandler,
    optionsObj,
    isLoading,
    updateDataObj = {},
  } = props;

  const obligationsArr = () => {
    try {
      return JSON.parse(updateDataObj?.obligations);
    } catch (error) {
      return updateDataObj?.obligations;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: updateDataObj
      ? {
          ...updateDataObj,
          priceCalculationPeriod: addDaysToDate(
            updateDataObj?.priceCalculationPeriod
          ),
          obligations: Array.isArray(obligationsArr())
            ? obligationsArr().map((item) => {
                return { name: item };
              })
            : [{ name: obligationsArr() }],
        }
      : {
          obligations: [{ name: "" }],
        },
  });

  const priceCalculationPeriod = useWatch({
    control,
    name: "priceCalculationPeriod",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "obligations",
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        submitHandler(
          priceCalculationPeriod
            ? {
                ...data,
                priceCalculationPeriod: daysDifference(priceCalculationPeriod),
              }
            : data
        )
      )}
      className="flex flex-col gap-4"
    >
      {formArray.map(({ name, label, type, required }) => {
        if (type === "select") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label} {required && <span className="text-danger">*</span>}
              </Label>
              <CustomSelect
                name={name}
                register={register}
                className={`${errors[name] ? "border-danger" : ""}`}
                rules={
                  required
                    ? {
                        required: "ველი აუცილებელია",
                      }
                    : {}
                }
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
        } else if (type === "textarea") {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label} {required && <span className="text-danger">*</span>}
              </Label>
              <textarea
                name={name}
                step="any"
                {...register(name, {
                  required: required || false,
                })}
                className={`${
                  errors[name] ? "border-danger" : ""
                } form-control`}
              />
            </div>
          );
        } else {
          return (
            <div key={name}>
              <Label
                className={`block mb-1  ${errors[name] ? "text-danger" : ""}`}
              >
                {label} {required && <span className="text-danger">*</span>}{" "}
                {name === "priceCalculationPeriod" &&
                  daysDifference(priceCalculationPeriod) &&
                  `(${daysDifference(priceCalculationPeriod)} დღე)`}
              </Label>

              <CustomInput
                name={name}
                type={type}
                step="any"
                register={register}
                rules={
                  required
                    ? {
                        required: "ველი აუცილებელია",
                      }
                    : {}
                }
                className={`${errors[name] ? "border-danger" : ""}`}
              />
            </div>
          );
        }
      })}

      <div className="border p-3 mt-2 rounded-md">
        <p className="label">ვალდებულებები</p>
        {fields.map((item, index) => (
          <div key={item.id} className="border p-3 mt-2 rounded-md flex">
            <input
              className="form-control"
              {...register(`obligations.${index}.name`)}
            />
            <button
              onClick={() => remove(index)}
              type="button"
              className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
            >
              <span className="la la-trash-alt"></span>
            </button>
          </div>
        ))}
        <div>
          <Button
            type="button"
            className="p-[1px] my-2 text-[10px]"
            onClick={() => append()}
          >
            ვალდებულების დამატება
            <PlusIcon />
          </Button>
        </div>
      </div>
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

export default CustomServiceForm;
