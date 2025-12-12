// src/api.js
const API_BASE_URL = "http://localhost:8000/api";

async function handleRes(res, fallbackMsg) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || fallbackMsg);
  }
  return res.json();
}

export const api = {
  register: (userData) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((r) => handleRes(r, "Registration failed")),

  login: (credentials) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((r) => handleRes(r, "Login failed")),

  getProfile: (token) =>
    fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => handleRes(r, "Failed to fetch profile")),

  updateProfile: (token, data) =>
    fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => handleRes(r, "Failed to update profile")),

  getTasks: (token, search = "") => {
    const url = search ? `${API_BASE_URL}/tasks?search=${encodeURIComponent(search)}` : `${API_BASE_URL}/tasks`;
    return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((r) => handleRes(r, "Failed to fetch tasks"));
  },

  createTask: (token, task) =>
    fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((r) => handleRes(r, "Failed to create task")),

  updateTask: (token, id, task) =>
    fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((r) => handleRes(r, "Failed to update task")),

  deleteTask: (token, id) =>
    fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => handleRes(r, "Failed to delete task")),
};
