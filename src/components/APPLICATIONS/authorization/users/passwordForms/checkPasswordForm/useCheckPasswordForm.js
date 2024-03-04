import { useState } from "react";
import { useForm } from "react-hook-form";
import { checkUserPassword } from "services/users";

export const useCheckPasswordForm = (setIsUserValid) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await checkUserPassword(data);
      setIsUserValid(true);
    } catch (error) {
      console.log(error);
      setIsUserValid(false);
    }
  };

  return {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    formState: { errors },
    handleSubmit,
    onSubmit,
  };
};
