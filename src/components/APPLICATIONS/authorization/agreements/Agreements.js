import { Link } from "react-router-dom";

const Agreements = () => {
  return (
    <main className="workspace">
      <div className="grid grid-cols-2 gap-5">
        <Link to="/agreements/create" className="card p-5">
          <h3>ავტორიზირებული პირი</h3>
        </Link>
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
