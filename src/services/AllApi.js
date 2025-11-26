



// src/services/AllApi.js
import baseurl from "./BaseURl";
import axios from "axios";

console.log("AllApi: API base =", baseurl); // will appear in browser console (helps debugging on laptop/mobile remote debug)

const api = axios.create({
  baseURL: baseurl,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT from localStorage automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("raynott_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// Response interceptor: save recent API errors to localStorage (so you can inspect them later on phone)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    try {
      const prev = JSON.parse(localStorage.getItem("raynott_api_errors") || "[]");
      prev.unshift({
        time: new Date().toISOString(),
        url: err.config?.url ?? "unknown",
        method: err.config?.method ?? "unknown",
        status: err.response?.status ?? "no-response",
        data: err.response?.data ?? err.message,
      });
      localStorage.setItem("raynott_api_errors", JSON.stringify(prev.slice(0, 20)));
    } catch (e) {
      // ignore
    }
    return Promise.reject(err);
  }
);

/* ----------------- Auth ----------------- */
export const loginApi = async (payload) => {
  const res = await api.post("/login", payload);
  const data = res.data;
  if (data.token) {
    localStorage.setItem("raynott_token", data.token);
  }
  if (data.user) {
    localStorage.setItem("raynott_user", JSON.stringify(data.user));
  }
  return data;
};

export const registerApi = async (payload) => {
  const res = await api.post("/reg", payload);
  const data = res.data;
  if (data.token) localStorage.setItem("raynott_token", data.token);
  if (data.user) localStorage.setItem("raynott_user", JSON.stringify(data.user));
  return data;
};

export const logoutLocal = () => {
  localStorage.removeItem("raynott_token");
  localStorage.removeItem("raynott_user");
};

/* Events */
export const addEvent = async (payload) => (await api.post("/addevent", payload)).data;
export const getAllEvents = async () => (await api.get("/getevent")).data;
export const getEventById = async (id) => (await api.get(`/getevent/${id}`)).data;
export const deleteEvent = async (id) => (await api.delete(`/deleteevent/${id}`)).data;
export const editEvent = async (id, payload) => (await api.put(`/editevent/${id}`, payload)).data;

/* Faculty */
export const addFaculty = async (payload) => (await api.post("/addfaculty", payload)).data;
export const getAllFaculty = async () => (await api.get("/getfaculty")).data;
export const getFacultyById = async (id) => (await api.get(`/getfaculty/${id}`)).data;
export const deleteFaculty = async (id) => (await api.delete(`/deletefaculty/${id}`)).data;
export const editFaculty = async (id, payload) => (await api.put(`/editfaculty/${id}`, payload)).data;

/* Courses */
export const addCourse = async (payload) => (await api.post("/addcourse", payload)).data;
export const getAllCourses = async () => (await api.get("/getcourse")).data;
export const getCourseById = async (id) => (await api.get(`/getcourse/${id}`)).data;
export const deleteCourse = async (id) => (await api.delete(`/deletecourse/${id}`)).data;
export const editCourse = async (id, payload) => (await api.put(`/editcourse/${id}`, payload)).data;

/* File upload */
export const uploadFile = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export default api;
