import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDarkMode from "utilities/hooks/useDarkMode";
import useFullscreen from "utilities/hooks/useFullScreen";
import { useForm } from "react-hook-form";
import { login } from "services/authorization";

export const useLogin = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [isFullscreen, toggleFullscreen] = useFullscreen();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem("hash", res.data.hash);
      localStorage.setItem("token", res.data.user.token);
      //temporary navigation
      navigate("/organizations");
    } catch (error) {
      setError("email", {
        type: "custom",
        message: "არასწორი მონაცემები",
      });
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    darkMode,
    toggleDarkMode,
    isFullscreen,
    toggleFullscreen,
    isPasswordVisible,
    setIsPasswordVisible,
  };
};
