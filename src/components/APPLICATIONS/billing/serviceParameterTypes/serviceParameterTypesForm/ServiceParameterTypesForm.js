import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { serviceParametersTypeArr } from "../../formArrays/serviceArr";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createServiceParameterType,
  getServiceParameterTypeById,
  updateServiceParameterType,
} from "services/serviceParameters";
import { useNavigate } from "react-router-dom";

const ServiceParameterTypesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();

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
      queryClient.invalidateQueries("getServiceParameters");
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
    mutationFn: createServiceParameterType,
    onSuccess(data) {
      mutateHandler(data, "პარამეტრის ტიპის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateServiceParameterType,
    onSuccess(data) {
      mutateHandler(data, "პარამეტრის ტიპის ცვლილება");
    },
  });

  const { data: parameterType = {}, isLoading: typeLoading } = useQuery({
    queryKey: ["getServiceParameterTypeById", id],
    queryFn: () => getServiceParameterTypeById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
  });

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({
        ...data,
      });
    } else {
      updateMutate({
        ...data,
        serviceParameterID: id,
      });
    }
  };

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ტექნიკური პარამეტრის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {typeLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            updateDataObj={action === "edit" ? parameterType : null}
            formArray={serviceParametersTypeArr}
            isLoading={updateLoading || createLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceParameterTypesForm;
