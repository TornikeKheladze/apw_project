import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOurErrorList } from "reducers/ErrorListReducer";
import { deleteOurError, getOurErrorList } from "services/errorList";

const useOurErrorList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const ourErrorList = useSelector((state) => state.errorList.ourErrorList);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const res = await getOurErrorList();
        dispatch(saveOurErrorList(res.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const deleteAndUpdate = async (id) => {
    await deleteOurError(id);
    setTimeout(() => {
      dispatch(
        saveOurErrorList(
          ourErrorList.filter((currency) => +currency.id !== +id)
        )
      );
    }, 1600);
  };

  return { loading, deleteAndUpdate, ourErrorList };
};

export default useOurErrorList;
