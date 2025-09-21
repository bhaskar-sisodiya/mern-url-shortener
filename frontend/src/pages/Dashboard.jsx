import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const Dashboard = () => {
  return (
    <div
      className="bg-gray-100 flex flex-col items-center justify-center p-4"
      style={{ minHeight: "calc(100vh - 64px)" }} // adjust 64px if your navbar height is different
    >
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* UrlForm */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-auto">
          <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
          <UrlForm />
        </div>

        {/* UserUrl */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-auto max-h-[70vh]">
          <UserUrl />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
