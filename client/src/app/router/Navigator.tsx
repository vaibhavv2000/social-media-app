import {lazy,Suspense} from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Loader from "../components/_common/Loader";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Main = lazy(() => import("../pages/Main"));
const ErrorBoundary = lazy(() => import("../utils/HOC/ErrorBoundary"));

const Navigator = (): JSX.Element => {
  const {isAuth} = useSelector((state: RootState) => state.user);

  const router = createBrowserRouter([
    {
      path: "/*",
      element: isAuth ? (
        <>
          <Main />
        </>
      ) : (
        <Navigate to={"/signin"} />
      ),
      ErrorBoundary: ErrorBoundary,
    },
    {
      path: "/register",
      element: !isAuth ? (
        <>
          <Register />
        </>
      ) : (
        <Navigate to={"/"} />
      ),
      ErrorBoundary: ErrorBoundary,
    },
    {
      path: "/signin",
      element: !isAuth ? (
        <>
          <Login />
        </>
      ) : (
        <Navigate to={"/"} />
      ),
      ErrorBoundary: ErrorBoundary,
    }
  ]);

  const loader = <div className="grid place-items-center h-screen w-full"> <Loader /> </div>;

  return (
    <Suspense fallback={loader}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Navigator;
