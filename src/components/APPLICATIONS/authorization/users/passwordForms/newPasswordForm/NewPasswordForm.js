import Alert from "components/Alert";
import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import Label from "components/form/Label";
import { useNewPasswordForm } from "./useNewPasswordForm";

const NewPasswordForm = () => {
  const {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    handleSubmit,
    formState: { errors },
    successMessage,
    onSubmit,
  } = useNewPasswordForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <Label className="block mb-2" htmlFor="password">
          პაროლი
        </Label>
        <label
          className={`form-control-addon-within ${
            errors.password ? "border-danger border" : ""
          }`}
        >
          <CustomInput
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            className="border-none"
            register={register}
            name="password"
            invalid={true}
            rules={{
              required: "პაროლის ველი აუცილებელია",
              minLength: { value: 4, message: "მინიმუმ 4 სიმბოლო" },
            }}
            placeholder="******"
          />
          <span className="flex items-center ltr:pr-4 rtl:pl-4">
            <button
              type="button"
              className="text-gray-300 dark:text-gray-700 la la-eye text-xl leading-none"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            ></button>
          </span>
        </label>
      </div>

      <div className="mb-5">
        <Label className="block mb-2" htmlFor="password">
          პაროლის დადასტურება
        </Label>
        <label
          className={`form-control-addon-within ${
            errors.password ? "border-danger border" : ""
          }`}
        >
          <CustomInput
            id="password_confirm"
            type={isPasswordVisible ? "text" : "password"}
            className="border-none"
            register={register}
            name="password_confirm"
            invalid={true}
            rules={{
              required: "პაროლის ველი აუცილებელია",
              minLength: { value: 4, message: "მინიმუმ 4 სიმბოლო" },
            }}
            placeholder="******"
          />
          <span className="flex items-center ltr:pr-4 rtl:pl-4">
            <button
              type="button"
              className="text-gray-300 dark:text-gray-700 la la-eye text-xl leading-none"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            ></button>
          </span>
        </label>
      </div>

      <div className="flex justify-between items-center">
        <Button className="mb-4">შეცვლა</Button>

        {errors?.password && (
          <p className="text-danger">{errors?.password.message}</p>
        )}
      </div>

      <Alert message={successMessage} color="success" dismissable />
    </form>
  );
};

export default NewPasswordForm;
