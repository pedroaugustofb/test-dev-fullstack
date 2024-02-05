import Router from "./router";
import { ToastContainer } from "react-toastify"; // react-toastify is a popular library for adding notifications to your app.
import "react-toastify/dist/ReactToastify.css"; // It's used in the App component to display notifications.
import "./sass/_global.scss";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />

      <Router />
    </AuthProvider>
  );
}

export default App;
