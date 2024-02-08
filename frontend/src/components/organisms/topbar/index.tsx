import { User, List, LayoutDashboard } from "lucide-react";
import PageLimits from "../../atoms/page-limits";
import "./styles.scss";
import { useAuth } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Topbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      toast.error("Error on logout");
    }
  };

  return (
    <PageLimits>
      <div className="topbar-container">
        <div className="logo-container">
          <h1 className="logo-topbar">Test Products API</h1>
          <List className="icon topbar-icon" />
        </div>

        {isAuthenticated ? (
          <button className="topbar-container" onClick={handleLogout}>
            <div className="logged-text-container">
              <span>Hello, {`${user?.name} ${user?.lastName}`}</span>
              <p>Click to logout</p>
            </div>
            <LayoutDashboard className="icon" />
          </button>
        ) : (
          <button className="topbar-container" onClick={() => navigate("/admin/login")}>
            <span>Login</span>
            <User className="icon" />
          </button>
        )}
      </div>
    </PageLimits>
  );
}
