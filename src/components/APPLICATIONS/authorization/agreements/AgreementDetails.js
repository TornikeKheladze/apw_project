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
    // იურიდიული პირი
    legal_name: statement.auth_user.name,
    legal_identifi_number: statement.auth_user.identify_code,
    legal_type: statement.auth_user.type,
    legal_sip: statement.auth_user.sip,
    legal_lagel_addres: statement.auth_user.address,
    legal_tell: statement.auth_user.tell,
    legal_email: statement.auth_user.email,
    legal_contact_info: statement.auth_user.contact_info,
    //
  };
  console.log(statement);
  return <NewAgreement disableFields defaultData={formObject} />;
};

export default AgreementDetails;
