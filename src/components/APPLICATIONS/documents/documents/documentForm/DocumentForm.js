import Button from "components/Button";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDocument,
  getAllTemplates,
  getTemplateById,
  getTemplateColumnsByTemplateId,
} from "services/documents";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import { getCurrentDate, getDateOneMonthFromNow } from "helpers/dateFunctions";
import Alert from "components/Alert";
import { searchOrgPackage } from "services/orgPackages";
const DocumentForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { action } = useParams();
  const [documentCode, setDocumentCode] = useState();
  const [dynamicInputs, setDynamicInputs] = useState({});
  const authorizedUser = useSelector((state) => state.user.authorizedUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm();
  const { data: templatesData = [] } = useQuery({
    queryKey: "getTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });
  const templates = templatesData.filter((item) => item.active === 1);

  const templateId = useWatch({ name: "template_id", control });

  const { data: columns = [], isLoading: columnLoading } = useQuery({
    queryKey: ["getTemplateColumnsByTemplateId", templateId],
    queryFn: () =>
      getTemplateColumnsByTemplateId(templateId).then((res) => res.data.data),
    enabled: !!templateId,
  });
  const { data: template } = useQuery({
    queryKey: ["getTemplateById", templateId],
    queryFn: () => getTemplateById(templateId).then((res) => res.data.data),
    enabled: !!templateId,
    onSuccess: (data) => {
      setDocumentCode(data?.template_code);
    },
  });
  const handleDynamicInputs = (name, event) => {
    setDynamicInputs({ ...dynamicInputs, [name]: event?.target?.value });
  };
  function replacePlaceholders(template, dynamicInputs) {
    // Iterate through each dynamic input
    Object.keys(dynamicInputs).forEach((input) => {
      // Replace placeholders in the template with the corresponding input value
      template = template.replace(
        new RegExp(`{${input}}`, "g"),
        dynamicInputs[input]
      );
    });
    return template;
  }
  useEffect(() => {
    if (dynamicInputs && template?.template_code)
      setDocumentCode(
        replacePlaceholders(template?.template_code, dynamicInputs)
      );
  }, [dynamicInputs, template?.template_code]);
  function afterRequestHandler(message, type) {
    return () => {
      queryClient.invalidateQueries("getAllTemplates");
      setAlert({ message, type });
      setTimeout(() => {
        setAlert({ message: "" });
        // setOpenModal({ open: false });
        navigate("/documents/documents");
      }, 1500);
    };
  }
  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createDocument,
    onSuccess: afterRequestHandler("დოკუმენტი წარმატებით დაემატა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });
  const submitHandler = (data) => {
    const requestData = {
      uuid: uuid(),
      template_id: templateId,
      member_id: authorizedUser?.id,
      document_name: data?.document_name,
      start_date: getCurrentDate("yyyy-MM-dd"),
      end_date: getDateOneMonthFromNow("yyyy-MM-dd"),
      date_expiration: getDateOneMonthFromNow("yyyy-MM-dd"),
      document_code: documentCode,
      service_id: 0,
      cat_id: template.cat_id,
    };
    createMutate(requestData);
  };
  const { data: orgPackages = [] } = useQuery({
    queryKey: ["searchOrgPackage", authorizedUser.oid],
    queryFn: () =>
      searchOrgPackage({
        fild: "oid",
        value: authorizedUser.oid,
      }).then((res) => res.data),
  });
  // console.log(orgPackages);
  // const invoiceNumber = useWatch({ control, name: "ინვოისის ნომერი" });
  // console.log(invoiceNumber);
  // console.log(dynamicInputs);
  useEffect(() => {
    if (authorizedUser?.oid) {
      const packagesPart = orgPackages
        ?.map((pack) => pack.package_id)
        .join("_");
      setValue("ინვოისის ნომერი", `${authorizedUser?.oid}_${packagesPart}`);
      setDynamicInputs({
        ...dynamicInputs,
        "ინვოისის ნომერი": `${authorizedUser?.oid}_${packagesPart}`,
      });
    }
    // eslint-disable-next-line
  }, [authorizedUser?.oid, templateId, setValue]);
  return (
    <main className="workspace p-5">
      <Alert message={alert.message} color={alert.type} dismissable />
      <h3 className="mb-3">
        დოკუმენტის {action === "create" ? "გენერირება" : "შეცვლა"}
      </h3>
      <form onSubmit={handleSubmit(submitHandler)} className="mt-10 max-w-3xl">
        <div className="mb-10" key={"document_name"}>
          <Label
            className={`block mb-1  ${
              errors["document_name"] ? "text-danger" : ""
            }`}
          >
            {"დოკუმენტის სახელი"}
          </Label>

          <textarea
            name="document_name"
            step="any"
            {...register("document_name", {
              validate: {
                pattern: (value) => value?.length > 0,
              },
            })}
            className={`${
              errors.document_name ? "border-danger" : ""
            } form-control`}
          />
        </div>
        <div>
          <Label
            className={`block mb-1  ${
              errors["template_id"] ? "text-danger" : ""
            }`}
          >
            შაბლონი
          </Label>
          <CustomSelect
            name={"template_id"}
            register={register}
            className={`${errors["template_id"] ? "border-danger" : ""}`}
            rules={{
              required: "ველი აუცილებელია",
            }}
          >
            <option value="">{"აირჩიეთ შაბლონი"}</option>
            {templates &&
              templates
                ?.filter((item) =>
                  authorizedUser?.superAdmin
                    ? item
                    : item.org_id === authorizedUser?.oid
                )
                ?.map((item) => (
                  <option
                    className="p-3"
                    key={item.id?.toString() + item.name}
                    value={item.id}
                  >
                    {item?.template_name}
                  </option>
                ))}
          </CustomSelect>
        </div>
        <div className="mt-10 mb-3">
          <p className="font-bold ">ცვლადები</p>
          {!template && (
            <p className="bg-warning bg-opacity-50 p-4 w-max rounded mt-2">
              აირჩიეთ შაბლონი ცვლადების გამოსაჩენად
            </p>
          )}
        </div>
        <div className="flex gap-3 flex-wrap">
          {columnLoading ? (
            <LoadingSpinner blur />
          ) : (
            columns?.map((column) => {
              const name = column.column_marker;
              return (
                <div key={name}>
                  <Label
                    className={`block mb-1  ${
                      errors[name] ? "text-danger" : ""
                    }`}
                  >
                    {name}
                  </Label>
                  <CustomInput
                    name={name}
                    type={"text"}
                    step="any"
                    register={register}
                    rules={{ required: "ველი აუცილებელია" }}
                    className={`${errors[name] ? "border-danger" : ""}`}
                    onChange={(e) => {
                      handleDynamicInputs(name, e);
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
        <Button className="mt-10" type="submit">
          {createLoading ? <LoadingSpinner /> : "შენახვა"}
        </Button>
      </form>
      {documentCode && (
        <>
          <p className="mt-10 font-bold mb-3">დოკუმენტი</p>
          <div
            className="bg-white p-3"
            dangerouslySetInnerHTML={{
              __html: documentCode && documentCode,
            }}
          ></div>
        </>
      )}
    </main>
  );
};
export default DocumentForm;
