import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails, updatePassword } from "services/users";

export const useNewPasswordForm = (login) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { authorizedUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { id, action } = useParams();
  const { data: userData = {} } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => getUserDetails(id).then((res) => res.data.users),
    enabled: action === "edit",
  });

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setAlert({ type: "success", message: "პაროლი წარმატებით შეიცვალა" });
      setTimeout(() => {
        if (login) {
          login({
            password: passwordConfirmInput,
          });
        }
      }, 1500);
      setTimeout(() => {
        setAlert({ type: "success", message: "" });
      }, 3000);
    },
    onError: (data) => {
      setAlert({ type: "danger", message: data.response.data.description });
      setTimeout(() => {
        setAlert({ type: "danger", message: "" });
      }, 3000);
    },
  });

  const passwordInput = useWatch({
    name: "password",
    control: control,
  });

  const passwordConfirmInput = useWatch({
    name: "password_confirmation",
    control: control,
  });

  const onSubmit = async (data) => {
    if (passwordInput !== passwordConfirmInput) {
      setError("password", {
        type: "matching",
        message: "პაროლები უნდა ემთხვეოდეს",
      });
    } else {
      const userToUpdate = login ? authorizedUser : userData || {};
      updateMutate({ ...userToUpdate, ...data });
    }
  };

  return {
    isPasswordVisible,
    setIsPasswordVisible,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    alert,
    setAlert,
    isLoading,
  };
};
