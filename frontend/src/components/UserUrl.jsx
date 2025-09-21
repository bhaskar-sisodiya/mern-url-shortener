import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api.js";

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-red-600 p-4">{error.message}</div>;
  if (!urls?.urls?.length)
    return (
      <div className="text-center p-6 text-gray-500">
        No URLs found. You haven't created any shortened URLs yet.
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Short URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.urls.slice().reverse().map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 truncate max-w-xs">{url.full_url}</td>
                <td className="px-6 py-4 truncate max-w-xs">
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 hover:underline"
                  >
                    {`${import.meta.env.VITE_BASE_URL}/${url.short_url}`}
                  </a>
                </td>
                <td className="px-6 py-4">{url.clicks}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleCopy(`${import.meta.env.VITE_BASE_URL}/${url.short_url}`, url._id)
                    }
                    className={`px-3 py-1 rounded-md text-white font-medium transition-colors duration-200 ${
                      copiedId === url._id
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {copiedId === url._id ? "Copied!" : "Copy"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {urls.urls
          .slice()
          .reverse()
          .map((url) => (
            <div
              key={url._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2"
            >
              <div>
                <span className="text-gray-500 text-sm">Original URL: </span>
                <div className="text-gray-900 text-sm truncate">{url.full_url}</div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Short URL: </span>
                <a
                  href={`${import.meta.env.VITE_BASE_URL}/${url.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900 text-sm truncate block"
                >
                  {`${import.meta.env.VITE_BASE_URL}/${url.short_url}`}
                </a>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Clicks: </span>
                <span className="font-medium">{url.clicks}</span>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleCopy(`${import.meta.env.VITE_BASE_URL}/${url.short_url}`, url._id)
                  }
                  className={`px-3 py-1 rounded-md text-white font-medium transition-colors duration-200 ${
                    copiedId === url._id
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {copiedId === url._id ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserUrl;
