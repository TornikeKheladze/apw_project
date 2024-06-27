import Footer from "partials/Footer";
import EditDepartmentModal from "./editDepartmentModal/EditDepartmentModal";
import useDepartments from "./useDepartments.js";
// import Paths from "components/paths/Paths";
import DeleteModal from "components/customModal/DeleteModal";
import List from "components/list/List";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";

const Departments = () => {
  const {
    departments,
    organization,
    editMutate,
    deleteMutate,
    loading,
    did,
    oid,
    orderedDepartments,
    alert,
    departmentsFromOtherOrg,
    organizations,
    setStates: {
      setChoosenDepartment,
      setNewDepartmentName,
      setIsDeleteModalOpen,
      setIsEditModalOpen,
      setChosenOrganization,
      setParentDepartment,
    },
    states: {
      choosenDepartment,
      newDepartmentName,
      isDeleteModalOpen,
      isEditModalOpen,
      chosenOrganization,
      parentDepartment,
    },
  } = useDepartments();

  const name = departments.find(
    (department) =>
      department.id ===
      departments.find((department) => department.id === +did)?.parent_id
  )?.department_name;

  return (
    <main className="workspace">
      {/* <Paths title={name} /> */}
      <Alert message={alert.message} color={alert.type} dismissable />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={deleteMutate}
        title={"დეპარტამენტის წაშლა"}
      />

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        setChosenOrganization={setChosenOrganization}
        chosenOrganization={chosenOrganization}
        organization={organization}
        action={editMutate}
        choosenDepartment={choosenDepartment}
        setNewDepartmentName={setNewDepartmentName}
        newDepartmentName={newDepartmentName}
        departments={
          chosenOrganization.id ? departmentsFromOtherOrg : departments
        }
        parentDepartment={parentDepartment}
        setParentDepartment={setParentDepartment}
        organizations={organizations}
      />

      <div className="lg:col-span-2 xl:col-span-3 mb-4">
        <h2 className="mb-2">
          {organization?.name ? `ორგანიზაცია: ${organization.name}` : <></>}
        </h2>
        {name && <h3>მთავარი დეპარტამენტი: {name}</h3>}
      </div>
      <div className="card p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : departments.length && !loading ? (
          <List
            openDelete={setIsDeleteModalOpen}
            openEdit={setIsEditModalOpen}
            setChoosenItem={setChoosenDepartment}
            items={orderedDepartments}
            title={"დეპარტამენტის დასახელება"}
            toUsers={"/users/departments/"}
            toPositions={`/positions/${oid}`}
          />
        ) : (
          <p>დეპარტამენტები არ მოიძებნა</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Departments;
