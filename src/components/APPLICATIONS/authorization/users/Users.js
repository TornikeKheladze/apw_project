import Footer from "partials/Footer";
import UserList from "./UserList";
import useUsers from "./useUsers";
// import Paths from "components/paths/Paths";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, departments, header, isLoading, id, authorizedUser } =
    useUsers();
  return (
    <main className="workspace">
      {/* {users.length ?<div></div> <Paths /> : <></>} */}
      <div
        className={`${
          users.length ? "opacity-100" : "opacity-0 invisible"
        } h-10 mb-3`}
      >
        {/* <Paths departments={departments} users={users} /> */}
      </div>
      {header()}

      {!authorizedUser.superAdmin && +authorizedUser.oid === +id && (
        <Link
          to={`/activePackage/${authorizedUser.oid}`}
          className="w-max mb-3"
        >
          მომხმარებლების პაკეტების შეძენა
        </Link>
      )}

      <div className="card p-5">
        <UserList
          isLoading={isLoading}
          users={users}
          departments={departments}
        />
      </div>
      <Footer />
    </main>
  );
};

export default Users;
