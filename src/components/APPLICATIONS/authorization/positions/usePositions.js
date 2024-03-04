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

export const usePositions = () => {
  const { did, oid } = useParams();
  const [input, setInput] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [choosenPosition, setChoosenPosition] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const queriClient = useQueryClient();

  const { data: positions = [], isLoading: positionLoading } = useQuery({
    queryKey: ["getPositionByDepartmentId", did],
    queryFn: () => getPositionByDepartmentId(did).then((res) => res.data.data),
  });

  const { data: departments = [], isLoading: departmentLoading } = useQuery({
    queryKey: ["getDepartments", oid],
    queryFn: () => getDepartments(oid).then((res) => res.data.data),
  });

  const { mutate: addPositionMutate, isLoading: addLoading } = useMutation({
    mutationFn: () => addPosition(input, did),
    onSuccess: () => {
      queriClient.invalidateQueries(["getPositionByDepartmentId", did]);
      setSuccessMessage("პოზიცია წარმატებით შეიქმნა");
      setInput("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: deletePositionMutate, isLoading: deleteLoading } =
    useMutation({
      mutationFn: () => deletePosition(choosenPosition.id),
      onSuccess: () => {
        queriClient.invalidateQueries(["getPositionByDepartmentId", did]);
        setSuccessMessage("პოზიცია წარმატებით წაიშალა");
        setIsDeleteModalOpen(false);
        setInput("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      },
    });

  const { mutate: updatePositionMutate, isLoading: updateLoading } =
    useMutation({
      mutationFn: updatePosition,
      onSuccess: () => {
        queriClient.invalidateQueries(["getPositionByDepartmentId", did]);
        setSuccessMessage("პოზიცია წარმატებით შეიცვალა");
        setIsEditModalOpen(false);
        setInput("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      },
    });

  const loading = positionLoading || departmentLoading;
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
      successMessage,
    },
  };
};
