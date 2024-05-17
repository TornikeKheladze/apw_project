import Footer from "partials/Footer";

import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";

import Button from "components/Button";
import useOrganization from "./useOrganization";
import Dropdown from "components/Dropdown";
import Paths from "components/paths/Paths";
import List from "components/list/List";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "../authForm/AuthForm";
import { orgArr } from "components/APPLICATIONS/billing/formArrays/authArr";

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
    states: { choosenOrganization, successMessage, openModal },
    setStates: { setChoosenOrganization, setOpenModal },
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
                  openDelete={() => {
                    setOpenModal({
                      open: true,
                      action: "წაშლა",
                    });
                  }}
                  openEdit={() => {
                    setOpenModal({
                      open: true,
                      action: "შეცვლა",
                    });
                  }}
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

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setChoosenOrganization({ id: "" });
        }}
      >
        <ModalHeader>ორგანიზაციის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={orgArr}
              submitHandler={updateMutate}
              isLoading={updateLoading}
              defaultValues={choosenOrganization}
              optionsObj={{ type: types }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={orgArr}
              submitHandler={addMutate}
              isLoading={addLoading}
              optionsObj={{ type: types }}
            />
          </div>
        )}
        {openModal.action === "წაშლა" && (
          <>
            <ModalBody>
              <p>ნამდვილად გსურთ წაშლა?</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() => setOpenModal({ open: false })}
                >
                  გაუქმება
                </Button>
                <Button
                  className="min-w-[135px]"
                  onClick={() => deleteMutate(choosenOrganization.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* temporary admin check */}
      {authorizedUser.superAdmin ? (
        <div className="card p-5">
          <div className="flex justify-between items-center">
            <h3>ორგანიზაციები</h3>
            <Button
              onClick={() =>
                setOpenModal({
                  open: true,
                  action: "დამატება",
                })
              }
              className="p-2 md:text-sm text-xs"
            >
              ორგანიზაციის შექმნა
            </Button>
          </div>
          <Tabs activeIndex={types.length && types[0].id} className="mt-5">
            <TabsNavigation className="flex items-center w-full justify-between border-none">
              <div className="hidden lg:flex justify-start gap-2">
                {tabHeaders}
              </div>
              <div className="lg:hidden flex">{dropdown}</div>
              <Button
                className="p-1 md:text-sm text-xs"
                onClick={() => navigate("/organization-type-edit")}
              >
                ტიპების ცვლილება
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
              openDelete={() => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
              }}
              openEdit={() => {
                setOpenModal({
                  open: true,
                  action: "შეცვლა",
                });
              }}
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
