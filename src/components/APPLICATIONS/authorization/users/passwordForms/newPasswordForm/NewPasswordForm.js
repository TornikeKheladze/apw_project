import Alert from "components/Alert";
import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import Label from "components/form/Label";
import { useNewPasswordForm } from "./useNewPasswordForm";
import LoadingSpinner from "components/icons/LoadingSpinner";

const NewPasswordForm = ({ login }) => {
  const {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    alert,
    isLoading,
  } = useNewPasswordForm(login);

  return (
    <>
      <Alert message={alert.message} color={alert.type} dismissable />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Label className="block mb-2" htmlFor="old_password">
            მიმდინარე პაროლი
          </Label>
          <label
            className={`form-control-addon-within ${
              errors.old_password ? "border-danger border" : ""
            }`}
          >
            <CustomInput
              id="old_password"
              type={isPasswordVisible ? "text" : "password"}
              className="border-none"
              register={register}
              name="old_password"
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
                validate: (val) => {
                  const lower = /(?=.*[a-z])/gm;
                  const upper = /(?=.*[A-Z])/gm;
                  const digit = /(?=.*\d)/gm;
                  const specSymbol = /(?=.*[@$!%*?&])/gm;
                  const characterLong = /[A-Za-z\d@$!%*?&]{8,}/gm;
                  if (!characterLong.test(val)) {
                    return "მინიმუმ 8 სიმბოლო";
                  }
                  if (!lower.test(val)) {
                    return "მინიმუმ 1 პატარა სიმბოლო";
                  }
                  if (!upper.test(val)) {
                    return "მინიმუმ 1 დიდი სიმბოლო";
                  }
                  if (!digit.test(val)) {
                    return "მინიმუმ 1 რიცხვი";
                  }
                  if (!specSymbol.test(val)) {
                    return "მინიმუმ ერთი სიმბოლო @$!%*?& დან";
                  }
                },
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
          <Label className="block mb-2" htmlFor="password_confirmation">
            პაროლის დადასტურება
          </Label>
          <label
            className={`form-control-addon-within ${
              errors.password_confirmation ? "border-danger border" : ""
            }`}
          >
            <CustomInput
              id="password_confirmation"
              type={isPasswordVisible ? "text" : "password"}
              className="border-none"
              register={register}
              name="password_confirmation"
              invalid={true}
              rules={{
                required: "ველი აუცილებელია",
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
          <Button className="mb-4">
            {isLoading ? <LoadingSpinner /> : "შეცვლა"}
          </Button>

          {errors?.password && (
            <p className="text-danger">{errors?.password.message}</p>
          )}
        </div>
      </form>
    </>
  );
};

export default NewPasswordForm;
