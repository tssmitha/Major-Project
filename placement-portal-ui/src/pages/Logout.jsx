import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}