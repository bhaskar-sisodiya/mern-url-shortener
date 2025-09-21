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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setUrl("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      {/* Error message */}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
          {error}
        </div>
      )}

      {/* URL input */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md 
            bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition duration-200"
        />
      </div>

      {/* Custom slug (if logged in) */}
      {isAuthenticated && (
        <div>
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
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="e.g. my-custom-link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
              bg-white text-gray-800 focus:outline-none focus:ring-2 
              focus:ring-blue-500 transition duration-200"
          />
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 
          px-4 rounded-md shadow-md transition transform hover:scale-[1.02]"
      >
        Shorten URL
      </button>

      {/* Shortened URL result */}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Your shortened URL:
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md 
                bg-gray-100 text-gray-700"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 font-medium
                ${
                  copied
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
