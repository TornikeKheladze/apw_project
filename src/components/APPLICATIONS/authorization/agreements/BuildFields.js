import { avtorizirebuliArr } from "components/APPLICATIONS/billing/formArrays/agreementArr";
import CustomSelect from "components/form/CustomSelect";

export const BuildFields = ({
  staticArr,
  errors,
  register,
  selectOptions,
  disabled,
}) => {
  return staticArr.map((item) => {
    return (
      <div key={item.name} className="mb-3">
        <label
          htmlFor={item.name}
          className={`label ${errors[item.name] ? "text-danger" : ""}`}
        >
          {item.label}
        </label>
        {item.type === "select" ? (
          <CustomSelect
            name={item.name}
            register={register}
            className={`${errors[item.name] ? "border-danger" : ""}`}
            rules={item.required ? { required: "ველი აუცილებელია" } : {}}
            disabled={disabled}
          >
            {selectOptions[item.name].map((item) => (
              <option className="p-3" key={item.id + item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </CustomSelect>
        ) : (
          <input
            id={item.name}
            {...register(item.name, {
              required: item.required || false,
            })}
            type={item.type}
            step="any"
            className={`form-control ${
              errors[item.name] ? "border-danger" : ""
            }`}
            disabled={disabled}
          />
        )}
      </div>
    );
  });
};

export const BuildAvtFields = ({ register, index, disabled }) => {
  const roleComment = [
    {
      name: "მენეჯერი",
      value: "manager",
    },
    {
      name: "ოპერატორი",
      value: "operator",
    },
  ];

  return avtorizirebuliArr.map((item) => {
    if (item.type === "select") {
      return (
        <div key={item.name} className="mb-3">
          <label className="label">მინდობილობის როლი</label>
          <CustomSelect
            name={`user.${index}.comment`}
            register={register}
            rules={{ required: "ველი აუცილებელია" }}
            disabled={disabled}
          >
            {roleComment.map((item) => (
              <option
                className="p-3"
                key={item.value + item.name}
                value={item.value}
              >
                {item.name}
              </option>
            ))}
          </CustomSelect>
        </div>
      );
    } else {
      return (
        <div key={item.name} className="mb-3">
          <label htmlFor={`user.${index}.${item.name}`} className={"label"}>
            {item.label}
          </label>
          <input
            id={`user.${index}.${item.name}`}
            {...register(`user.${index}.${item.name}`)}
            placeholder={item.label}
            type={item.type}
            step="any"
            required={item.required || false}
            className="form-control"
            disabled={disabled}
          />
        </div>
      );
    }
  });
};
