import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserData } from "services/users";

export const useNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const restUserData = useSelector((state) => state.user.user);

  const { id } = useParams();

  const passwordInput = useWatch({
    name: "password",
    control: control,
  });

  const passwordConfirmInput = useWatch({
    name: "password_confirm",
    control: control,
  });

  const onSubmit = async (data) => {
    if (passwordInput !== passwordConfirmInput) {
      setError("password", {
        type: "matching",
        message: "პაროლები უნდა ემთხვეოდეს",
      });
    } else {
      const userData = {
        name: restUserData?.name,
        email: restUserData?.email,
        password: data?.password,
        oid: restUserData?.oid,
        did: restUserData?.did,
        pid: restUserData?.pid,
        date_expiration: restUserData.date_expiration,
        id,
      };
      try {
        await updateUserData(userData);
        setSuccessMessage("პაროლი წარმატებით შეიცვალა");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    handleSubmit,
    formState: { errors },
    successMessage,
    onSubmit,
  };
};
