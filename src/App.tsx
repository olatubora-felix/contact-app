import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ContactDetail from "./pages/ContactDetail";
import Root from "./pages/Root";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: ":id",
          element: <ContactDetail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
