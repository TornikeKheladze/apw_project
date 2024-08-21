import Alert from "components/Alert";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Checkbox from "components/form/Checkbox";
import Label from "components/form/Label";
import Textarea from "components/form/Textarea";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { buildMemberList } from "helpers/treeMenuBuilder";
import { truncateText } from "helpers/truncateText";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { sendSms } from "services/authorization";
import { getOrganizations } from "services/organizations";
import { getUsersByTypeAndId } from "services/users";

const Sms = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const { oid } = useParams();
  const { authorizedUser } = useSelector((store) => store.user);

  const {
    data: userData = { users: [], member: null },
    isLoading: isUsersLoading,
  } = useQuery({
    queryKey: ["getUsers", oid],
    queryFn: () =>
      getUsersByTypeAndId("organisation", oid).then((res) => res?.data),
    onSuccess: () => setSelectedUsers([]),
    enabled: !!oid,
  });

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
    });

  const { mutate: sendSmsMutate, isLoading: sendSmsLoading } = useMutation({
    mutationFn: () =>
      sendSms({
        user_id: selectedUsers,
        text,
      }),
    onSuccess: () => {
      setSelectedUsers([]);
      setText("");
      setAlert({
        message: "შეტყობინება გაიგზავნა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "success",
        });
      }, 2500);
    },
    onError: (data) => {
      setAlert({
        message: data.response.data.description,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 2500);
    },
  });

  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  const users = buildMemberList(userData, authorizedUser, oid);
  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data;

  const organization = organizations.find((org) => +org?.id === +oid) || {};

  return (
    <main className="workspace">
      <Alert message={alert.message} color={alert.type} />
      <div className="lg:w-1/2 w-full mx-auto card mb-3 p-5">
        <Dropdown
          content={
            <div className="dropdown-menu min-w-[12rem]">
              {organizations
                ?.filter((org) => org.id !== organization.id)
                .map((org) => (
                  <Link key={org.id + Math.random()} to={`/sms/${org.id}`}>
                    {org.name}
                  </Link>
                ))}
            </div>
          }
        >
          <Button className="uppercase mb-6 min-w-[12rem] flex justify-between">
            {organization.name ? (
              truncateText(organization?.name, 40)
            ) : (
              <>
                {authorizedUser.superAdmin
                  ? "ავტორიზირებული პირი ან უწყება"
                  : "ავტორიზირებული პირი"}
              </>
            )}
            {/* {truncateText(organization?.name, 40)} */}
            <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
          </Button>
        </Dropdown>
        <h4 className="text-sm mb-1 text-primary">მომხმარებლებლები</h4>

        {users.length > 0 && (
          <button
            className="rounded-md border-primary border-[1px] mb-2 p-1"
            onClick={() =>
              setSelectedUsers(
                selectedUsers.length === users.length
                  ? []
                  : [...users.map((user) => user.id)]
              )
            }
          >
            ყველას მონიშვნა
          </button>
        )}

        <div className="w-full ">
          {isUsersLoading ? (
            <div className="flex flex-col gap-2 items-center mx-auto col-span-3">
              <LoadingSpinner />
              <p>იტვირთება...</p>
            </div>
          ) : users.length === 0 ? (
            <p className="col-span-2">მომხმარებლები არ მოიძებნა</p>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {users?.map((user) => (
                  <Checkbox
                    key={user.id + Math.random().toString()}
                    label={user.name + " " + user.l_name}
                    checked={selectedUsers.includes(user.id)}
                    onChange={(event) => handleCheckboxChange(event, user.id)}
                  />
                ))}
              </div>
              <Label htmlFor="smsText">შეტყობინება</Label>
              <Textarea
                id="smsText"
                className="my-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                disabled={selectedUsers.length === 0 || !text}
                onClick={sendSmsMutate}
              >
                {sendSmsLoading ? <LoadingSpinner /> : "გაგზავნა"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Sms;
