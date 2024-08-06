import { removeEmpty } from "helpers/removeEmpty";

export const addMonthsToDate = (months) => {
  try {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    return currentDate.toISOString().split("T")[0];
  } catch (error) {
    return undefined;
  }
};

export const buildFormObject = (
  data,
  contract_exp,
  selectedUserPackage,
  selectedService,
  selectedCatalog
) => {
  const legalObj = removeEmpty({
    // თუ ლეგალი არ შეავსო მაშინ იუზერიდან ვიღებ საიდენტიფიკაციოს და სახელს
    name: data.legal_name || data.user_name,
    identifi_number: data.legal_identifi_number || data.user_personal_number,
    lagel_addres: data.legal_lagel_addres,
    type: data.legal_type,
    sip: data.legal_sip,
    status: data.status,
  });

  const firstStepObj = {
    id: 1,
    identify_code: data.identify_code,
    contract_exp:
      contract_exp === "choose"
        ? data.contract_exp_date
        : addMonthsToDate(data.contract_exp),
    // contract_exp: 1,
    payment_period: data.payment_period,
    payment_methos_data:
      +data.payment_period === 5 ? data.payment_methos_data : "",

    // conviction_doc: {
    //   doc_id: "6633970bbd4cd27b533dd6e6",
    //   user_email: "test_23@test.ge",
    // },
    // health_doc: {
    //   doc_id: "66337be0bd4cd27b533dd5c8",
    //   user_email: "test_23@test.ge",
    // },
    desc: data.desc,
    // additional_doc: {
    //   1: {
    //     doc_name: "name",
    //     doc_id: "6633970bbd4cd27b533dd6e6",
    //   },
    //   2: {
    //     doc_name: "name",
    //     doc_id: "6633970bbd4cd27b533dd6e7",
    //   },
    // },

    user: {
      name: data.user_name,
      lname: data.user_lname,
      personal_number: data.user_personal_number,
      contact: {
        tell: data.user_tell,
        email: data.user_email,
        // contact_info
      },
    },

    legal: {
      ...legalObj,
      contact: {
        legal_tell: data.legal_tell,
        legal_email: data.legal_email,
        // legal_contact_info
      },
      authorized: {
        name: data.authorized_name,
        lname: data.authorized_lname,
        personal_number: data.authorized_personal_number,
        contact: {
          tell: data.authorized_tell,
          email: data.authorized_email,
        },
        // authorized_contact_info
        // auth_desc
      },
    },
    package: {
      user_package: selectedUserPackage,
      billing_package: {
        services: selectedService,
        catalog: selectedCatalog,
      },
    },
  };

  return firstStepObj;
};
