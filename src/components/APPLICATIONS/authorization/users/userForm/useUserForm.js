import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  deleteUser,
  getUserDetails,
  updateUserData,
} from "services/users";

const useUserForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [deleteConfirmationModalisOpen, setDeleteConfirmationModalIsOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    ...formObject
  } = useForm({ oid: {}, did: {}, pid: {}, active: "0" });

  const active = useWatch({
    control: formObject.control,
    name: "active",
    defaultValue: "0",
  });

  const afterRequestHandler = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
      type === "success" && navigate(-1);
    }, 3000);
  };

  const { data: userData = [] } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => getUserDetails(id).then((res) => res.data.users),
    enabled: action === "edit",
    onSuccess(data) {
      setValue("name", data[0].name);
      setValue("email", data[0].email);
      setValue("password", "password");
      setValue("date_expiration", data[0].date_expiration?.split(" ")[0]);
      setValue("active", data[0].active.toString());
      setValue("oid", {
        name: data[0]?.o_name,
        id: data[0]?.organizations_id,
      });
      setValue("did", {
        department_name: data[0]?.department_name,
        id: data[0]?.departments_id,
      });
      setValue("pid", {
        position_name: data[0]?.position_name,
        id: data[0]?.positions_id,
      });
    },
  });
  const fetchedUserData = userData[0] || {};

  const { mutate: createUserMutate, isLoading: createUserLoading } =
    useMutation({
      mutationFn: createUser,
      onSuccess: () =>
        afterRequestHandler("მომხმარებელი წარმატებით დაემატა", "success"),
      onError: () => {
        afterRequestHandler("something went wrong", "danger");
      },
    });
  const { mutate: updateUserMutate, isLoading: updateUserLoading } =
    useMutation({
      mutationFn: updateUserData,
      onSuccess: () =>
        afterRequestHandler(
          "მომხმარებლის მონაცემები წარმატებით შეიცვალა",
          "success"
        ),
      onError: (error) => {
        console.log(error);
        afterRequestHandler("something went wrong", "danger");
      },
    });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () =>
      afterRequestHandler("მომხმარებელი წარმატებით წაიშალა", "success"),
    onError: () => afterRequestHandler("something went wrong", "danger"),
  });

  const onSubmit = async (data) => {
    const userData = {
      name: data?.name,
      email: data?.email,
      // password: data?.password,
      oid: data?.oid.id,
      did: data?.did.id,
      pid: data?.pid.id,
      date_expiration: data.date_expiration,
    };
    if (action === "create") {
      createUserMutate({ ...userData, password: data?.password });
    } else {
      updateUserMutate({ ...userData, id, active: data?.active });
    }
  };

  return {
    setValue,
    navigate,
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
    deleteMutate,
    deleteConfirmationModalisOpen,
    setDeleteConfirmationModalIsOpen,
    alert,
    active,
    loadings: {
      deleteLoading,
      createUserLoading,
      updateUserLoading,
    },
  };
};

export default useUserForm;
