import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { ReactNode } from "react";
import { useAuth } from "./contexts/auth";
import HomePage from "./pages/home";

const PrivateRoute = ({ element, path }: { element: JSX.Element | ReactNode; path: string }) => {
  const { isAuthenticated } = useAuth();
  return <Route path={path} element={isAuthenticated ? element : <Navigate to={"/login"} />} />;
};

type RouteType = { path: string; component: JSX.Element | ReactNode };
const openRoutes: RouteType[] = [
  { path: "/admin/login", component: <LoginPage /> },
  {
    path: "/",
    component: <HomePage />,
  },
];
const protectedRoutes: RouteType[] = [];

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {openRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}

        {protectedRoutes.map((route) => (
          <PrivateRoute key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
