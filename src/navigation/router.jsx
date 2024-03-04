import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Discover,
  Browse,
  Genre,
  Artist,
  Playlist,
  Search,
  MyPlaylists,
  MyPlaylist,
  Profile,
  Error,
} from "@/pages/root";

import { Register, Login } from "@/pages/auth";
import { RootLayout, AuthLayout } from "@/pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/discover" replace /> },
          {
            path: "/discover",
            element: <Discover />,
          },
          {
            path: "/browse",
            element: <Browse />,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/my-playlist",
            element: <MyPlaylists />,
          },
          {
            path: "/my-playlist/:id",
            element: <MyPlaylist />,
          },
          {
            path: "/genre/:id",
            element: <Genre />,
          },
          {
            path: "/artist/:id",
            element: <Artist />,
          },
          {
            path: "/:section/:id",
            element: <Playlist />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
