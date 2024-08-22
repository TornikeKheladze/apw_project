import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";
import { useNavigate } from "react-router-dom";

const BilHeader = ({ text, url, visible, buttonText = "დამატება" }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-4 w-full flex justify-between items-center flex-wrap">
      <h3>{text}</h3>
      {visible && (
        <Button
          className="flex items-center gap-1"
          onClick={() => navigate(url)}
        >
          {buttonText}
          <PlusIcon />
        </Button>
      )}
    </div>
  );
};

export default BilHeader;
