import LoadingSpinner from "components/icons/LoadingSpinner";
import logo from "../../../../assets/images/apwlogo.png";
import { useEffect, useState } from "react";

const PdfLayout = ({ actID, actDate, agentData, children, loading }) => {
  const [buttonIsVisible, setButtonIsVisible] = useState(true);

  useEffect(() => {
    // if (!loading) window.print();
  }, [loading]);

  return (
    <div className="w-[63.75rem] mx-auto px-4 py-2 bg-white text-gray-900 text-[10px]">
      {loading && <LoadingSpinner blur />}
      {buttonIsVisible && (
        <button
          onClick={() => {
            setButtonIsVisible(false);
            setTimeout(() => {
              window.print();
              setButtonIsVisible(true);
            }, 100);
          }}
          className="fixed bottom-8 right-8 bg-success p-3 rounded-xl text-white"
        >
          ამობეჭდვა
        </button>
      )}
      <img src={logo} alt="apw" className="w-24 h-auto" />

      <div className="mt-1 mb-1">
        <p>შედარების აქტი {actID}</p>
        <div className="flex justify-between">
          <p>ქ.თბილისი</p>
          <p className="flex justify-end">{actDate}</p>
        </div>
      </div>

      <p className="mb-1 indent-4">
        ერთის მხრივ, <strong>{agentData?.name}</strong> (შემდგომში - „აგენტი“)
        მისი
        {" " + agentData?.act_position}{" "}
        <strong>{agentData?.act_name + " "}</strong>
        სახით რომელიც მოქმედებს კანონმდებლობით გათვალისწინებული უფლებამოსილების
        ფარგლებში ერთის მხრივ და მეორეს მხრივ,{" "}
        <strong>შ.პ.ს. „ოლ ფეი ვეი“</strong> - ს/კ 400147211 (შემდგომში -
        “პროვადერის“ წარმოდგენილი მისი ფინანსური დეპარტამენტის ხელმძღვანელი
        <strong>ნათია ღვინიაშვილის</strong> სახით, რომელიც მოქმედებს
        კანონმდებლობით გათვალისწინებული უფლებამოსილების ფარგლებში, შემდგომში
        ერთად წოდებული როგორც მხარეები.
      </p>

      <p className="indent-4 mb-3">
        ვთანხმდებით, რომ ცხრილში მოცემული საანგარიშო პერიოდის განმავლობაში
        მოცემული ციფრების მიმართ პრეტენზიები არ გაგვაჩნია და ვეთანხმებით მათ
        სისწორეს.
      </p>

      {children}
      {/* შპს ოლ ფეი ვეი
ფინანსური დეპარტამენტის ხელმძღვანელი
ნათია ღვინიაშვილი */}

      <div className="mt-4 flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-black font-bold">შ.პ.ს "ოლ ფეი ვეი"</p>
          <p>ფინანსური დეპარტამენტის ხელმძღვანელი</p>
          <p>ნათია ღვინიაშვილი___________________________</p>
          <p>ბ.ა</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-black font-bold">{agentData?.name}</p>
          <p>{agentData?.act_position}</p>
          <p>{agentData?.act_name}___________________________</p>
          <p>ბ.ა</p>
        </div>
      </div>
    </div>
  );
};

export default PdfLayout;
