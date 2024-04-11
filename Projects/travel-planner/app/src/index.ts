import "./style/reset.css";
import "./style/main.css";

import { router } from "@core/router";

import "@components/app";

const routes = [
  {
    path: "/",
    component: "my-app",
    children: [
      {
        path: "/",
        component: "auth-container",
        action: async () => {
          await import("@components/auth/authContainer");
        },
        children: [
          {
            path: "/",
            component: "trip-overview",
            action: async () => {
              await import("@components/trips/tripOverview");
            },
          },
          {
            path: "/users/edit",
            component: "user-edit",
            action: async () => {
              await import("@components/design/User/userEdit");
            },
          },
          {
            path: "trips/create",
            component: "trip-create",
            action: async () => {
              await import("@components/trips/tripCreate");
            },
          },
          {
            path: "trips/delete",
            component: "trip-delete",
            action: async () => {
              await import("@components/trips/tripDelete");
            },
          },
          {
            path: "/trips/:id",
            component: "trip-detail-container",
            action: async () => {
              await import("@components/trips/tripDetailContainer");
            },
            children: [
              {
                path: "/",
                component: "trip-detail",
                action: async () => {
                  await import("@components/trips/tripDetail");
                },
              },
              {
                path: "/edit",
                component: "trip-edit",
                action: async () => {
                  await import("@components/trips/tripEdit");
                },
              },
            ],
          },
          {
            path: "/notes/edit",
            component: "note-edit",
            action: async () => {
              await import("@components/design/Notes/noteEdit");
            },
          },
          {
            path: "notes/create",
            component: "note-create",
            action: async () => {
              await import("@components/design/Notes/noteCreate");
            },
          },
          {
            path: "notes/delete",
            component: "note-delete",
            action: async () => {
              await import("@components/design/Notes/noteDelete");
            },
          },
          {
            path: "/expenses/edit",
            component: "expense-edit",
            action: async () => {
              await import("@components/design/Expenses/expenseEdit");
            },
          },
          {
            path: "/expenses/create",
            component: "expense-create",
            action: async () => {
              await import("@components/design/Expenses/expenseCreate");
            },
          },
          {
            path: "expenses/delete",
            component: "expense-delete",
            action: async () => {
              await import("@components/design/Expenses/expenseDelete");
            },
          },
          {
            path: "/activities/edit",
            component: "activity-edit",
            action: async () => {
              await import("@components/design/Activities/activityEdit");
            },
          },
          {
            path: "/activities/create",
            component: "activity-create",
            action: async () => {
              await import("@components/design/Activities/activityCreate");
            },
          },
          {
            path: "activities/delete",
            component: "activity-delete",
            action: async () => {
              await import("@components/design/Activities/activityDelete");
            },
          },
        ],
      },
      {
        path: "login",
        component: "login-page",
        action: async () => {
          await import("@components/auth/login");
        },
      },
      {
        path: "register",
        component: "register-page",
        action: async () => {
          await import("@components/auth/register");
        },
      },
    ],
  },
];

router.setRoutes(routes);
