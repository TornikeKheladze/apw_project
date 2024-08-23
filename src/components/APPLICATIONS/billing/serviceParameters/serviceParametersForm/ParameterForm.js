import Button from "components/Button";
import CustomSelect from "components/form/CustomSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { convertGeorgianToEnglish } from "helpers/convertGeorgianToEnglish";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const ParameterForm = (props) => {
  const { submitHandler, optionsObj, isLoading, updateDataObj = {} } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: updateDataObj ? updateDataObj : {},
  });

  const handleKeyPress = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const parameterPlaceholder = useWatch({
    name: "parameterPlaceholder",
    control,
  });

  useEffect(() => {
    setValue("parameterName", convertGeorgianToEnglish(parameterPlaceholder));
  }, [parameterPlaceholder, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      <div>
        <label
          className={`label mb-1 ${
            errors.parameterPlaceholder ? "text-danger" : ""
          }`}
          htmlFor="parameterPlaceholder"
        >
          სახელწოდება <span className="text-danger">*</span>
        </label>
        <input
          id="parameterPlaceholder"
          name="parameterPlaceholder"
          step="any"
          className={`form-control ${
            errors.parameterPlaceholder ? "border-danger" : ""
          }`}
          {...register("parameterPlaceholder", {
            required: true,
          })}
        />
      </div>
      <div>
        <label
          className={`label mb-1 ${errors.parameterName ? "text-danger" : ""}`}
          htmlFor="parameterName"
        >
          ტექნიკური სახელწოდება (ლათინურად){" "}
          <span className="text-danger">*</span>
        </label>
        <input
          id="parameterName"
          name="parameterName"
          className={`form-control ${
            errors.parameterName ? "border-danger" : ""
          }`}
          {...register("parameterName", {
            required: "სახელწოდება აუცილებელია",
          })}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div>
        <label
          className={`label mb-1 ${
            errors.parameterLength ? "text-danger" : ""
          }`}
          htmlFor="parameterLength"
        >
          ველში სიმბოლოების რაოდენობა <span className="text-danger">*</span>
        </label>
        <input
          id="parameterLength"
          name="parameterLength"
          type="number"
          step="any"
          className={`form-control ${
            errors.parameterLength ? "border-danger" : ""
          }`}
          {...register("parameterLength", {
            required: true,
          })}
        />
      </div>
      <div>
        <label
          className={`label mb-1  ${
            errors.parameterTypeID ? "text-danger" : ""
          }`}
        >
          პარამეტრის ტიპი <span className="text-danger">*</span>
        </label>
        <CustomSelect
          id="parameterTypeID"
          name="parameterTypeID"
          register={register}
          className={`${errors.parameterTypeID ? "border-danger" : ""}`}
          rules={{
            required: "ველი აუცილებელია",
          }}
        >
          <option disabled value="">
            პარამეტრის ტიპი
          </option>
          {optionsObj &&
            optionsObj.parameterTypeID?.map((item) => (
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

export default ParameterForm;
