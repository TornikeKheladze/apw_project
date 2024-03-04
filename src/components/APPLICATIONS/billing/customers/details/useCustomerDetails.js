import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCustomer } from "reducers/CustomerReducer";
import { saveLegalForms } from "reducers/LegalFormReducer";
import { getCustomerById } from "services/customers";
import { getLegalForms } from "services/legalForms";

export const useCustomersDetails = () => {
  const { id } = useParams();
  const { customer, customers } = useSelector((state) => state.customer);
  const { legalForms } = useSelector((store) => store.legalForm);
  const [loading, setLoading] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const customer = await getCustomerById(id);
        const form = await getLegalForms();
        dispatch(saveLegalForms(form.data));
        dispatch(saveCustomer(customer.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (!customers.find((c) => +c.id === +id)) {
      fetchInitialData();
    } else {
      dispatch(saveCustomer(customers.find((c) => +c.id === +id)));
    }
  }, [dispatch, id, customers]);

  useEffect(() => {
    const updateCustomer = () => {
      const legalForm = legalForms?.find(
        (legalForm) => legalForm.id === customer.legal_form_id
      );
      return {
        ...customer,
        legal_form_id: legalForm?.name,
        online: customer.online === 0 ? "ჩართული" : "გამორთული",
        sandbox: customer.sandbox === 0 ? "კი" : "არა",
      };
    };
    const updatedData = updateCustomer();
    setUpdatedCustomer(updatedData);
  }, [customer, legalForms]);
  return { loading, updatedCustomer };
};
