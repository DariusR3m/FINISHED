import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Agents from "./pages/agents/Agents";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import Notes from "./pages/notes/Notes";
import Settings from "./pages/settings/Settings";
import Report from "./pages/report/Report";
import Rules from './pages/rules/Rules';
import Anomalies from './pages/anomalies/Anomalies';
import Bot from './pages/bot/Bot';
import Alerts from './pages/alerts/Alerts';
import "./styles/global.scss";
import User from "./pages/user/User";
import Agent from "./pages/agent/Agent";
import Alert from './pages/alert/Alert';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/agents",
          element: <Agents />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/agents/:id",
          element: <Agent />,
        },
        {
          path: "/notes",
          element: <Notes />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/report",
          element: <Report />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
        {
          path: "/anomalies",
          element: <Anomalies />,
        },
        {
          path: "/bot",
          element: <Bot />,
        },
        {
          path: "/alerts",
          element: <Alerts />,
        },
        {
          path: "/alerts/:id",
          element: <Alert />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

