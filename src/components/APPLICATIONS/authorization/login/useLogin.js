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
  const [errorMessage, setErrorMessage] = useState("");
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
      const user = res.data.user;
      localStorage.setItem("token", user.token);
      if (user.active === 0) {
        setErrorMessage("მომხმარებელი არ არის აქტიური");
      } else {
        if (user.date_expiration === null) {
          navigate("/sips");
          return;
        }
        if (user.password_verified_at) {
          const date_expiration = new Date(user.date_expiration);
          const today = new Date();
          if (date_expiration < today) {
            setErrorMessage("მომხმარებელს ვადა გაუვიდა");
          } else if (user.roles.length === 0) {
            setErrorMessage("მომხმარებელს უფლება არ აქვს");
          } else {
            if (user.roles[0].name === "Super-Admin") {
              navigate("/sips");
            } else {
              // navigate(`/users/organisation/${user.oid}`);
              navigate(`/organizations`);
            }
          }
        } else {
          setSms((prevState) => ({
            ...prevState,
            open: false,
          }));
          setPasswordModal(true);
        }
      }
    },
    onError: () => {
      setErrorMessage("SMS კოდი არასწორია");
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
      errorMessage,
    },
    setStates: {
      toggleDarkMode,
      toggleFullscreen,
      setIsPasswordVisible,
      setPasswordModal,
      setSms,
    },
  };
};
