import Footer from "partials/Footer";
import UserList from "./UserList";
import useUsers from "./useUsers";
import Paths from "components/paths/Paths";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, departments, header, isLoading } = useUsers();
  return (
    <main className="workspace">
      {/* {users.length ?<div></div> <Paths /> : <></>} */}
      <div
        className={`${
          users.length ? "opacity-100" : "opacity-0 invisible"
        } h-10 mb-3`}
      >
        <Paths departments={departments} users={users} />
      </div>
      {header()}

      {users.length ? (
        <Link to={"role"} className="w-max mb-3">
          როლის მინიჭება
        </Link>
      ) : (
        <></>
      )}

      <div className="card p-5">
        <UserList isLoading={isLoading} users={users} />
      </div>
      <Footer />
    </main>
  );
};

export default Users;
