import ActRow from "./ActRow";

const ActList = ({ data }) => {
  return (
    <div className="card p-5 w-full overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="table table-auto table_hoverable w-full">
          <thead>
            <tr>
              <th></th>
              <th className="ltr:text-left rtl:text-right">აგენტი</th>
              <th className="text-center">პერიოდი</th>
              <th className="text-center">გახარჯული თანხა</th>
              <th className="text-center">დადასტურება</th>
              <th>აქტის დეტალები</th>
              <th>აქტი</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => <ActRow key={item.customer} data={item} />)
            ) : (
              <tr>
                <td colSpan={4}>ჩანაწერი არ მოიძებნა</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActList;
