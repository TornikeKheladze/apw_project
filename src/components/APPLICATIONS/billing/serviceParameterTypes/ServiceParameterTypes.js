import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { serviceParametersTypeArr } from "../formArrays/serviceArr";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteServiceParameterType,
  getServiceParameterTypes,
} from "services/serviceParameters";
import { useState } from "react";

const ServiceParameterTypes = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const { data: types = [{}], isLoading: typesLoading } = useQuery({
    queryKey: "serviceParameterTypes",
    queryFn: () => getServiceParameterTypes().then((res) => res.data),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteServiceParameterType(id),
    onSuccess: () => {
      queryClient.invalidateQueries("serviceParameterTypes");
      setAlert({
        type: "success",
        message: "პარამეტრის ტიპი წაიშალა",
      });
      setTimeout(() => setAlert({ type: "success", message: "" }), 2500);
    },
  });

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"ტექნიკური პარამეტრის ტიპები"}
        url={"/billing/service-parameter-types/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          typesLoading && "overflow-x-hidden"
        }`}
      >
        {typesLoading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            staticArr={serviceParametersTypeArr}
            fetchedArr={types.map((type) => {
              return { ...type, id: type.serviceParameterTypeID };
            })}
            actions={{ edit: true, delete: { deleteMutate, deleteLoading } }}
          />
        )}

        {types.length === 0 && !typesLoading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ServiceParameterTypes;
