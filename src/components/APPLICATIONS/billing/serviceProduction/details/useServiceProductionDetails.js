import { idToName } from "helpers/idToName";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServiceProduction } from "reducers/ServiceProductionReducer";
import { saveServices } from "reducers/ServiceReducer";
import { getCustomers } from "services/customers";
import { getServiceProductionById } from "services/serviceProduction";
import { getServices } from "services/transactions";

const useServiceProductionDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updatedServiceProduction, setUpdatedServiceProduction] = useState({});
  const serviceProduction = useSelector(
    (state) => state.serviceProduction.serviceProduction
  );
  const { customers } = useSelector((store) => store.customer);
  const { services } = useSelector((store) => store.service);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const serviceCategoryData = await getServiceProductionById(id);
        const customers = await getCustomers();
        const services = await getServices();
        dispatch(saveServiceProduction(serviceCategoryData.data));
        dispatch(saveCustomers(customers.data));
        dispatch(saveServices(services.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch, id]);

  useEffect(() => {
    const updatedServiceProduction = () => {
      return {
        ...serviceProduction,
        agent_id: idToName(customers, serviceProduction.agent_id),
        owner_id: idToName(customers, serviceProduction.owner_id),
        service_id: idToName(services, serviceProduction.service_id),
      };
    };
    const updatedData = updatedServiceProduction();
    setUpdatedServiceProduction(updatedData);
  }, [serviceProduction, customers, services]);
  return { updatedServiceProduction, loading };
};

export default useServiceProductionDetails;
