import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import LoadingSpinner from "components/icons/LoadingSpinner";
import FormDropdowns from "components/APPLICATIONS/authorization/users/userForm/formDropdown/FormDropdowns";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const UserForm = (props) => {
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
    formState: { errors },
    setValue,
    control,
    ...formObject
  } = useForm({
    defaultValues: updateDataObj ? updateDataObj : {},
  });
  const { action } = useParams();

  const has_ring_number = useWatch({
    control,
    name: "has_ring_number",
  });

  useEffect(() => {
    if (updateDataObj) {
      formArray.forEach((field) => {
        if (
          field.name === "tell" &&
          updateDataObj[field.name]?.startsWith("995")
        ) {
          setValue("tell", updateDataObj[field.name]?.slice(3));
        } else if (field.type === "date") {
          setValue(field.name, updateDataObj[field.name]?.split(" ")[0]);
        } else {
          setValue(field.name, updateDataObj[field.name]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDataObj]);

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

  const fields =
    +has_ring_number === 1
      ? [
          ...formArray,
          {
            name: "ring_number",
            label: "მიუთითეთ შტამპის ნომერი",
            type: "text",
            notRequired: true,
          },
        ]
      : formArray;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      {fields.map(({ name, label, type, notRequired }) => {
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
                htmlFor={name}
              >
                {label}{" "}
                {notRequired ? <></> : <span className="text-danger">*</span>}
              </Label>

              <CustomInput
                id={name}
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

      {externalFields && (
        <>
          <FormDropdowns
            formObject={{ ...formObject, control }}
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
      <div className="flex items-center gap-4">
        {action === "create" && (
          <Link to={-1}>
            <Button
              color="secondary"
              className="w-max min-w-[135px] flex justify-center"
            >
              უკან
            </Button>
          </Link>
        )}

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

export default UserForm;
