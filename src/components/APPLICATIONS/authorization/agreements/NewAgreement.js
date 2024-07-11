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

const NewAgreement = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues,
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
  const [selectedCatalog, setSelectedCatalog] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  const {
    data: govInfo = {
      catalog: [],
      payment_period: [],
      services: [],
      user_packages: [],
    },
  } = useQuery({
    queryKey: ["getGovInfo"],
    queryFn: () => getGovInfo().then((res) => res.data.data),
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

  function addMonthsToDate(months) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    return currentDate.toISOString().split("T")[0];
  }

  const submitHandler = (data) => {
    console.log(data);
    const firstStepObj = {
      id: 1,
      identify_code: data.identify_code,
      contract_exp:
        contract_exp === "choose"
          ? data.contract_exp_date
          : addMonthsToDate(data.contract_exp),
      // contract_exp: 1,
      payment_period: "5",

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
        name: data.legal_name,
        identifi_number: data.legal_identifi_number,
        lagel_addres: data.legal_lagel_addres,
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
    firstStepInsertMutate(firstStepObj);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "user",
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
  const handleCatalogCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCatalog((prevState) => [...prevState, userId]);
    } else {
      setSelectedCatalog((prevState) =>
        prevState.filter((id) => id !== userId)
      );
    }
  };
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

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   // setAdditionalFiles((prevState) => [...prevState, file]);
  // };

  // temporary
  const contractDates = [
    {
      name: "ერთი",
      value: 1,
    },
    {
      name: "ორი",
      value: 2,
    },
    {
      name: "ექვსი",
      value: 6,
    },
    {
      name: "თორმეტი",
      value: 12,
    },
    {
      name: "საანგარიშო წლის ბოლოს (31 დეკემბერი)",
      value: 13,
    },
    {
      name: "კონკრეტული თარიღის არჩევა",
      value: "choose",
    },
  ];

  return (
    <main className="workspace">
      <Alert color={alert.type} message={alert.message} />
      <div className="card p-5 ">
        <h3 className="mb-2">ახალი ხელშეკრულება</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="border p-2 rounded-md">
            <h4>ავტორიზირებული პირის სერვისები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {govInfo.user_packages?.map((uPackage) => (
                <Checkbox
                  key={uPackage.id + Math.random().toString()}
                  label={`მომხმარებელი:${uPackage.count}, ვადა:${uPackage.exp} თვე, ფასი: ${uPackage.price}`}
                  checked={selectedUserPackage.includes(uPackage.id)}
                  onChange={(event) => handleCheckboxChange(event, uPackage.id)}
                />
              ))}
            </div>
          </div>
          <div className="border p-2 rounded-md">
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
          </div>
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
                />
              ))}
            </div>
          </div>
          <div>
            <Label
              className={`block mb-1  ${
                errors.identify_code ? "text-danger" : ""
              }`}
            >
              საიდენტიფიკაციო კოდი *
            </Label>
            <CustomInput
              name="identify_code"
              type="text"
              step="any"
              register={register}
              rules={{
                required: "ველი აუცილებელია",
              }}
              className={`${errors.identify_code ? "border-danger" : ""}`}
            />
          </div>
          <div>
            <Label
              className={`block mb-1  ${
                errors.contract_exp ? "text-danger" : ""
              }`}
            >
              ხელშეკრულების ვადა *
            </Label>
            <CustomSelect
              name="contract_exp"
              register={register}
              className={`${errors.contract_exp ? "border-danger" : ""}`}
              rules={{ required: "ველი აუცილებელია" }}
            >
              <option value="">ხელშეკრულების ვადა</option>
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
            >
              გადახდის პერიოდულობა *
            </Label>
            <CustomSelect
              name="payment_period"
              register={register}
              className={`${errors.payment_period ? "border-danger" : ""}`}
              rules={{ required: "ველი აუცილებელია" }}
            >
              <option value="">გადახდის პერიოდულობა</option>
              {govInfo.payment_period?.map((item) => (
                <option
                  className="p-3"
                  key={item.id.toString() + item.name}
                  value={item.id}
                >
                  {item.label || item.name || item.category_name}
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
                >
                  აირჩიეთ კონკრეტული თარიღი *
                </Label>
                <CustomInput
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
            <Label className={`block mb-1  `}>
              ცნობა ნასამართლეობის შესახებ
            </Label>
            <CustomInput
              // temporary
              name="conviction"
              type="file"
              step="any"
              register={register}
              rules={{}}
            />
          </div>
          <div>
            <Label className={`block mb-1  `}>ცნობა ჯანმრთელობის შესახებ</Label>
            <CustomInput
              // temporary
              name="health"
              type="file"
              step="any"
              register={register}
              rules={{}}
            />
          </div>
          <div>
            <Label className={`block mb-1  `}>
              ინფორმაცია რომლის დამატებით მოწოდებაც საჭიროდ მიგაჩიათ (250
              სიმბოლო)
            </Label>
            <CustomInput
              name="desc"
              type="text"
              step="any"
              register={register}
              rules={{}}
            />
          </div>
          <div className="border p-2 rounded-md">
            <h4>დამატებითი ფაილები</h4>
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
              <div>
                <Label className={`block mb-1`}>სახელი</Label>
                <CustomInput
                  name="user_name"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>გვარი</Label>
                <CustomInput
                  name="user_lname"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>პირადი ნომერი</Label>
                <CustomInput
                  name="user_personal_number"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>ტელეფონი</Label>
                <CustomInput
                  name="user_tell"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>ელ-ფოსტა</Label>
                <CustomInput
                  name="user_email"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>
                  დამატებითი საკონტაქტო ინფორმაცია
                </Label>
                <CustomInput
                  // temporary
                  name="contact_info"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
            </div>
            <div className="border p-2 border-gray-500 rounded-md">
              <h4>იურიდიული პირი *</h4>

              <div>
                <Label
                  className={`block mb-1  ${
                    errors.legal_name ? "text-danger" : ""
                  }`}
                >
                  დასახელება *
                </Label>
                <CustomInput
                  name="legal_name"
                  type="text"
                  step="any"
                  register={register}
                  rules={{
                    required: "ველი აუცილებელია",
                  }}
                  className={`${errors.legal_name ? "border-danger" : ""}`}
                />
              </div>
              <div>
                <Label
                  className={`block mb-1  ${
                    errors.legal_identifi_number ? "text-danger" : ""
                  }`}
                >
                  საიდენტიფიკაციო ნომერი *
                </Label>
                <CustomInput
                  name="legal_identifi_number"
                  type="text"
                  step="any"
                  register={register}
                  rules={{
                    required: "ველი აუცილებელია",
                  }}
                  className={`${
                    errors.legal_identifi_number ? "border-danger" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  className={`block mb-1  ${
                    errors.legal_lagel_addres ? "text-danger" : ""
                  }`}
                >
                  იურიდიული მისამართი *
                </Label>
                <CustomInput
                  name="legal_lagel_addres"
                  type="text"
                  step="any"
                  register={register}
                  rules={{
                    required: "ველი აუცილებელია",
                  }}
                  className={`${
                    errors.legal_lagel_addres ? "border-danger" : ""
                  }`}
                />
              </div>
              <div>
                <Label className={`block mb-1`}>ტელეფონი</Label>
                <CustomInput
                  name="legal_tell"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1 `}>ელ-ფოსტა</Label>
                <CustomInput
                  name="legal_email"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div>
                <Label className={`block mb-1 `}>
                  დამატებით საკონტაქტო ინფორმაცია
                </Label>

                <CustomInput
                  // temporary
                  name="legal_contact_info"
                  type="text"
                  step="any"
                  register={register}
                  rules={{}}
                />
              </div>
              <div className="border p-3 mt-2 rounded-md">
                <h4>უფლებამოსილი პირი *</h4>

                <div>
                  <Label
                    className={`block mb-1  ${
                      errors.authorized_name ? "text-danger" : ""
                    }`}
                  >
                    სახელი *
                  </Label>
                  <CustomInput
                    name="authorized_name"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_name ? "border-danger" : ""
                    }`}
                  />
                </div>
                <div>
                  <Label
                    className={`block mb-1  ${
                      errors.authorized_lname ? "text-danger" : ""
                    }`}
                  >
                    გვარი *
                  </Label>
                  <CustomInput
                    name="authorized_lname"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_lname ? "border-danger" : ""
                    }`}
                  />
                </div>
                <div>
                  <Label
                    className={`block mb-1  ${
                      errors.authorized_personal_number ? "text-danger" : ""
                    }`}
                  >
                    პირადი ნომერი *
                  </Label>
                  <CustomInput
                    name="authorized_personal_number"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_personal_number ? "border-danger" : ""
                    }`}
                  />
                </div>
                <div>
                  <Label
                    className={`block mb-1  ${
                      errors.authorized_tell ? "text-danger" : ""
                    }`}
                  >
                    ტელეფონი *
                  </Label>
                  <CustomInput
                    name="authorized_tell"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_tell ? "border-danger" : ""
                    }`}
                  />
                </div>
                <div>
                  <Label
                    className={`block mb-1  ${
                      errors.authorized_email ? "text-danger" : ""
                    }`}
                  >
                    ელ-ფოსტა *
                  </Label>
                  <CustomInput
                    name="authorized_email"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_email ? "border-danger" : ""
                    }`}
                  />
                </div>

                <div>
                  <Label className={`block mb-1 `}>
                    დამატებითი საკონტაქტო ინფორმაცია
                  </Label>
                  <CustomInput
                    // temporary
                    name="authorized_contact_info"
                    type="text"
                    step="any"
                    register={register}
                    rules={{}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-400 p-2 rounded-md">
            <h4>ინფორმაცია ავტორიზირებული პირის წარმომადგენლების შესახებ</h4>

            {fields.map((item, index) => (
              <div key={item.id} className="border p-3 mt-2 rounded-md">
                <div className="text-right">
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                  >
                    <span className="la la-trash-alt"></span>
                  </button>
                </div>
                <label className="label">სახელი *</label>
                <input
                  className="form-control"
                  {...register(`user.${index}.name`)}
                  placeholder="სახელი"
                  required
                />
                <label className="label">გვარი *</label>
                <input
                  className="form-control"
                  {...register(`user.${index}.lname`)}
                  placeholder="გვარი"
                  required
                />

                <label className="label">პირადი ნომერი *</label>
                <input
                  className="form-control"
                  {...register(`user.${index}.personal_number`)}
                  placeholder="პირადი ნომერი"
                  required
                />
                <label className="label">ტელეფონი</label>
                <input
                  className="form-control"
                  {...register(`user.${index}.tell`)}
                  placeholder="ტელეფონი"
                  required
                />
                <label className="label">ელ-ფოსტა</label>
                <input
                  className="form-control"
                  {...register(`user.${index}.email`)}
                  placeholder="ელ-ფოსტა"
                  required
                />
                <label className="label">
                  დამატებითი საკონტაქტო ინფორმაცია
                </label>
                <input
                  className="form-control"
                  {...register(`user.${index}.contact_info`)}
                  placeholder="დამატებითი საკონტაქტო ინფორმაცია"
                />
              </div>
            ))}
            <Button
              type="button"
              className="p-2 mb-3"
              onClick={() =>
                append({
                  contact_info: "",
                  email: "",
                  lname: "",
                  name: "",
                  personal_number: "",
                  tell: "",
                })
              }
            >
              დამატება
              <PlusIcon />
            </Button>

            <div className="mt-2">
              <Label className={`block mb-1  `}>
                ინფორმაცია რომლის დამატებით მოწოდებაც საჭიროდ მიგაჩიათ (250
                სიმბოლო)
              </Label>
              <CustomInput
                // temporary
                name="auth_desc"
                type="text"
                step="any"
                register={register}
                rules={{}}
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

          <Button type="submit">დადასტურება</Button>
        </form>
      </div>
    </main>
  );
};

export default NewAgreement;
