import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/admin/login";
import { ReactNode } from "react";
import { useAuth } from "./contexts/auth";
import HomePage from "./pages/home";
import Topbar from "./components/organisms/topbar";
import Products from "./pages/admin/products";
import Cookies from "js-cookie";
import base from "./api/base.api";
import CreateOrEditProductForm from "./components/forms/create-edit-product";

const ProtectedRoute = ({ children }: { children: JSX.Element | ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={"/"} />;

  return <>{children}</>;
};

type RouteType = { path: string; component: JSX.Element | ReactNode };
const openRoutes: RouteType[] = [
  {
    path: "/",
    component: <HomePage />,
  },
];
const protectedRoutes: RouteType[] = [
  { path: "/admin/products", component: <Products /> },
  {
    path: "/admin/product/:id?",
    component: <CreateOrEditProductForm />,
  },
];

export default function Router() {
  const { isAuthenticated } = useAuth();
  const token = Cookies.get("test-diogojpina-token");

  if (isAuthenticated && token) base.defaults.headers.Authorization = `Bearer ${token}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          {openRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<ProtectedRoute>{route.component}</ProtectedRoute>} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}
