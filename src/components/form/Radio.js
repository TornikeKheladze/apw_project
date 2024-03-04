import classNames from "classnames";
import PropTypes from "prop-types";

const Radio = (props) => {
  const { label, invalid, className, name, value, register, ...rest } = props;

  return (
    <label
      className={classNames(
        "custom-radio",
        { "is-invalid": invalid },
        className
      )}
    >
      {register ? (
        <input
          type="radio"
          {...register(name, { required: "Please select an option." })}
          value={value}
          {...rest}
        />
      ) : (
        <input type="radio" value={value} {...rest} />
      )}

      <span></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default Radio;
