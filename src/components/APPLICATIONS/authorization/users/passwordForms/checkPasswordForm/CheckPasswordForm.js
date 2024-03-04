import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import Label from "components/form/Label";
import { useCheckPasswordForm } from "./useCheckPasswordForm";

const CheckPasswordForm = ({ isUserValid, setIsUserValid }) => {
  const {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    formState: { errors },
    handleSubmit,
    onSubmit,
  } = useCheckPasswordForm(setIsUserValid);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Label className="block mb-2" htmlFor="email">
            მეილი
          </Label>
          <CustomInput
            id="email"
            placeholder="example@gmail.com"
            register={register}
            name="email"
            invalid={errors?.email}
            rules={{
              required: "მეილის ველი აუცილებელია",
              pattern: {
                value: /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@gmail([.])com$/,
                message: "შეიყვანეთ სწორი მეილი",
              },
            }}
          />
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
          <Button>შემოწმება</Button>
          {isUserValid === false && (
            <p className="text-danger">არასწორი მონაცემები</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckPasswordForm;
