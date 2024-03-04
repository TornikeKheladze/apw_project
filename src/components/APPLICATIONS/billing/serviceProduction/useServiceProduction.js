import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteServiceProduction,
  filterServiceProduction,
} from "services/serviceProduction";
import { removeEmpty } from "helpers/removeEmpty";
import { saveServiceProductions } from "reducers/ServiceProductionReducer";
import { getCustomers } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import { idToName } from "helpers/idToName";
import { getServices } from "services/services";
import { saveServices } from "reducers/ServiceReducer";
import { filterArray } from "helpers/filterArray";

const useServiceProduction = () => {
  const dispatch = useDispatch();
  const serviceProductions = useSelector(
    (state) => state.serviceProduction.serviceProductions
  );
  const allcustomers = useSelector((state) => state.customer.customers);
  const allServices = useSelector((state) => state.service.services);
  const { filter } = useSelector((store) => store.filter);
  const [updatedServiceProductionList, setUpdatedServiceProductionList] =
    useState([]);
  //   const [sortConfig, setSortConfig] = useState({ column: "", direction: "" });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const customers = await getCustomers();
        const services = await getServices();
        dispatch(saveCustomers(customers.data));
        dispatch(saveServices(services.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const filterHandler = async () => {
    try {
      setActionLoading(true);
      const res = await filterServiceProduction(removeEmpty(filter));
      //   setTotalSize(cust.data.total);
      dispatch(saveServiceProductions(res.data));
      setActionLoading(false);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  useEffect(() => {
    const updatedList = filterArray(
      serviceProductions,
      removeEmpty(filter)
    )?.map((sp) => {
      return {
        ...sp,
        agent_id: idToName(allcustomers, sp.agent_id),
        owner_id: idToName(allcustomers, sp.owner_id),
        service_id: idToName(allServices, sp.service_id),
      };
    });
    setUpdatedServiceProductionList(updatedList);
  }, [allcustomers, allServices, serviceProductions, filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setActionLoading(true);
        const cust = await filterServiceProduction({});
        dispatch(saveServiceProductions(cust.data));
        // setTotalSize(cust.data.total);
        setActionLoading(false);
      } catch (error) {
        setActionLoading(false);
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //   const sortHandler = (name) => {
  //     if (sortConfig.column === name) {
  //       setSortConfig({
  //         column: name,
  //         direction: sortConfig.direction === "asc" ? "desc" : "asc",
  //       });
  //     } else {
  //       setSortConfig({
  //         column: name,
  //         direction: "asc",
  //       });
  //     }
  //   };

  const deleteAndUpdate = async (id) => {
    await deleteServiceProduction(id);
    setTimeout(() => {
      dispatch(
        saveServiceProductions(
          serviceProductions.filter((sp) => +sp.id !== +id)
        )
      );
    }, 1600);
  };

  return {
    actionLoading,
    loading,
    deleteAndUpdate,
    filterHandler,
    updatedServiceProductionList,
    allServices,
    allcustomers,
  };
};

export default useServiceProduction;
