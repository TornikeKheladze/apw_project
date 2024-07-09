import { useCallback, useEffect, useState } from "react";
import {
  getTransactionsByPage,
  searchTransactions,
} from "services/transactions";
// import { checkStatus } from "helpers/CheckStatusForBilling";
// import { convertTimestamp } from "helpers/convertTimestamp";
import { filterTransactionsWithoutPage } from "services/transactions";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { useMutation, useQuery } from "react-query";
import { getAllServices } from "services/services";
import { useSearchParams } from "react-router-dom";
import { getOrganizations } from "services/organizations";
import { checkStatus } from "helpers/CheckStatusForBilling";
import { getOrganizationsTypes } from "services/organization-type";

export const useTransactions = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [sortConfig, setSortConfig] = useState({ column: "", direction: "" });
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({});
  const page = searchParam.get("page") || 1;

  const {
    data: transactionsData = { content: [{}] },
    isLoading: transactionsLoading,
    isFetching,
  } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => getTransactionsByPage(+page - 1).then((res) => res.data),
    onSuccess: (data) => {
      setTransactions(data.content);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const { mutate: searchMutate, isLoading: searchLoading } = useMutation({
    mutationFn: (searchObj) =>
      searchTransactions(searchObj).then((res) => res.data),
    onSuccess: (data) => {
      setTransactions(data.content);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: orgLoading,
  } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  const { data: organizationTypes = [], isLoading: orgTypesLoading } = useQuery(
    {
      queryKey: "organizationTypes",
      queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
    }
  );

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

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
    searchMutate({
      data: removeEmpty(filter),
      page: 0,
      sort: `${name},${sortConfig.direction === "asc" ? "asc" : "desc"}`,
    });
  };

  const filterHandler = useCallback(
    (filterObj) => {
      setSearchParam({ page: 1 });
      searchMutate({
        data: removeEmpty(filterObj),
        page: 0,
      });
    },
    [setSearchParam, searchMutate]
  );

  const fetchAllTransactions = async () => {
    const res = await filterTransactionsWithoutPage(removeEmpty(filter));
    const updatedTransactions = res.data?.map((transaction) => {
      return {
        ...transaction,
        // owner_id: idToName(customers, transaction.owner_id),
        // agent_id: idToName(customers, transaction.agent_id),
        // service_id: idToName(services, transaction.service_id),
        // statusid: checkStatus(transaction.status_id),
      };
    });

    return updatedTransactions;
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

  const updatedList = transactions.map((tr) => ({
    ...tr,
    id: tr.transactionID,
    transactionType: idToName(
      [
        {
          id: 0,
          name: "საცალო ტრანზაქცია",
        },
        {
          id: 1,
          name: "პაკეტიდან გამოყენებული ტრანზაქცია",
        },
        {
          id: 2,
          name: "რესელერის ტრანზაქცია",
        },
      ],
      tr.transactionType
    ),
    statusID: checkStatus(tr.statusID),
    serviceID: idToName(services, tr.serviceID),
    agentID: idToName(organizations, tr.agentID),
    ownerID: idToName(organizations, tr.ownerID),
    agentTypeID: idToName(organizationTypes, tr.agentTypeID),
  }));

  const searchOptions = {
    serviceID: services,
    agentID: organizations,
    ownerID: organizations,
    status_id: [
      { id: 1, name: "რეგისტრირებული" },
      { id: 2, name: "მუშავდება" },
      { id: 3, name: "წარმატებული" },
      { id: 4, name: "გაუქმებული" },
      { id: 5, name: "დაბრუნებული" },
    ],
    agentTypeID: organizationTypes,
  };

  return {
    loading: servicesLoading || orgLoading || orgTypesLoading,
    actionLoading: searchLoading || isFetching,
    sortConfig,
    filterHandler,
    sortHandler,
    fetchAllTransactions,
    transactionsData,
    searchParam,
    setSearchParam,
    transactionsLoading,
    filter,
    setFilter,
    updatedList,
    searchOptions,
  };
};
