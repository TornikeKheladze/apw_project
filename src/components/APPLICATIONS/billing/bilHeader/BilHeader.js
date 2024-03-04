import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";
import { useNavigate } from "react-router-dom";

const BilHeader = ({ text, url, visible }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-4 w-full flex justify-between items-center">
      <h3>{text}</h3>
      {visible && (
        <Button
          className="flex items-center gap-1"
          onClick={() => navigate(url)}
        >
          დამატება
          <PlusIcon />
        </Button>
      )}
    </div>
  );
};

export default BilHeader;
