// src/components/TaskCard.jsx
import React from "react";
import { Edit2, Trash2, FileText } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          task.status === 'completed' ? 'bg-green-100 text-green-800' :
          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>{task.status.replace('_', ' ')}</span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>
      <div className="flex gap-2">
        <button onClick={() => onEdit(task)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
          <Edit2 className="w-4 h-4" /> <span>Edit</span>
        </button>
        <button onClick={() => onDelete(task.id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
          <Trash2 className="w-4 h-4" /> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
