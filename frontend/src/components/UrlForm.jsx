import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({queryKey: ['userUrls']});
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong."); // Set user-friendly error
    } finally {
      setUrl("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 mt-2">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-600"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Shorten URL
      </button>

      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Custom Slug{" "}
            <span className="text-xs text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="e.g. my-custom-link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800
                 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-200"
          />
        </div>
      )}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-200"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200
                ${
                  copied
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
