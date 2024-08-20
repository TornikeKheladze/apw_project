import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStatementById } from "services/organizations";
import NewAgreement from "./NewAgreement";

const AgreementDetails = () => {
  const { id } = useParams();
  const {
    data: statement = {
      package: [],
      auth_user: {},
      document: [],
      users: [{}],
    },
    // mutate: getStatementMutate,
    // isLoading: statementLoading,
  } = useQuery({
    queryKey: ["getStatementById", id],
    queryFn: () => getStatementById(id).then((res) => res.data.data),
  });
  // console.log(statement);
  return <NewAgreement disableFields statement={statement} />;
};

export default AgreementDetails;
