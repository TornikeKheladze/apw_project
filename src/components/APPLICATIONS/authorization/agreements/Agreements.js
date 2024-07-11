import { Link } from "react-router-dom";

const Agreements = () => {
  return (
    <main className="workspace">
      <h1 className="text-center mb-3">აირჩიეთ სერვისი</h1>
      <div className="grid grid-cols-3 gap-5">
        <Link to="/agreements/create" className="card p-5">
          <h3 className="text-center">ავტორიზირებული პირი</h3>
        </Link>
        {/* <Link to="/agreements/create" className="card p-5">
          <h3 className="text-center">ავტორიზირებული პირი</h3>
        </Link>
        <Link to="/agreements/create" className="card p-5">
          <h3 className="text-center">ავტორიზირებული პირი</h3>
        </Link> */}
        {/* <Link to="/agreements/create" className="card p-5">
          <h3>ახალი ხელშეკრულება</h3>
        </Link>
        <Link to="/agreements/create" className="card p-5">
          <h3>ახალი ხელშეკრულება</h3>
        </Link>
        <Link to="/agreements/create" className="card p-5">
          <h3>ახალი ხელშეკრულება</h3>
        </Link> */}
      </div>
    </main>
  );
};

export default Agreements;
