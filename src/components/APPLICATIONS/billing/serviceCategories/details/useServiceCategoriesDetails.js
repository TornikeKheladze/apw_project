import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveServiceCategory } from "reducers/ServiceCategoryReducer";
import { getServiceCategoryById } from "services/serviceCategories";

const useServiceCategoriesDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { serviceCategory, serviceCategories } = useSelector(
    (state) => state.serviceCategory
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const serviceCategoryData = await getServiceCategoryById(id);
        dispatch(saveServiceCategory(serviceCategoryData.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (!serviceCategories.find((s) => +s.id === +id)) {
      fetchInitialData();
    } else {
      dispatch(
        saveServiceCategory(serviceCategories.find((s) => +s.id === +id))
      );
    }
  }, [dispatch, id, serviceCategories]);

  return { serviceCategory, loading };
};

export default useServiceCategoriesDetails;
