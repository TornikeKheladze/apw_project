import Alert from "components/Alert";
import Button from "components/Button";
import Checkbox from "components/form/Checkbox";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import PlusIcon from "components/icons/PlusIcon";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  firstStepInsert,
  getGovInfo,
  secondStepInsert,
} from "services/organizations";
import { useFormRefresh } from "./useFormRefresh";
import { buildFormObject } from "./helpers";
import { useSelector } from "react-redux";
import {
  fizikuriArr,
  legalUser,
  uflebamosiliArr,
} from "components/APPLICATIONS/billing/formArrays/agreementArr";
import { BuildAvtFields, BuildFields } from "./BuildFields";
import { uploadDocument } from "services/documents";

const NewAgreement = ({ disableFields, defaultData }) => {
  const { authOrg } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      user: [
        {
          contact_info: "",
          email: "",
          lname: "",
          name: "",
          personal_number: "",
          tell: "",
          user_date_expiration: "",
          comment: "",
        },
      ],
    },
  });
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [authFiles, setAuthFiles] = useState([]);
  const payment_period = useWatch({
    control,
    name: "payment_period",
  });

  const contract_exp = useWatch({
    control,
    name: "contract_exp",
  });

  const secondStepUsers = useWatch({
    control,
    name: "user",
  });

  const [selectedUserPackage, setSelectedUserPackage] = useState([]);
  // eslint-disable-next-line
  const [selectedCatalog, setSelectedCatalog] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  const {
    data: govInfo = {
      catalog: [],
      payment_period: [],
      services: [],
      user_packages: [],
      types: [],
    },
    isFetched: isGovInfoFetched,
  } = useQuery({
    queryKey: ["getGovInfo"],
    queryFn: () =>
      getGovInfo({ identify_code: authOrg.identify_code }).then(
        (res) => res.data.data
      ),
    enabled: authOrg.identify_code ? true : false,
  });

  const { mutate: secondStepMutate } = useMutation({
    mutationFn: secondStepInsert,
    onSuccess: (data) => {
      if (data.data.status === true) {
        setAlert({
          message: "ქმედება წარმატებულია",
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      } else {
        setAlert({
          message: "შეცდომა",
          type: "danger",
        });
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      }
    },
    onError: (data) => {
      setAlert({
        message: data.response.data.message,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 3000);
    },
  });

  const { mutate: firstStepInsertMutate } = useMutation({
    mutationFn: firstStepInsert,
    onSuccess: (data) => {
      if (data.data.status === true) {
        secondStepMutate({ id: 1, oid: data.data.data, user: secondStepUsers });
      } else {
        setAlert({
          message: "შეცდომა",
          type: "danger",
        });
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      }
    },
    onError: (data) => {
      setAlert({
        message: data.response.data.message,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 3000);
    },
  });

  const submitHandler = (data) => {
    const firstStepObj = buildFormObject(
      { ...data, identify_code: authOrg.identify_code },
      contract_exp,
      selectedUserPackage,
      selectedService,
      selectedCatalog
    );
    firstStepInsertMutate(firstStepObj);
  };

  const saveForm = () => {
    const form = buildFormObject(
      { ...formData, identify_code: authOrg.identify_code },
      contract_exp,
      selectedUserPackage,
      selectedService,
      selectedCatalog
    );
    firstStepInsertMutate(form);
    console.log(form);
  };

  const {
    fields: userFields,
    append: userAppend,
    remove: userRemove,
  } = useFieldArray({
    control,
    name: "user",
  });
  const {
    fields: danartiFields,
    append: danartiAppend,
    remove: danartiRemove,
  } = useFieldArray({
    control,
    name: "danarti",
  });

  const { handleFormChange } = useFormRefresh({
    setFormData,
    setValue,
    formData,
    selectedUserPackage,
    selectedService,
    setSelectedUserPackage,
    setSelectedService,
    isGovInfoFetched,
    defaultData,
  });

  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedUserPackage((prevState) => [...prevState, userId]);
    } else {
      setSelectedUserPackage((prevState) =>
        prevState.filter((id) => id !== userId)
      );
    }
  };
  // const handleCatalogCheckboxChange = (event, userId) => {
  //   const isChecked = event.target.checked;

  //   if (isChecked) {
  //     setSelectedCatalog((prevState) => [...prevState, userId]);
  //   } else {
  //     setSelectedCatalog((prevState) =>
  //       prevState.filter((id) => id !== userId)
  //     );
  //   }
  // };
  const handleServiceCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedService((prevState) => [...prevState, userId]);
    } else {
      setSelectedService((prevState) =>
        prevState.filter((id) => id !== userId)
      );
    }
  };

  const { mutate: uploadDocumentMutate } = useMutation({
    mutationFn: uploadDocument,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    uploadDocumentMutate(fileFormData);
    // setAdditionalFiles((prevState) => [...prevState, file]);
  };

  // temporary
  const contractDates = [
    {
      name: "ერთი თვე",
      value: 1,
    },
    {
      name: "ორი თვე",
      value: 2,
    },
    {
      name: "ექვსი თვე",
      value: 6,
    },
    {
      name: "თორმეტი თვე",
      value: 12,
    },
    {
      name: "საანგარიშო წლის ბოლო (31 დეკემბერი)",
      value: 13,
    },
    {
      name: "კონკრეტული თარიღის არჩევა",
      value: "choose",
    },
  ];

  const legalOptions = {
    legal_sip: [
      {
        name: "არა",
        id: 0,
      },
      {
        name: "დიახ",
        id: 1,
      },
    ],
    legal_type: govInfo.types || [],
  };

  return (
    <main className="workspace">
      <Alert color={alert.type} message={alert.message} />
      <div className="card p-5 ">
        <h3 className="mb-2">ახალი განცხადება</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
          onChange={handleFormChange}
        >
          <div className="border p-2 rounded-md">
            <h4>მომხმარებლების სერვისები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {govInfo.user_packages?.map((uPackage) => (
                <Checkbox
                  key={uPackage.id + Math.random().toString()}
                  label={`მომხმარებელი:${uPackage.count}, ვადა:${uPackage.exp} თვე, ფასი: ${uPackage.price}`}
                  checked={selectedUserPackage.includes(uPackage.id)}
                  onChange={(event) => handleCheckboxChange(event, uPackage.id)}
                  disabled={disableFields ? true : false}
                />
              ))}
            </div>
          </div>
          {/* <div className="border p-2 rounded-md">
            <h4>კატალოგები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {govInfo.catalog?.map((catalog) => (
                <Checkbox
                  key={catalog.catID + Math.random().toString()}
                  label={catalog.categoryName}
                  checked={selectedCatalog.includes(catalog.catID)}
                  onChange={(event) =>
                    handleCatalogCheckboxChange(event, catalog.catID)
                  }
                />
              ))}
            </div>
          </div> */}
          <div className="border p-2 rounded-md">
            <h4>კატალოგის სერვისები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {govInfo.services?.map((service) => (
                <Checkbox
                  key={service.serviceID + Math.random().toString()}
                  label={service.name}
                  checked={selectedService.includes(service.serviceID)}
                  onChange={(event) =>
                    handleServiceCheckboxChange(event, service.serviceID)
                  }
                  disabled={disableFields ? true : false}
                />
              ))}
            </div>
          </div>
          <div>
            <Label
              className={`block mb-1  ${
                errors.contract_exp ? "text-danger" : ""
              }`}
              htmlFor="contract_exp"
            >
              ხელშეკრულების ვადა *
            </Label>
            <CustomSelect
              id="contract_exp"
              name="contract_exp"
              register={register}
              className={`${errors.contract_exp ? "border-danger" : ""}`}
              rules={{ required: "ველი აუცილებელია" }}
              disabled={disableFields ? true : false}
            >
              <option value="" disabled>
                ხელშეკრულების ვადა
              </option>
              {contractDates?.map((item) => (
                <option
                  className="p-3"
                  key={item.value + item.name}
                  value={item.value}
                >
                  {item.name}
                </option>
              ))}
            </CustomSelect>

            {contract_exp === "choose" ? (
              <CustomInput
                // temporary name
                name="contract_exp_date"
                type="date"
                step="any"
                register={register}
                rules={{
                  required: "ველი აუცილებელია",
                }}
                className={`${
                  errors.contract_exp_date ? "border-danger" : ""
                } mt-1`}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <Label
              className={`block mb-1  ${
                errors.payment_period ? "text-danger" : ""
              }`}
              htmlFor="payment_period"
            >
              გადახდის პერიოდულობა *
            </Label>
            <CustomSelect
              id="payment_period"
              name="payment_period"
              register={register}
              className={`${errors.payment_period ? "border-danger" : ""}`}
              rules={{ required: "ველი აუცილებელია" }}
              disabled={disableFields ? true : false}
            >
              <option value="">გადახდის პერიოდულობა</option>
              {govInfo.payment_period?.map((item) => (
                <option
                  className="p-3"
                  key={item.id.toString() + item.name}
                  value={+item.id}
                >
                  {item.name}
                </option>
              ))}
            </CustomSelect>
            {+payment_period === 5 ? (
              // temporary name
              <div className="mt-2">
                <Label
                  className={`block mb-1  ${
                    errors.payment_methos_data ? "text-danger" : ""
                  }`}
                  htmlFor="payment_methos_data"
                >
                  აირჩიეთ კონკრეტული თარიღი *
                </Label>
                <CustomInput
                  id="payment_methos_data"
                  name="payment_methos_data"
                  type="date"
                  step="any"
                  register={register}
                  rules={{
                    required: "ველი აუცილებელია",
                  }}
                  className={`${
                    errors.payment_methos_data ? "border-danger" : ""
                  }`}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Label htmlFor="conviction" className={`block mb-1  `}>
              ცნობა ნასამართლეობის შესახებ
            </Label>
            <CustomInput
              // temporary
              id="conviction"
              name="conviction"
              type="file"
              step="any"
              register={register}
              rules={{}}
              onChange={handleFileChange}
              disabled={disableFields ? true : false}
            />
          </div>
          <div>
            <Label htmlFor="health" className={`block mb-1  `}>
              ცნობა ჯანმრთელობის შესახებ
            </Label>
            <CustomInput
              // temporary
              id="health"
              name="health"
              type="file"
              step="any"
              register={register}
              rules={{}}
              disabled={disableFields ? true : false}
            />
          </div>
          <div>
            <Label className={`block mb-1  `} htmlFor="desc">
              ინფორმაცია რომლის დამატებით მოწოდებაც საჭიროდ მიგაჩნიათ (250
              სიმბოლო)
            </Label>
            <textarea
              id="desc"
              name="desc"
              rows="1"
              type="textarea"
              step="any"
              {...register("desc")}
              className="form-control"
              maxLength={250}
              disabled={disableFields ? true : false}
            />
          </div>
          <div className="border p-2 rounded-md">
            <h4>ფაილები დამატებითი ინფორმაციების საილუსტრაციოდ</h4>
            <Button
              type="button"
              className="p-2 mb-3"
              onClick={() =>
                setAdditionalFiles((prevState) => [
                  ...prevState,
                  prevState.length + 1,
                ])
              }
            >
              ფაილის დამატება
              <PlusIcon />
            </Button>
            {additionalFiles.map((item) => {
              return (
                <div
                  className="mb-1 flex items-center justify-between"
                  key={item}
                >
                  <CustomInput
                    // temporary
                    name={`${item}-file`}
                    type="file"
                    step="any"
                    register={register}
                    rules={{}}
                    className="w-4/5"
                    disabled={disableFields ? true : false}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setAdditionalFiles((prevState) =>
                        prevState.filter((i) => i !== item)
                      )
                    }
                    className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                  >
                    <span className="la la-trash-alt"></span>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="border border-gray-700 p-2 rounded-md">
            <h4 className="mb-2">ინფორმაცია განმცხადებლის შესახებ</h4>
            <div className="border p-2 mb-2 rounded-md">
              <h4>ფიზიკური პირი</h4>
              <BuildFields
                errors={errors}
                register={register}
                staticArr={fizikuriArr}
                disabled={disableFields ? true : false}
              />
            </div>
            <div className="border p-2 border-gray-500 rounded-md">
              <h4>იურიდიული პირი *</h4>
              <BuildFields
                errors={errors}
                register={register}
                staticArr={legalUser}
                selectOptions={legalOptions}
                disabled={disableFields ? true : false}
              />

              <div className="border p-3 mt-2 rounded-md">
                <h4>უფლებამოსილი პირი *</h4>
                <BuildFields
                  errors={errors}
                  register={register}
                  staticArr={uflebamosiliArr}
                  disabled={disableFields ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="border border-gray-400 p-2 rounded-md">
            <h4>ინფორმაცია ავტორიზირებული პირის წარმომადგენლების შესახებ</h4>

            {userFields.map((item, index) => (
              <div key={item.id} className="border p-3 mt-2 rounded-md">
                <div className="text-right">
                  {disableFields ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => userRemove(index)}
                      type="button"
                      className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                    >
                      <span className="la la-trash-alt"></span>
                    </button>
                  )}
                </div>
                <BuildAvtFields
                  index={index}
                  register={register}
                  disabled={disableFields ? true : false}
                />
              </div>
            ))}
            {disableFields ? (
              <></>
            ) : (
              <Button
                type="button"
                className="p-2 my-3"
                onClick={() =>
                  userAppend({
                    contact_info: "",
                    email: "",
                    lname: "",
                    name: "",
                    personal_number: "",
                    tell: "",
                    user_date_expiration: "",
                    comment: "",
                  })
                }
              >
                ახალი წარმომადგენლის დამატება
                <PlusIcon />
              </Button>
            )}

            <div className="mt-2">
              <Label className={`block mb-1  `} htmlFor="auth_desc">
                ინფორმაცია რომლის დამატებით მოწოდებაც საჭიროდ მიგაჩნიათ (250
                სიმბოლო)
              </Label>
              <textarea
                id="auth_desc"
                name="auth_desc"
                rows="1"
                type="textarea"
                step="any"
                {...register("auth_desc")}
                className="form-control"
                maxLength={250}
                disabled={disableFields ? true : false}
              />
            </div>
            <div className="border p-2 rounded-md mt-2">
              <h4>ფაილები დამატებითი ინფორმაციების საილუსტრაციოდ</h4>
              <Button
                type="button"
                className="p-2 mb-3"
                onClick={() =>
                  setAuthFiles((prevState) => [
                    ...prevState,
                    prevState.length + 1,
                  ])
                }
              >
                ფაილის დამატება
                <PlusIcon />
              </Button>
              {authFiles.map((item) => {
                return (
                  <div
                    className="mb-1 flex items-center justify-between"
                    key={item}
                  >
                    <CustomInput
                      // temporary
                      name={`${item}-file-auth`}
                      type="file"
                      step="any"
                      register={register}
                      rules={{}}
                      className="w-4/5"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setAuthFiles((prevState) =>
                          prevState.filter((i) => i !== item)
                        )
                      }
                      className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                    >
                      <span className="la la-trash-alt"></span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border p-2 rounded-md mt-2">
            <h4>დანართების დამატება</h4>
            {danartiFields.map((item, index) => {
              return (
                <div
                  className="mb-1 flex items-center justify-between border p-2 rounded-md border-gray-700"
                  key={item.id}
                >
                  <div className="w-4/5">
                    <Label
                      htmlFor={`danarti.${index}.name`}
                      className={`block mb-1`}
                    >
                      ფაილის დასახელება
                    </Label>
                    <CustomInput
                      id={`danarti.${index}.name`}
                      name={`danarti.${index}.name`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{}}
                      className="h-11 mb-1"
                      placeholder="ფაილის დასახელება"
                      disabled={disableFields ? true : false}
                    />
                    <CustomInput
                      name={`danarti.${index}.file`}
                      type="file"
                      step="any"
                      register={register}
                      rules={{}}
                      disabled={disableFields ? true : false}
                    />
                  </div>
                  {disableFields ? (
                    <></>
                  ) : (
                    <button
                      type="button"
                      onClick={() => danartiRemove(index)}
                      className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                    >
                      <span className="la la-trash-alt"></span>
                    </button>
                  )}
                </div>
              );
            })}
            {disableFields ? (
              <></>
            ) : (
              <Button
                type="button"
                className="p-2 mt-3"
                onClick={() =>
                  danartiAppend({
                    file: "",
                    name: "",
                  })
                }
              >
                ფაილის დამატება
                <PlusIcon />
              </Button>
            )}
          </div>
          {disableFields ? (
            <></>
          ) : (
            <div className="flex gap-2">
              <Button onClick={saveForm} type="button">
                დამახსოვრება
              </Button>
              <Button color="success" type="submit">
                დადასტურება
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default NewAgreement;
