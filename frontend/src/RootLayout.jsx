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

  // Sync Redux with backend session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.user) {
          dispatch(login(data.user));
        }
      } catch (err) {
        dispatch(logout());
      }
    };
    fetchUser();
  }, [dispatch]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // ignore error
    }
    dispatch(logout());
    queryClient.removeQueries(["userUrls"]);
    router.navigate({ to: "/auth" });
  };

  return (
    <>
      <Navbar
        isLoggedIn={isAuthenticated}
        // userName={user?.name || "User"} pass updated username from Redux
        onLogout={handleLogout}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
