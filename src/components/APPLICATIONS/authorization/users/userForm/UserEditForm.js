import { userArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createUser, getUserDetails, updateUserData } from "services/users";
import Alert from "components/Alert";
import UserForm from "./UserForm";

const UserEditForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { action, id } = useParams();
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const oid = searchParam.get("oid");
  const did = searchParam.get("did");
  const pid = searchParam.get("pid");

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

  const { data: userData = {} } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => getUserDetails(id).then((res) => res.data.users),
    enabled: action === "edit",
  });
  const fetchedUserData = userData || {};

  const { mutate: createUserMutate, isLoading: createUserLoading } =
    useMutation({
      mutationFn: createUser,
      onSuccess: (data) => {
        setAlert({
          message: "მომხმარებელი წარმატებით დაემატა",
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            message: "",
          });
          queryClient.invalidateQueries(["getUserDetails", id]);
          navigate(`/user/edit/${data.data.user.id}?activeIndex=2`);
        }, 2500);
      },
      onError: (data) => {
        console.log(data.response.data);
        afterRequestHandler(data.response.data.description, "danger");
      },
    });
  const { mutate: updateUserMutate, isLoading: updateUserLoading } =
    useMutation({
      mutationFn: updateUserData,
      onSuccess: () => {
        afterRequestHandler(
          "მომხმარებლის მონაცემები წარმატებით შეიცვალა",
          "success"
        );
      },
      onError: (data) => {
        afterRequestHandler(data.response.data.description, "danger");
      },
    });

  const onSubmit = (data) => {
    const tell = `995${data?.tell}`;
    const userData = {
      oid: oid || data?.oid.id,
      did: did || data?.did.id,
      pid: pid || data?.pid.id,
    };
    if (action === "create") {
      createUserMutate({
        ...data,
        ...userData,
        tell,
        active: 0,
        account_type: 0,
      });
    } else {
      updateUserMutate({
        ...fetchedUserData,
        ...data,
        ...userData,
        tell,
        id,
        active: data?.active,
      });
    }
  };

  return (
    <div
      className={
        action === "create" ? "container card p-5 md:w-2/3 w-full" : ""
      }
    >
      <UserForm
        formArray={
          action === "create"
            ? userArr.filter((item) => item.name !== "active")
            : userArr
        }
        // formArray={userArr.filter((item) => {
        //   if (authorizedUser.superAdmin) return item.name !== "date_expiration";
        //   return item;
        // })}
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
          signature: [
            { name: "დიახ", id: 1 },
            { name: "არა", id: 0 },
          ],
          has_ring_number: [
            { name: "გამორთვა", id: 0 },
            { name: "ჩართვა", id: 1 },
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
