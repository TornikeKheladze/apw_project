import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import LupaIcon from "components/icons/LupaIcon";
import { useMutation } from "react-query";
import { getLogInfo } from "services/statistics";

const Logs = () => {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: getLogInfo,
    onSuccess: () => {},
  });
  console.log(data);
  return (
    <main className="workspace">
      {isLoading ? <LoadingSpinner blur /> : <></>}
      <Button onClick={mutate}>
        <LupaIcon />
      </Button>
    </main>
  );
};

export default Logs;
