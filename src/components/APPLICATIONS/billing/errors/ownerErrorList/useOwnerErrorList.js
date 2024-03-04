import { idToName } from "helpers/idToName";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveOwnerErrorList } from "reducers/ErrorListReducer";
import { getCustomers } from "services/customers";
import { deleteOwnerError, filterOwnerError } from "services/errorList";

const useOwnerErrorList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [updatedList, setUpdatedList] = useState([]);

  const ownerErrorList = useSelector((state) => state.errorList.ownerErrorList);
  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const res = await filterOwnerError({ owner_id: id });
        const customers = await getCustomers();
        dispatch(saveOwnerErrorList(res.data));
        dispatch(saveCustomers(customers.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch, id]);

  useEffect(() => {
    const updated = ownerErrorList?.map((ownerError) => {
      return {
        ...ownerError,
        owner_id: idToName(customers, ownerError.owner_id),
      };
    });
    setUpdatedList(updated);
  }, [customers, ownerErrorList]);

  console.log(ownerErrorList);

  const deleteAndUpdate = async (id) => {
    await deleteOwnerError(id);
    setTimeout(() => {
      dispatch(
        saveOwnerErrorList(
          ownerErrorList.filter((ownerError) => +ownerError.id !== +id)
        )
      );
    }, 1600);
  };

  return { loading, updatedList, deleteAndUpdate };
};

export default useOwnerErrorList;
