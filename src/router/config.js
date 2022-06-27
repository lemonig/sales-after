import * as React from "react";
const Login = React.lazy(() => import("../pages/login"));
const BodyLayout = React.lazy(() => import("../containers/layout-body"));
const Home = React.lazy(() => import("../pages/home"));
const Work = React.lazy(() => import("../pages/work")); //工单
const Contacts = React.lazy(() => import("../pages/contacts")); //我的联系人
const ContactEdit = React.lazy(() =>
  import("../pages/contacts/components/Edit")
); //编辑联系人
const MyWork = React.lazy(() => import("../pages/my-work")); //我的工单
const Complain = React.lazy(() => import("../pages/complain")); //投诉建议
const Map = React.lazy(() => import("../pages/map")); //投诉建议

const Progress = React.lazy(() => import("../pages/progress")); //进度
const Evalute = React.lazy(() => import("../pages/evalute"));
/**
 * index: true 默认主路由不需要path
 * **/
const config = [
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Login />,
      </React.Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <React.Suspense fallback={<>...</>}>
        <BodyLayout />
      </React.Suspense>
    ),
    children: [
      {
        element: (
          <React.Suspense fallback={<>...</>}>
            <Home />,
          </React.Suspense>
        ),
        index: true,
      },
      {
        path: "work",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Work />,
          </React.Suspense>
        ),
      },
      {
        path: "contacts/*",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Contacts />,
          </React.Suspense>
        ),
      },
      {
        path: "contactEdit",
        element: <ContactEdit />,
        // (
        //   <React.Suspense fallback={<>...</>}>
        //     <ContactEdit />,
        //   </React.Suspense>
        // ),
      },

      {
        path: "mywork",
        element: (
          <React.Suspense fallback={<>...</>}>
            <MyWork />,
          </React.Suspense>
        ),
      },
      {
        path: "complain",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Complain />,
          </React.Suspense>
        ),
      },
      {
        path: "map",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Map />,
          </React.Suspense>
        ),
      },
      {
        path: "progress",
        element: <Progress />,
      },
      {
        path: "evalute",
        element: <Evalute />,
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
];
export default config;
