import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import PrivateRoute from "./PrivateRoute";
import PrivateRoutesForLogin from "./PrivateRoutesForLogin";
// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: (<PrivateRoutesForLogin> <MainLayout/></PrivateRoutesForLogin>),
      children: [
        {  path:"login",element: <LoginPage/> },
        {  path:"signup",element: <RegisterPage/> },
        {  path:"verify-email",element: <VerifyEmailPage/> },
        {  path:"reset-password",element: <ResetPasswordPage/> },
        {  path:"new-password",element: <NewPasswordPage/> },
       
      ]
    },


    {
      path: "/",
      element: <HomePage/>,
    },

    {
      path: "/user",
      element:( 
     <PrivateRoute> <DashboardLayout /></PrivateRoute>),
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },

        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <Profile /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const HomePage=Loadable(
  lazy(()=>import("../pages/dashboard/HomePage")),
);

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const VerifyEmailPage=Loadable(
  lazy(()=> import("../pages/auth/VerifyEmail"))
);
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Profile"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
