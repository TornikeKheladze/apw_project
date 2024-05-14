import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import Label from "components/form/Label";
import FormDropdowns from "./formDropdown/FormDropdowns";
import useUserForm from "./useUserForm";
import DeleteModal from "components/customModal/DeleteModal";
import Alert from "components/Alert";
import Radio from "components/form/Radio";
import LoadingSpinner from "components/icons/LoadingSpinner";

const UserForm = () => {
  const {
    handleSubmit,
    onSubmit,
    action,
    isFormEditing,
    setIsFormEditing,
    register,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    fetchedUserData,
    formObject,
    setDeleteConfirmationModalIsOpen,
    deleteConfirmationModalisOpen,
    navigate,
    setValue,
    alert,
    active,
    deleteMutate,
    loadings: { deleteLoading, createUserLoading, updateUserLoading },
  } = useUserForm();

  return (
    <>
      <div
        className={
          action === "create"
            ? "container flex items-center justify-center mt-20 py-10"
            : ""
        }
      >
        <Alert message={alert.message} color={alert.type} dismissable />

        <div className={action === "create" ? "w-full lg:w-1/2 " : ""}>
          {action === "edit" && !fetchedUserData.name ? (
            <p className="text-center">იტვირთება...</p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`mt-5 md:p-10 ${
                  action === "create" ? "card p-5" : ""
                } `}
              >
                <div className="mb-5">
                  <Label className="block mb-2" htmlFor="name">
                    სახელი
                  </Label>
                  <CustomInput
                    disabled={
                      action === "edit" && !isFormEditing ? true : false
                    }
                    register={register}
                    invalid={errors?.name || false}
                    rules={{
                      required: "სახელის ველი აუცილებელია",
                      minLength: { value: 2, message: "მინიმუმ ორი სიმბოლო" },
                    }}
                    name="name"
                    id="name"
                    placeholder="ჯოტო კალატოზი"
                  />
                  {/* <p className="text-danger mt-2">{errors?.name?.message}</p> */}
                </div>
                <div className="mb-5">
                  <Label className="block mb-2" htmlFor="email">
                    მეილი
                  </Label>
                  <CustomInput
                    id="email"
                    disabled={action === "edit" ? true : false}
                    placeholder="example@gmail.com"
                    register={register}
                    name="email"
                    invalid={errors?.email}
                    rules={{
                      required: "მეილის ველი აუცილებელია",
                      pattern: {
                        value:
                          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "შეიყვანეთ სწორი მეილი",
                      },
                    }}
                  />
                  {/* <p className="text-danger mt-2">{errors?.email?.message}</p> */}
                </div>
                {action === "create" ? (
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
                        disabled={
                          action === "edit" && !isFormEditing ? true : false
                        }
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
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        ></button>
                      </span>
                    </label>
                  </div>
                ) : (
                  ""
                )}
                <div className="mb-5">
                  <Label className="block mb-2" htmlFor="email">
                    მოქმედების ვადა
                  </Label>
                  <input
                    {...register("date_expiration", {
                      required: "სავალდებულო ველი",
                    })}
                    type="date"
                    className={`w-full px-2 py-2 rounded ${
                      errors.date_expiration ? "border-danger border" : ""
                    }`}
                    disabled={
                      action === "edit" && !isFormEditing ? true : false
                    }
                  />
                  {/* <p className="text-danger mt-2">{errors?.email?.message}</p> */}
                </div>

                <FormDropdowns
                  isFormEditing={isFormEditing}
                  action={action}
                  formObject={formObject}
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

                <h4 className="mt-10 uppercase">სტატუსი</h4>
                <div className="flex flex-col gap-y-2 mt-5">
                  <Radio
                    value={1}
                    register={register}
                    name="active"
                    label="აქტიური"
                    onChange={() => setValue("active", "1")}
                    defaultChecked={active === "1"}
                  />
                  <Radio
                    register={register}
                    name="active"
                    label="არა აქტიური"
                    value={0}
                    onChange={() => setValue("active", "0")}
                    defaultChecked={active === "0"}
                  />
                </div>

                <div className="flex justify-between mt-8">
                  {action === "edit" && (
                    <Button
                      onClick={() =>
                        setIsFormEditing((currState) => !currState)
                      }
                      type="button"
                      className=""
                    >
                      {isFormEditing ? "გაუქმება" : "რედაქტირება"}
                    </Button>
                  )}
                  {action === "edit" && !isFormEditing && (
                    <Button
                      type="button"
                      className="bg-danger "
                      onClick={() => setDeleteConfirmationModalIsOpen(true)}
                    >
                      წაშლა
                    </Button>
                  )}
                  {action === "create" && (
                    <Button className="">
                      {createUserLoading ? <LoadingSpinner /> : "რეგისტრაცია"}
                    </Button>
                  )}
                  {isFormEditing && (
                    <Button type="submit" className=" bg-success">
                      {updateUserLoading ? <LoadingSpinner /> : "შენახვა"}
                    </Button>
                  )}
                  {action === "create" && (
                    <Button onClick={() => navigate(-1)}>უკან</Button>
                  )}
                </div>
              </form>

              <DeleteModal
                isOpen={deleteConfirmationModalisOpen}
                setIsOpen={setDeleteConfirmationModalIsOpen}
                action={deleteMutate}
                title={"ნამდვილად გსურთ მომხმარებლის წაშლა?"}
                loading={deleteLoading}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserForm;
