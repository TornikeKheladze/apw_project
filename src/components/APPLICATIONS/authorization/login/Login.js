import classNames from "classnames";

import Button from "components/Button";
import Label from "components/form/Label";
import Switch from "components/form/Switch";
import Tooltip from "components/Tooltip";

import CustomInput from "components/form/CustomInput";
import { useLogin } from "./useLogin";
import Modal, { ModalBody, ModalHeader } from "components/Modal";
import NewPasswordForm from "../users/passwordForms/newPasswordForm/NewPasswordForm";

const Login = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    formState: { errors },
    darkMode,
    toggleDarkMode,
    isFullscreen,
    toggleFullscreen,
    isPasswordVisible,
    setIsPasswordVisible,
    passwordModal,
    setPasswordModal,
  } = useLogin();

  return (
    <>
      <section className="top-bar">
        <span className="brand">Logo</span>
        <nav className="flex items-center ltr:ml-auto rtl:mr-auto">
          <Tooltip content="Toggle Dark Mode">
            <Switch
              outlined
              checked={darkMode}
              onChange={() => toggleDarkMode()}
            />
          </Tooltip>
          <Tooltip content="Fullscreen">
            <button
              className={classNames(
                "hidden lg:inline-block ltr:ml-3 rtl:mr-3 px-2 text-2xl leading-none la",
                {
                  "la-compress-arrows-alt": isFullscreen,
                  "la-expand-arrows-alt": !isFullscreen,
                }
              )}
              onClick={toggleFullscreen}
            ></button>
          </Tooltip>
        </nav>
      </section>

      <div className="container flex items-center justify-center py-10">
        <div className="w-full md:w-1/2 xl:w-1/3">
          <div className="mx-5 flex justify-center md:mx-10">
            <h2>ავტორიზაცია</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card mt-5 p-5 md:p-10"
          >
            <div className="mb-6">
              <Label className="block mb-2" htmlFor="email">
                ელ ფოსტა
              </Label>
              <CustomInput
                id="email"
                placeholder="example@gmail.com"
                register={register}
                name="email"
                invalid={errors?.email}
                rules={{
                  required: "ელ ფოსტის ველი აუცილებელია",
                  pattern: {
                    value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "შეიყვანეთ სწორი მეილი",
                  },
                }}
              />
            </div>
            <div className="mb-6 relative">
              <Label className="block mb-2" htmlFor="password">
                პაროლი
              </Label>
              <label className="form-control-addon-within">
                <CustomInput
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  className="border-none"
                  register={register}
                  name="password"
                  invalid={errors?.password}
                  rules={{
                    required: "პაროლის ველი აუცილებელია",
                    minLength: { value: 4, message: "მინიმუმ 4 სიმბოლო" },
                  }}
                  placeholder="******"
                />
                {Object.values(errors).length > 0 && (
                  <small className="block mt-2 invalid-feedback absolute -bottom-8 left-1">
                    {errors.email
                      ? errors.email.message
                      : "შეიყვანეთ მონაცემები"}
                  </small>
                )}

                <span className="flex items-center ltr:pr-4 rtl:pl-4">
                  <button
                    type="button"
                    className="text-gray-300 dark:text-gray-700 la la-eye text-xl leading-none"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  ></button>
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <Button className="ltr:ml-auto rtl:mr-auto uppercase">
                შესვლა
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        centered
        active={passwordModal}
        onClose={() => setPasswordModal(false)}
      >
        <ModalHeader>შეცვალეთ პაროლი</ModalHeader>
        <ModalBody>
          <NewPasswordForm setPasswordModal={setPasswordModal} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Login;
