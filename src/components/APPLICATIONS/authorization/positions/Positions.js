import Button from "components/Button";
import Input from "components/form/Input";
import Label from "components/form/Label";
import Footer from "partials/Footer";

import EditPositionModal from "./editPositionModal/EditPositionModal";
import { usePositions } from "./usePositions";
// import Paths from "components/paths/Paths";
import DeleteModal from "components/customModal/DeleteModal";
import List from "components/list/List";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";

const Positions = () => {
  const {
    did,
    positions,
    departments,
    mutates: { addPositionMutate, deletePositionMutate, updatePositionMutate },
    loadings: { addLoading, deleteLoading, updateLoading, loading },
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
  } = usePositions();

  const displayDepartmentName = departments.find(
    (department) => department.id === Number(did)
  )?.department_name;

  return (
    <main className="workspace">
      {/* <Paths /> */}
      <Alert message={alert.message} color={alert.type} dismissable />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={deletePositionMutate}
        title={"პოზიციის წაშლა"}
        loading={deleteLoading}
      />
      {isEditModalOpen && (
        <EditPositionModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          position={choosenPosition}
          action={updatePositionMutate}
          loading={updateLoading}
          departments={departments}
        />
      )}

      <div className="lg:col-span-2 xl:col-span-3 mb-4">
        <h3 className="mb-2">დეპარტამენტი: {displayDepartmentName}</h3>
        <div className="card p-5">
          <Label className="block mb-2" htmlFor="position">
            პოზიციის დამატება
          </Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="position"
          />
          <Button
            disabled={!input ? true : false}
            onClick={addPositionMutate}
            className="mt-4"
          >
            {addLoading ? (
              <span className="w-[5.8rem]">
                <LoadingSpinner />
              </span>
            ) : (
              "დამატება"
            )}
          </Button>
        </div>
      </div>
      <div className="card p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : positions?.length ? (
          <List
            openDelete={setIsDeleteModalOpen}
            openEdit={setIsEditModalOpen}
            setChoosenItem={setChoosenPosition}
            items={positions}
            title={"პოზიციის დასახელება"}
            toUsers={"/users/positions/"}
          />
        ) : (
          <p>პოზიციები არ მოიძებნა</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Positions;
