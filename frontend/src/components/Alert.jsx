// src/components/Alert.jsx
import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function Alert({ type = "success", message, onClose }) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
        type === "error" ? "bg-red-50 text-red-800 border border-red-200" : "bg-green-50 text-green-800 border border-green-200"
      }`}
    >
      {type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">×</button>
    </div>
  );
}
