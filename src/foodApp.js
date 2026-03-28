import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error.js";
import Menu from "./components/Menu.js";
import Cart from "./components/Cart.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import ErrorBoundary from "./components/ErrorBoundary.js";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
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
        path: "/cart",
        element: <ProtectedRoute> <Cart /> </ProtectedRoute>,
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
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={appRouter} />
    </ErrorBoundary>
  </React.StrictMode>
);
