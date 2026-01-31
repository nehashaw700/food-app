import react, { lazy, Suspense } from "../node_modules/react";
import ReactDOM from "../node_modules/react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About.js";
import Error from "./components/Error.js";
import Menu from "./components/Menu.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore.js";

// called dynamic import
const About = lazy(() => import("./components/About.js"));

const AppLayout = () => {
  const [userName, setUserName] = useState("Default");

  useEffect(() => {
    // this can come from some API
    const name = "Saloni";
    setUserName(name);
  }, []);

  return (
    <div className="app">
      <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
      </Provider>
    </div>
  );

};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <ProtectedRoute> <Body /> </ProtectedRoute>,
      },
      {
        path: "/about",
        element: <Suspense fallback={<h1>Loading!!!</h1>}> <About /> </Suspense>,
      },
      {
        // this is dynamic routes
        path: "/restaurants/:resId",
        element: <Menu />,
      },
    ],

  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// instead of this, using Router provider and providing config appRouter
// root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
