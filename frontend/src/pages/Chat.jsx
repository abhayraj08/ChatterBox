import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <div>
      <h2>Welcome {username} to Chat!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
