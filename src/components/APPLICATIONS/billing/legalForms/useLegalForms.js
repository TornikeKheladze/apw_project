import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLegalForm, getLegalForms } from "services/legalForms";
import { saveLegalForms } from "reducers/LegalFormReducer";

export const useLegalForms = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { legalForms } = useSelector((store) => store.legalForm);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const lForms = await getLegalForms();
        dispatch(saveLegalForms(lForms.data));
        setLoading(false);
      } catch (error) {}
    };
    fetchInitialData();
  }, [dispatch]);

  const deleteAndUpdate = async (id) => {
    await deleteLegalForm(id);
    setTimeout(() => {
      dispatch(
        saveLegalForms(legalForms.filter((legalForm) => +legalForm.id !== +id))
      );
    }, 1600);
  };
  return {
    loading,
    legalForms,
    deleteAndUpdate,
  };
};
