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
    // isLoading: statementLoading,
  } = useQuery({
    queryKey: ["getStatementById", id],
    queryFn: () => getStatementById(id).then((res) => res.data.data),
  });
  const formObject = {
    legal_name: statement.auth_user.name,
    legal_identifi_number: statement.auth_user.identify_code,
    // name: data.legal_name || data.user_name,
    // identifi_number: data.legal_identifi_number || data.user_personal_number,
    // lagel_addres: data.legal_lagel_addres,
    // type: data.legal_type,
    // sip: data.legal_sip,
    // status: data.status,
  };
  // console.log(statement);
  return <NewAgreement disableFields defaultData={formObject} />;
};

export default AgreementDetails;
