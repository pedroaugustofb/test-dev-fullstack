import { useNavigate } from "react-router-dom";
import Logo from "../logo";
import "./styles.scss";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="center-container">
      <div className="loader-container">
        <Logo />
        <div className="loader-text-box">
          <h1>Oops, something happend.</h1>
          <p>The page you are looking for returned an error.</p>
        </div>
      </div>

      {window.location.pathname !== "/" && (
        <button
          className="bg-primary  py-2 px-4 rounded-md text-white font-bold hover:bg-secondaryDark duration-300"
          type="button"
          onClick={() => navigate("/")}
        >
          Go back to home
        </button>
      )}
    </div>
  );
}
