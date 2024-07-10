import Button from "components/Button";
import Checkbox from "components/form/Checkbox";
import CustomInput from "components/form/CustomInput";
import CustomSelect from "components/form/CustomSelect";
import Label from "components/form/Label";
import PlusIcon from "components/icons/PlusIcon";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { getBillingPackages } from "services/billingPackages";
import { getPaymentMethods } from "services/orgPackages";
import { getPackages } from "services/packages";

const NewAgreement = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues,
  });
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [authFiles, setAuthFiles] = useState([]);
  const [authUserForm, setAuthUserForm] = useState([]);
  const payment_period = useWatch({
    control,
    name: "payment_period",
  });

  const contract_exp = useWatch({
    control,
    name: "contract_exp",
  });

  const [selectedUserPackage, setSelectedUserPackage] = useState([]);
  const [selectedBilPackage, setSelectedBilPackage] = useState([]);
  const { data: paymentMethods = [] } = useQuery({
    queryKey: "getPaymentMethods",
    queryFn: () => getPaymentMethods().then((res) => res.data.data),
  });
  const { data: billingPackages = [] } = useQuery({
    queryKey: "getBillingPackages",
    queryFn: () => getBillingPackages().then((res) => res.data),
  });
  const { data: packages = [] } = useQuery({
    queryKey: ["getPackages"],
    queryFn: () => getPackages().then((res) => res.data),
  });

  const submitHandler = (data) => {
    console.log(data);
  };
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
  const handleBillingCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBilPackage((prevState) => [...prevState, userId]);
    } else {
      setSelectedBilPackage((prevState) =>
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

  // console.log(selectedUserPackage);

  // console.log(selectedBilPackage);

  // console.log(additionalFiles);

  return (
    <main className="workspace">
      <div className="card p-5 ">
        <h3 className="mb-2">ახალი ხელშეკრულება</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="border p-2 rounded-md">
            <h4>ავტორიზირებული პირის სერვისები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {packages?.map((uPackage) => (
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
            <h4>საბილინგო სისტემის სერვისები</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {billingPackages?.map((bPackage) => (
                <Checkbox
                  key={bPackage.packageID + Math.random().toString()}
                  label={`რაოდენობა:${bPackage.quantity}, ვადა:${bPackage.expiration} თვე, ფასი: ${bPackage.price}`}
                  checked={selectedBilPackage.includes(bPackage.packageID)}
                  onChange={(event) =>
                    handleBillingCheckboxChange(event, bPackage.packageID)
                  }
                />
              ))}
            </div>
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
              {paymentMethods?.map((item) => (
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
                  name="user_personl_number"
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
                      errors.authorized_personl_number ? "text-danger" : ""
                    }`}
                  >
                    პირადი ნომერი *
                  </Label>
                  <CustomInput
                    name="authorized_personl_number"
                    type="text"
                    step="any"
                    register={register}
                    rules={{
                      required: "ველი აუცილებელია",
                    }}
                    className={`${
                      errors.authorized_personl_number ? "border-danger" : ""
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
                  <Label className={`block mb-1 `}>იურიდიული მისამართი</Label>
                  <CustomInput
                    // temporary
                    name="authorized_legal_addres"
                    type="text"
                    step="any"
                    register={register}
                    rules={{}}
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
            <Button
              type="button"
              className="p-2 mb-3"
              onClick={() =>
                setAuthUserForm((prevState) => [
                  ...prevState,
                  prevState.length + 1,
                ])
              }
            >
              დამატება
              <PlusIcon />
            </Button>

            {authUserForm.map((item) => {
              return (
                <div
                  key={item + Math.random()}
                  className="border p-3 mt-2 rounded-md"
                >
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setAuthUserForm((prevState) =>
                          prevState.filter((i) => i !== item)
                        )
                      }
                      className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                    >
                      <span className="la la-trash-alt"></span>
                    </button>
                  </div>
                  <div>
                    <Label
                      className={`block mb-1  ${
                        errors[`${item}_name`] ? "text-danger" : ""
                      }`}
                    >
                      სახელი *
                    </Label>
                    <CustomInput
                      name={`${item}_name`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{
                        required: "ველი აუცილებელია",
                      }}
                      className={`${
                        errors[`${item}_name`] ? "border-danger" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      className={`block mb-1  ${
                        errors[`${item}_lname`] ? "text-danger" : ""
                      }`}
                    >
                      გვარი *
                    </Label>
                    <CustomInput
                      name={`${item}_lname`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{
                        required: "ველი აუცილებელია",
                      }}
                      className={`${
                        errors[`${item}_lname`] ? "border-danger" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      className={`block mb-1  ${
                        errors[`${item}_personl_number`] ? "text-danger" : ""
                      }`}
                    >
                      პირადი ნომერი *
                    </Label>
                    <CustomInput
                      name={`${item}_personl_number`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{
                        required: "ველი აუცილებელია",
                      }}
                      className={`${
                        errors[`${item}_personl_number`] ? "border-danger" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      className={`block mb-1  ${
                        errors[`${item}_tell`] ? "text-danger" : ""
                      }`}
                    >
                      ტელეფონი *
                    </Label>
                    <CustomInput
                      name={`${item}_tell`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{
                        required: "ველი აუცილებელია",
                      }}
                      className={`${
                        errors[`${item}_tell`] ? "border-danger" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      className={`block mb-1  ${
                        errors[`${item}_email`] ? "text-danger" : ""
                      }`}
                    >
                      ელ-ფოსტა *
                    </Label>
                    <CustomInput
                      name={`${item}_email`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{
                        required: "ველი აუცილებელია",
                      }}
                      className={`${
                        errors[`${item}_email`] ? "border-danger" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label className={`block mb-1 `}>
                      დამატებითი საკონტაქტო ინფორმაცია
                    </Label>
                    <CustomInput
                      // temporary
                      name={`${item}_contact_info`}
                      type="text"
                      step="any"
                      register={register}
                      rules={{}}
                    />
                  </div>
                </div>
              );
            })}
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
