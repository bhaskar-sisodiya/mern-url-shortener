import { redirect } from "@tanstack/react-router";
import { login } from "../store/slice/authSlice";
import { getCurrentUser } from "../api/user.api.js";

export const checkAuth = async ({ context }) => {
  try {
    const {queryClient, store} = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    if (!user) return false;

    store.dispatch(login(user));
    const {isAuthenticated} = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (error) {
    // Redirect to login if unauthorized
    console.log(error);
    return redirect({to: '/auth'});
  }
};

export const checkUnauth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (user) {
      store.dispatch(login(user));
      const { isAuthenticated } = store.getState().auth;

      // If user is already authenticated, redirect to dashboard
      if (isAuthenticated) {
        return redirect({ to: "/dashboard" });
      }
    }

    // If no user is found, allow access to /auth
    return true;
  } catch (error) {
    // Even on error, allow access to /auth so user can log in
    if (!(error && error.status === 401)) {
      console.log("Unauth check error:", error);
    }
    return true;
  }
};
