import InfoIcon from "components/icons/InfoIcon";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Modal, { ModalBody, ModalHeader } from "components/Modal";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCategories } from "services/serviceCategories";

const Agreements = () => {
  const { data: categories = [{}], isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
  });
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    data: {},
  });
  const obligationsArr = () => {
    try {
      return JSON.parse(infoModal.data.obligations);
    } catch (error) {
      return [infoModal.data.obligations];
    }
  };

  return (
    <main className="workspace">
      {isLoading && <LoadingSpinner blur />}
      <Modal
        active={infoModal.isOpen}
        centered
        onClose={() => setInfoModal({ isOpen: false, data: {} })}
      >
        <ModalHeader>{infoModal.data.categoryName}</ModalHeader>
        <ModalBody>
          <p>
            <strong className="text-primary-500">სერვისის აღწერილობა:</strong>
            <span> {infoModal.data.categoryDescription}</span>
          </p>
          <p>
            <strong className="text-primary-500">სარგებლობის პირობები:</strong>
            <span> {infoModal.data.usageTerms}</span>
          </p>
          <div>
            <strong className="text-primary-500">ვალდებულებები:</strong>
            <ul className="pl-10">
              {obligationsArr() &&
                obligationsArr().map((item, i) => (
                  <li className="list-disc" key={item + i}>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <p>
            <strong className="text-primary-500">დამატებითი პირობები:</strong>
            <span>{infoModal.data.additionalTerms}</span>
          </p>
        </ModalBody>
      </Modal>
      <h1 className="text-center mb-3">აირჩიეთ სერვისი</h1>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
        {categories.map((category) => (
          <div
            key={category.catID + Math.random()}
            className="card p-5 relative"
          >
            <Link to="/agreements/create">
              <h3 className="text-center ">{category.categoryName}</h3>
            </Link>
            <button
              onClick={() =>
                setInfoModal({
                  isOpen: true,
                  data: category,
                })
              }
              className="absolute top-1 right-1 cursor-pointer"
            >
              <InfoIcon />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Agreements;
