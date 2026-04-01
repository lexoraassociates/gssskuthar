import React from "react";

const FileUpload = ({ label, name, onChange, error, file }) => {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">{label}</label>

      {/* Hidden Input */}
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        className="hidden"
      />

      {/* Button */}
      <label
        htmlFor={name}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
      >
        📁 Choose File
      </label>

      {/* File Name */}
      {file && <p className="text-sm text-green-600 mt-1">✅ {file.name}</p>}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileUpload;
