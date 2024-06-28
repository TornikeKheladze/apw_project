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
// import Paths from "components/paths/Paths";
import List from "components/list/List";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "../authForm/AuthForm";
import { orgArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import useCheckPermission from "helpers/useCheckPermission";
import { SIPTYPEID } from "data/applications";

const Organizations = () => {
  const {
    organizations,
    members,
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
    states: { choosenOrganization, alert, openModal },
    setStates: { setChoosenOrganization, setOpenModal },
    mutates: { deleteMutate, updateMutate, addMutate },
  } = useOrganization();

  const typeName = typeId
    ? types?.find((type) => type.id === +typeId)?.name
    : types[0]?.name;

  const headerName =
    +typeId === +SIPTYPEID ? "სახელმწიფო უწყებები" : "ავტორიზირებული პირები";

  // instead of members i write membersByType
  const membersByType =
    (members &&
      members.filter((org) => {
        if (authorizedUser.superAdmin) return org;
        if (+typeId === +SIPTYPEID) return +org.type === SIPTYPEID;
        return org;
      })) ||
    [];

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
                  title={"დასახელება"}
                  toUsers={"/users/organisation/"}
                  toDepartments={"/departments/"}
                />
              ) : (
                <p>ინფორმაცია არ მოიძებნა</p>
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

  const createOrgButtonForRegularUser = useCheckPermission(
    "user_create_organisation"
  ) ? (
    <div className="flex justify-between items-center">
      <h3>{headerName}</h3>
      <div className="flex items-end gap-1">
        <Button
          onClick={() =>
            setOpenModal({
              open: true,
              action: "დამატება",
            })
          }
          className="p-1 text-xs"
        >
          ავტორიზირებული პირის რეგისტრაცია
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );

  return (
    <main className="workspace">
      {/* <Paths /> */}

      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setChoosenOrganization({ id: "" });
        }}
      >
        <ModalHeader>
          {+openModal.orgTypeId === SIPTYPEID
            ? "სახელმწიფო უწყების "
            : "ავტორიზირებული პირის "}
          {openModal.action}
        </ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5 overflow-y-auto h-[90vh]">
            <AuthForm
              formArray={orgArr}
              submitHandler={updateMutate}
              isLoading={updateLoading}
              defaultValues={choosenOrganization}
              optionsObj={{
                type: types,
                reseller: [
                  {
                    name: "არის რესელერი",
                    id: 1,
                  },
                  {
                    name: "არ არის რესელერი",
                    id: 0,
                  },
                ],
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5 overflow-y-auto h-[90vh] min-w-80">
            <AuthForm
              // formArray={orgArr}
              formArray={orgArr.filter((item) => {
                if (openModal.orgTypeId === SIPTYPEID)
                  return item.name !== "type";
                return item;
              })}
              submitHandler={addMutate}
              isLoading={addLoading}
              optionsObj={{
                type: types,
                reseller: [
                  {
                    name: "არის რესელერი",
                    id: 1,
                  },
                  {
                    name: "არ არის რესელერი",
                    id: 0,
                  },
                ],
              }}
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
            <h3>{headerName}</h3>
            <Button
              onClick={() =>
                setOpenModal({
                  open: true,
                  action: "დამატება",
                  orgTypeId: SIPTYPEID,
                })
              }
              className="p-2 md:text-sm text-xs"
            >
              უწყების რეგისტრაცია
            </Button>
          </div>
          <Tabs activeIndex={types.length && types[0].id} className="mt-5">
            {+typeId === +SIPTYPEID ? (
              <></>
            ) : (
              <TabsNavigation className="flex items-center w-full justify-between border-none">
                <div className="hidden lg:flex justify-start gap-2">
                  {tabHeaders}
                </div>
                <div className="lg:hidden flex">{dropdown}</div>
                <Button
                  className="p-1 md:text-sm text-xs"
                  onClick={() => navigate("/organization-type-edit")}
                >
                  ტიპების მართვა
                </Button>
              </TabsNavigation>
            )}
            <TabsContent>{tabContents}</TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="card p-5">
          {createOrgButtonForRegularUser}
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
              title={"დასახელება"}
              toUsers={"/users/organisation/"}
              toDepartments={"/departments/"}
            />
          ) : (
            <p>{headerName} არ მოიძებნა</p>
          )}
          {membersByType && membersByType.length ? (
            <div className="mt-3">
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
                items={membersByType}
                title={headerName}
                toUsers={"/users/organisation/"}
                toDepartments={"/departments/"}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Organizations;
