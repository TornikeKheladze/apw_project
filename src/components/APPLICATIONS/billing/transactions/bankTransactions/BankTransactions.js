import { useEffect } from "react";
import { useMutation } from "react-query";
import { searchBankTransactions } from "services/transactions";

const BankTransactions = () => {
  const { isLoading, mutate: searchMutate } = useMutation({
    mutationFn: searchBankTransactions,
  });
  useEffect(() => {
    searchMutate();
  }, []);

  return <main></main>;
};

export default BankTransactions;
