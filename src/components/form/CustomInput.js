import classNames from "classnames";

const CustomInput = (props) => {
  const { invalid, className, children, register, name, rules, ...rest } =
    props;

  return (
    <input
      {...register(name, rules)}
      className={classNames(
        "form-control",
        { "is-invalid": invalid },
        className
      )}
      {...rest}
    />
  );
};

export default CustomInput;
