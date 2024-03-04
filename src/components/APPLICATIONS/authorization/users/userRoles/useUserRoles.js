import { APPLICATIONS } from "data/applications";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  getSuperAdminData,
  removeRolesFromUser,
  setRolesToUser,
} from "services/roles";

const useUserRoles = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const { id } = useParams();
  const queriClient = useQueryClient();

  // const { authorizedUser } = useSelector((store) => store.user);
  // const uniqueAids = [...new Set(authorizedUser.roles.map((role) => role.aid))];
  // const {} = useQuery({
  //   queryKey: "getRolesAndPermissionsData",
  //   queryFn: () =>
  //     getRolesAndPermissionsData(
  //       APPLICATIONS.find((app) => +app.id === +uniqueAids[0]).url
  //     ),
  // });
  // ადრე ასე იყო რო თუ სუპერადმინია აქ უნდა გაეშვა რექვესტი,
  // თუ არ არის სუპერადმინი მაშინ ავტორიზებულის AID-ს მიხედვით გაეშვება რექვესტი
  const { data: permissionsData = {}, isLoading } = useQuery({
    queryKey: "getSuperAdminData",
    queryFn: () => getSuperAdminData().then((res) => res.data.data),
  });

  const afterRequestHandler = (message, type) => {
    queriClient.invalidateQueries("getSuperAdminData");
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 3000);
  };

  const { mutate: setRolesMutate, isLoading: setLoading } = useMutation({
    mutationFn: (data) => setRolesToUser(data.roleData, data.appUrl),
    onSuccess: () => {
      afterRequestHandler("როლის მინიჭება წარმატებულია", "success");
    },
    onError: (data) => {
      console.log(data);
      afterRequestHandler("როლის მინიჭება ვერ მოხერხდა", "danger");
    },
  });

  const { mutate: removeRolesMutate, isLoading: removeLoading } = useMutation({
    mutationFn: (data) => removeRolesFromUser(data.roleData, data.appUrl),
    onSuccess: () => {
      afterRequestHandler(
        "მომხმარებლისთვის როლის წაშლა წარმატებულია",
        "success"
      );
    },
    onError: (data) => {
      console.log(data);
      afterRequestHandler(
        "მომხმარებლისთვის როლის წაშლა ვერ მოხერხდა",
        "danger"
      );
    },
  });

  const allRoles = useMemo(
    () => permissionsData.roles || [],
    [permissionsData.roles]
  );
  const usersWithRoles = useMemo(
    () => permissionsData.users || [],
    [permissionsData.users]
  );

  useEffect(() => {
    if (usersWithRoles.length > 0) {
      const editedUser = usersWithRoles.find((user) => user.id === +id);
      setSelectedRoles([...editedUser.roles]);
    }
  }, [usersWithRoles, id]);

  const availableRoles = useMemo(
    () =>
      allRoles.filter(
        (role) =>
          !selectedRoles.some((selectedRole) => selectedRole.id === role.id)
      ),
    [allRoles, selectedRoles]
  );

  useEffect(() => {
    if (searchQuery) {
      const res = availableRoles?.filter((role) =>
        role.name.includes(searchQuery)
      );
      setFilteredRoles(res);
    } else {
      setFilteredRoles([]);
    }
  }, [searchQuery, availableRoles]);

  const roleChooseHandler = async (role) => {
    setAlert({
      message: "",
    });
    setRolesMutate({
      roleData: { role_id: role.id, user_id: [id] },
      appUrl: APPLICATIONS.find((app) => +app.id === +role.aid).url,
    });
  };

  const removeFromSelectedRoles = async (data) => {
    setAlert({
      message: "",
    });
    removeRolesMutate({
      roleData: {
        role_id: data.id,
        user_id: [id],
      },
      appUrl: APPLICATIONS.find((app) => +app.id === +data.aid).url,
    });
  };

  const actionLoading = removeLoading || setLoading;
  return {
    searchQuery,
    filteredRoles,
    roleChooseHandler,
    removeFromSelectedRoles,
    isLoading,
    setSearchQuery,
    selectedRoles,
    availableRoles,
    actionLoading,
    alert,
  };
};

export default useUserRoles;
