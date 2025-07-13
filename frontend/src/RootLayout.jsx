// RootLayout.jsx


import React, { useEffect } from "react";
import { Outlet, useRouter } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "./store/slice/authSlice.js";
import { logoutUser, getCurrentUser } from "./api/user.api.js";
import { useQueryClient } from "@tanstack/react-query";


const RootLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fetch user info on mount to sync Redux with backend session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data && data.user) {
          dispatch(login(data.user));
        }
      } catch (err) {
        dispatch(logout());
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // ignore error, still clear state
    }
    dispatch(logout());
    queryClient.removeQueries(["userUrls"]);
    router.navigate({ to: "/auth" });
  };


  // No username in Navbar
  return (
    <>
      <Navbar
        isLoggedIn={isAuthenticated}
        onLogout={handleLogout}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
