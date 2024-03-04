import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCustomers } from "reducers/CustomerReducer";
import {
  deleteCustomer,
  filterCustomers,
  filterCustomersWithoutPage,
} from "services/customers";
import { removeEmpty } from "helpers/removeEmpty";
import { getLegalForms } from "services/legalForms";
import { saveLegalForms } from "reducers/LegalFormReducer";
import { keyReplace } from "helpers/keyReplace";
import { customers } from "../formArrays/formArrays";
import { setFilter } from "reducers/FilterReducer";

export const useCustomers = () => {
  const dispatch = useDispatch();
  const allcustomers = useSelector((state) => state.customer.customers);
  const legalForms = useSelector((store) => store.legalForm.legalForms);
  const { filter } = useSelector((store) => store.filter);
  const [updatedCostumersList, setUpdatedCustomersList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: "", direction: "" });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const form = await getLegalForms();
        dispatch(saveLegalForms(form.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  // const filterHandler = async () => {
  //   try {
  //     setActionLoading(true);
  //     const cust = await filterCustomers(removeEmpty(filter), 1);
  //     setTotalSize(cust.data.total);
  //     dispatch(saveCustomers(cust.data.data));
  //     setActionLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setActionLoading(false);
  //   }
  // };
  const filterHandler = useCallback(
    async (filterObj) => {
      try {
        setActionLoading(true);
        const cust = await filterCustomers(removeEmpty({ ...filterObj }), 1);
        setCurrentPage(1);
        dispatch(saveCustomers(cust.data.data));
        setTotalSize(cust.data.total);
        setActionLoading(false);
      } catch (error) {
        console.log(error);
        setActionLoading(false);
      }
    },
    [setActionLoading, setCurrentPage, dispatch, setTotalSize]
  );

  useEffect(() => {
    const updatedList = allcustomers?.map((customer) => {
      const legalForm = legalForms?.find(
        (legalForm) => legalForm.id === customer.legal_form_id
      );
      return {
        ...customer,
        legal_form_id: legalForm?.name,
        online: customer.online === 0 ? "გამორთული" : "ჩართული",
        sandbox: customer.sandbox === 0 ? "კი" : "არა",
      };
    });
    setUpdatedCustomersList(updatedList);
  }, [allcustomers, legalForms]);

  const fetchCustomers = useCallback(async () => {
    try {
      setActionLoading(true);
      const cust = await filterCustomers(removeEmpty(filter), currentPage);
      dispatch(saveCustomers(cust.data.data));
      setTotalSize(cust.data.total);
      setActionLoading(false);
    } catch (error) {
      setActionLoading(false);
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (isInitial) {
      fetchCustomers({});
      setIsInitial(true);
    } else {
      fetchCustomers(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitial, currentPage, fetchCustomers]);

  const sortHandler = async (name, type) => {
    if (sortConfig.column === name) {
      setSortConfig({
        column: name,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        column: name,
        direction: "asc",
      });
    }
    try {
      setActionLoading(true);
      const res = await filterCustomers(
        {
          sort_column: name,
          sort_order: type,
        },
        1
      );
      dispatch(saveCustomers(res.data.data));
      setCurrentPage(1);
      setActionLoading(false);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  const deleteAndUpdate = async (id) => {
    await deleteCustomer(id);
    setTimeout(() => {
      dispatch(
        saveCustomers(allcustomers.filter((customer) => +customer.id !== +id))
      );
    }, 1600);
  };

  const fetchAllCustomers = async () => {
    const res = await filterCustomersWithoutPage(removeEmpty(filter));
    const updatedList = res.data?.map((customer) => {
      const legalForm = legalForms?.find(
        (legalForm) => legalForm.id === customer.legal_form_id
      );
      return {
        ...customer,
        legal_form_id: legalForm?.name,
        online: customer.online === 0 ? "გამორთული" : "ჩართული",
        sandbox: customer.sandbox === 0 ? "კი" : "არა",
      };
    });
    const translatedData = updatedList.map((tr) => keyReplace(tr, customers));
    return translatedData;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        filterHandler(removeEmpty(filter));
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [filter, filterHandler]);

  useEffect(() => {
    return () => {
      dispatch(setFilter({}));
    };
  }, [dispatch]);

  return {
    legalForms,
    updatedCostumersList,
    sortConfig,
    loading,
    actionLoading,
    currentPage,
    setCurrentPage,
    totalSize,
    deleteAndUpdate,
    sortHandler,
    filterHandler,
    fetchAllCustomers,
  };
};
