import Alert from "components/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerBank } from "services/services";
import { bankRegisterArr } from "../formArrays/serviceArr";
import GeneralForm from "../generalForm/GeneralForm";

const BankRegister = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const mutateHandler = (response, message) => {
    if (response.data.message || response.data.error) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 2500);
    } else {
      localStorage.removeItem("formInputData");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: registerBank,
    onSuccess(data) {
      mutateHandler(data, "ბანკის რეგისტრაცია");
    },
    onError() {
      setAlert({
        message: `ბანკის რეგისტრაცია ვერ მოხერხდა`,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 2500);
    },
  });

  const submitHandler = (data) => {
    createMutate(data);
  };

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">ბანკის რეგისტრაცია</h3>

        <GeneralForm
          submitHandler={submitHandler}
          updateDataObj={null}
          formArray={bankRegisterArr}
          isLoading={createLoading}
        />
      </div>
    </main>
  );
};

export default BankRegister;
