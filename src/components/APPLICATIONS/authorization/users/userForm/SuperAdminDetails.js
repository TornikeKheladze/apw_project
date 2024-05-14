import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import Label from "components/form/Label";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { updateUserData } from "services/users";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperAdminDetails = () => {
  const { id } = useParams();
  const { authorizedUser } = useSelector((store) => store.user);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  useEffect(() => {
    setValue("name", authorizedUser.name);
    setValue("email", authorizedUser.email);
  }, [authorizedUser, setValue]);

  const { mutate: updateUserMutate, isLoading: updateUserLoading } =
    useMutation({
      mutationFn: updateUserData,
      onSuccess: () => {
        setAlert({
          message: "მომხმარებლის მონაცემები წარმატებით შეიცვალა",
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      },

      onError: (error) => {
        setAlert({
          message: "something went wrong",
          type: "danger",
        });
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      },
    });

  const onSubmit = async (data) => {
    updateUserMutate({ ...authorizedUser, name: data?.name, id });
  };

  return (
    <>
      <div>
        <Alert message={alert.message} color={alert.type} dismissable />

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 md:p-10">
            <div className="mb-5">
              <Label className="block mb-2" htmlFor="name">
                სახელი
              </Label>
              <CustomInput
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
                disabled
                placeholder="example@gmail.com"
                register={register}
                name="email"
                invalid={errors?.email}
              />
              {/* <p className="text-danger mt-2">{errors?.email?.message}</p> */}
            </div>

            <div className="flex justify-between mt-8">
              <Button type="submit" className=" bg-success">
                {updateUserLoading ? <LoadingSpinner /> : "შენახვა"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDetails;
