// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FileText, User, LogOut, Search, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import Alert from "./Alert";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function Dashboard() {
  const { user, token, logout, setUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // optional
  const [alert, setAlert] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: "", description: "", status: "pending" });
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ loadTasks(); }, []); // eslint-disable-line

  const loadTasks = async (search="")=>{
    try {
      const data = await api.getTasks(token, search);
      setTasks(data);
    } catch(err) { setAlert({ type: "error", message: err.message }); }
  };

  const handleSearch = (e)=>{
    const q = e.target.value;
    setSearchQuery(q);
    loadTasks(q);
  };

  const openNew = ()=> { setEditingTask(null); setTaskForm({ title: "", description: "", status: "pending" }); setShowTaskModal(true); };

  const handleSaveTask = async ()=>{
    if (!taskForm.title.trim()) { setAlert({ type: "error", message: "Title is required" }); return; }
    setLoading(true);
    try {
      if (editingTask) {
        await api.updateTask(token, editingTask.id, taskForm);
        setAlert({ type: "success", message: "Task updated successfully" });
      } else {
        await api.createTask(token, taskForm);
        setAlert({ type: "success", message: "Task created successfully" });
      }
      setShowTaskModal(false);
      setTaskForm({ title: "", description: "", status: "pending" });
      setEditingTask(null);
      loadTasks(searchQuery);
    } catch(err) {
      setAlert({ type: "error", message: err.message });
    } finally { setLoading(false); }
  };

  const handleEdit = (task) => { setEditingTask(task); setTaskForm({ ...task }); setShowTaskModal(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.deleteTask(token, id);
      setAlert({ type: "success", message: "Task deleted successfully" });
      loadTasks(searchQuery);
    } catch(err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const handleUpdateProfile = async ()=> {
    setLoading(true);
    try {
      const updated = await api.updateProfile(token, profileForm);
      setUser(updated);
      setShowProfileModal(false);
      setAlert({ type: "success", message: "Profile updated successfully" });
    } catch(err) { setAlert({ type: "error", message: err.message }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-white" /></div>
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => { setProfileForm({ name: user.name, email: user.email }); setShowProfileModal(true); }} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
              <span className="font-medium">{user?.name}</span>
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search tasks..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" /> <span>New Task</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(t => <TaskCard key={t.id} task={t} onEdit={handleEdit} onDelete={handleDelete} />)}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
          </div>
        )}
      </main>

      <TaskModal visible={showTaskModal} onClose={() => { setShowTaskModal(false); setEditingTask(null); }} onSave={handleSaveTask} form={taskForm} setForm={setTaskForm} loading={loading} />

      {/* profile modal is not implemented UI-wise here, you can reuse TaskModal pattern to edit profile */}
    </div>
  );
}
