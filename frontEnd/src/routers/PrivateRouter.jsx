import Homepage from "../screens/home/homePage";


const routes = [
  {
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "404",
        element: <div>404</div>,
      },
    ],
  },
];

export default routes;