import Footer from "partials/Footer";

import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";

import Button from "components/Button";
import useOrganization from "./useOrganization";
import AddOrganization from "./addOrganization/AddOrganization";
import EditOrganizationModal from "./editOrganizationModal/EditOrganizationModal";
import Dropdown from "components/Dropdown";
import Paths from "components/paths/Paths";
import DeleteModal from "components/customModal/DeleteModal";
import List from "components/list/List";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";

const Organizations = () => {
  const {
    organizations,
    types,
    authorizedUser,
    typeId,
    navigate,
    loadings: {
      addLoading,
      updateLoading,
      deleteLoading,
      orgsLoading,
      orgTypesLoading,
    },
    states: {
      isEditModalOpen,
      isDeleteModalOpen,
      choosenOrganization,
      successMessage,
      choosenType,
      input,
    },
    setStates: {
      setIsEditModalOpen,
      setIsDeleteModalOpen,
      setChoosenOrganization,
      setChoosenType,
      setInput,
    },
    mutates: { deleteMutate, updateMutate, addMutate },
  } = useOrganization();

  const typeName = typeId
    ? types?.find((type) => type.id === +typeId)?.name
    : types[0]?.name;

  const tabHeaders =
    !orgsLoading && !orgTypesLoading ? (
      types.map((type, i) => (
        <TabsNavigationItem
          key={type.id + type.name}
          index={type.id}
          className={`${
            typeId ? type.id === +typeId && "active" : i === 0 && "active"
          }`}
        >
          <div
            onClick={() => {
              navigate(`/organizations/${type.id}`);
            }}
          >
            {type.name}
          </div>
        </TabsNavigationItem>
      ))
    ) : (
      <div>
        იტვირთება... <LoadingSpinner />
      </div>
    );

  const tabContents = types.length
    ? types.map((type, i) => {
        const currentOrganizations = organizations.filter((organization) => {
          if (typeId) {
            return organization.type === +typeId;
          } else {
            return organization.type === types[0].id;
          }
        });
        return (
          <TabsContentItem key={type.id + i} index={type.id}>
            {!orgsLoading && !orgTypesLoading ? (
              organizations.length ? (
                <List
                  openDelete={setIsDeleteModalOpen}
                  openEdit={setIsEditModalOpen}
                  setChoosenItem={setChoosenOrganization}
                  items={currentOrganizations}
                  title={"ორგანიზაციის დასახელება"}
                  toUsers={"/users/organisation/"}
                  toDepartments={"/departments/"}
                />
              ) : (
                <p>ორგანიზაციები არ მოიძებნა</p>
              )
            ) : (
              <></>
            )}
          </TabsContentItem>
        );
      })
    : [];

  const dropdown = (
    <Dropdown content={<div className="dropdown-menu">{tabHeaders}</div>}>
      <Button className="uppercase">
        {typeName}
        <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
      </Button>
    </Dropdown>
  );

  return (
    <main className="workspace">
      <Paths />

      <Alert message={successMessage} color="success" dismissable />

      {/* temporary admin check */}
      {authorizedUser.superAdmin && (
        <AddOrganization
          input={input}
          setInput={setInput}
          choosenType={choosenType}
          setChoosenType={setChoosenType}
          types={types}
          add={addMutate}
          loading={addLoading}
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={deleteMutate}
        title={"ორგანიზაციის წაშლა"}
        loading={deleteLoading}
      />

      <EditOrganizationModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        organization={choosenOrganization}
        action={updateMutate}
        loading={updateLoading}
        types={types}
      />

      {/* temporary admin check */}
      {authorizedUser.superAdmin ? (
        <div className="card p-5">
          <h3>ორგანიზაციები</h3>
          <Tabs activeIndex={types.length && types[0].id} className="mt-5">
            <TabsNavigation className="flex items-center w-full justify-between border-none">
              <div className="hidden lg:flex justify-start gap-2">
                {tabHeaders}
              </div>
              <div className="lg:hidden flex">{dropdown}</div>
              <Button onClick={() => navigate("/organization-type-edit")}>
                შეცვლა
              </Button>
            </TabsNavigation>
            <TabsContent>{tabContents}</TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="card p-5">
          {orgsLoading && orgTypesLoading ? (
            <div className="flex flex-col items-center justify-center">
              იტვირთება... <LoadingSpinner />
            </div>
          ) : organizations?.length ? (
            <List
              openDelete={setIsDeleteModalOpen}
              openEdit={setIsEditModalOpen}
              setChoosenItem={setChoosenOrganization}
              items={organizations}
              title={"ორგანიზაციის დასახელება"}
              toUsers={"/users/organisation/"}
              toDepartments={"/departments/"}
            />
          ) : (
            <p>ორგანიზაციები არ მოიძებნა</p>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Organizations;
