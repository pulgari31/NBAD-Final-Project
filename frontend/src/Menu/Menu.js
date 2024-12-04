import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/");
  }

  return (
    <nav className="top-menu-bar">
      <div className="menu-items">
        <Link className="menu-link-item" to={"/dashboard"}>
          Dashboard
        </Link>
        <Link className="menu-link-item" to={"/summary"}>
          Summary
        </Link>
        <Link className="menu-link-item" to={"/reports"}>
          Reports
        </Link>
      </div>
      <div>
        {localStorage.getItem("jwt") && (
          <button className="my-btn" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Menu;
