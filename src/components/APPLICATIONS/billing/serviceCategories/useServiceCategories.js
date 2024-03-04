import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveServiceCategories } from "reducers/ServiceCategoryReducer";
import {
  deleteServiceCategory,
  getServiceCategories,
} from "services/serviceCategories";

const useServiceCategories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { serviceCategories } = useSelector((store) => store.serviceCategory);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const serviceCategoriesData = await getServiceCategories();
        dispatch(saveServiceCategories(serviceCategoriesData.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const deleteAndUpdate = async (id) => {
    await deleteServiceCategory(id);
    setTimeout(() => {
      dispatch(
        saveServiceCategories(
          serviceCategories.filter((service) => +service.id !== +id)
        )
      );
    }, 1600);
  };

  return { loading, deleteAndUpdate, serviceCategories };
};

export default useServiceCategories;
