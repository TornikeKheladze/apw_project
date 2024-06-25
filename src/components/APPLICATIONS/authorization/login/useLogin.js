import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDarkMode from "utilities/hooks/useDarkMode";
import useFullscreen from "utilities/hooks/useFullScreen";
import { useForm, useWatch } from "react-hook-form";
import { login, sendLoginSms } from "services/authorization";
import { useMutation } from "react-query";

export const useLogin = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [isFullscreen, toggleFullscreen] = useFullscreen();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [smsError, setSmsError] = useState(false);
  const [sms, setSms] = useState({
    open: false,
    value: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const password = useWatch({
    name: "password",
    control: control,
  });

  const email = useWatch({
    name: "email",
    control: control,
  });

  const { mutate: sendSmsMutate, isLoading: smsLoading } = useMutation({
    mutationFn: sendLoginSms,
    onSuccess: () =>
      setSms({
        open: true,
        value: "",
      }),
    onError: () => {
      setError("email", {
        type: "custom",
        message: "არასწორი მონაცემები",
      });
    },
  });

  const { mutate: loginMutate, isLoading: loginLoading } = useMutation({
    mutationFn: (data) =>
      login({
        email,
        password: data.password ? data.password : password,
        sms_code: sms.value,
      }),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.user.token);
      if (res.data.user.password_verified_at) {
        navigate("/organizations");
      } else {
        setSms((prevState) => ({
          ...prevState,
          open: false,
        }));
        setPasswordModal(true);
      }
    },
    onError: () => {
      setSmsError(true);
    },
  });

  return {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    sendSmsMutate,
    mutates: {
      sendSmsMutate,
      loginMutate,
    },
    loadings: {
      smsLoading,
      loginLoading,
    },
    states: {
      darkMode,
      isFullscreen,
      isPasswordVisible,
      passwordModal,
      sms,
      smsError,
    },
    setStates: {
      toggleDarkMode,
      toggleFullscreen,
      setIsPasswordVisible,
      setPasswordModal,
      setSms,
      setSmsError,
    },
  };
};
