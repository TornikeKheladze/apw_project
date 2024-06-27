import { userArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import GeneralForm from "components/APPLICATIONS/billing/generalForm/GeneralForm";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserDetails, updateUserData } from "services/users";
import Alert from "components/Alert";
import { useSelector } from "react-redux";

const UserEditForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { action, id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authorizedUser } = useSelector((store) => store.user);

  const afterRequestHandler = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
      queryClient.invalidateQueries(["getUserDetails", id]);
      type === "success" && navigate(-1);
    }, 2500);
  };

  const { data: userData = [] } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => getUserDetails(id).then((res) => res.data.users),
    enabled: action === "edit",
  });
  const fetchedUserData = userData[0] || {};

  const { mutate: createUserMutate, isLoading: createUserLoading } =
    useMutation({
      mutationFn: createUser,
      onSuccess: (data) => {
        // console.log(data);
        afterRequestHandler("მომხმარებელი წარმატებით დაემატა", "success");
      },
      onError: () => {
        afterRequestHandler("რეგისტრაცია ვერ მოხერხდა", "danger");
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
      onError: () => {
        afterRequestHandler("ცვლილება ვერ მოხერხდა", "danger");
      },
    });

  const onSubmit = async (data) => {
    const userData = {
      oid: data?.oid.id,
      did: data?.did.id,
      pid: data?.pid.id,
    };
    if (action === "create") {
      createUserMutate({
        ...data,
        ...userData,
        active: data?.active,
        // temporary
        account_type: 0,
      });
    } else {
      updateUserMutate({ ...data, ...userData, id, active: data?.active });
    }
  };

  return (
    <div
      className={
        action === "create" ? "container card p-5 md:w-2/3 w-full" : ""
      }
    >
      <GeneralForm
        formArray={userArr.filter((item) => {
          if (authorizedUser.superAdmin) return item.name !== "date_expiration";
          return item;
        })}
        submitHandler={onSubmit}
        optionsObj={{
          active: [
            { name: "აქტიური", id: 1 },
            { name: "არააქტიური", id: 0 },
          ],
          account_type: [
            { name: "ორგანიზაცია", id: 1 },
            { name: "ფიზიკური პირი", id: 0 },
          ],
        }}
        updateDataObj={action === "edit" ? fetchedUserData : null}
        isLoading={createUserLoading || updateUserLoading}
        externalFields={fetchedUserData}
      />
      <Alert message={alert.message} color={alert.type} dismissable />
    </div>
  );
};

export default UserEditForm;
