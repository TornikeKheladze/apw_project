import { useParams } from "react-router-dom";
import {
  addPosition,
  deletePosition,
  getPositionByDepartmentId,
  updatePosition,
} from "services/positions";
import { getDepartments } from "services/departments";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { buildMemberList } from "helpers/treeMenuBuilder";
import { useSelector } from "react-redux";

export const usePositions = () => {
  const { did, oid } = useParams();
  const [input, setInput] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [choosenPosition, setChoosenPosition] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const { authorizedUser } = useSelector((store) => store.user);

  const queryClient = useQueryClient();

  const {
    data: positionsData = { data: [], member: null },
    isLoading: positionLoading,
  } = useQuery({
    queryKey: ["getPositionByDepartmentId", did],
    queryFn: () => getPositionByDepartmentId(did).then((res) => res.data),
  });

  const {
    data: departmentData = { data: [], member: null },
    isLoading: departmentLoading,
  } = useQuery({
    queryKey: ["departments", oid],
    queryFn: () => getDepartments(oid).then((res) => res.data),
  });

  const { mutate: addPositionMutate, isLoading: addLoading } = useMutation({
    mutationFn: () => addPosition(input, did),
    onSuccess: () => {
      queryClient.invalidateQueries(["getPositionByDepartmentId", did]);
      setAlert({ message: "პოზიცია წარმატებით შეიქმნა", type: "success" });
      setInput("");
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 3000);
    },
    onError: () => {
      setAlert({ message: "პოზიციას შეიქმნა ვერ მოხერხდა", type: "danger" });
    },
  });

  const { mutate: deletePositionMutate, isLoading: deleteLoading } =
    useMutation({
      mutationFn: () => deletePosition(choosenPosition.id),
      onSuccess: () => {
        queryClient.invalidateQueries(["getPositionByDepartmentId", did]);
        setAlert({ message: "პოზიცია წარმატებით წაიშალა", type: "success" });
        setIsDeleteModalOpen(false);
        setInput("");
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 3000);
      },
      onError: () => {
        setAlert({ message: "პოზიციას წაშლა ვერ მოხერხდა", type: "danger" });
      },
    });

  const { mutate: updatePositionMutate, isLoading: updateLoading } =
    useMutation({
      mutationFn: updatePosition,
      onSuccess: () => {
        queryClient.invalidateQueries(["getPositionByDepartmentId", did]);
        setAlert({ message: "პოზიცია წარმატებით შეიცვალა", type: "success" });
        setIsEditModalOpen(false);
        setInput("");
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 3000);
      },
      onError: () => {
        setAlert({ message: "პოზიციას ცვლილება ვერ მოხერხდა", type: "danger" });
      },
    });

  const loading = positionLoading || departmentLoading;
  const departments = buildMemberList(departmentData, authorizedUser, oid);
  const positions = buildMemberList(positionsData, authorizedUser, oid);

  return {
    did,
    positions,
    departments,
    mutates: {
      addPositionMutate,
      deletePositionMutate,
      updatePositionMutate,
    },
    loadings: {
      addLoading,
      deleteLoading,
      updateLoading,
      loading,
    },
    setStates: {
      setInput,
      setIsDeleteModalOpen,
      setIsEditModalOpen,
      setChoosenPosition,
    },
    states: {
      input,
      isDeleteModalOpen,
      isEditModalOpen,
      choosenPosition,
      alert,
    },
  };
};
