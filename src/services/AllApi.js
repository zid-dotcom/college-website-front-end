import baseurl from "./BaseURl";


// src/services/AllApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: baseurl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT from localStorage automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('raynott_token'); // same key used by frontend
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

/* ----------------- Auth ----------------- */
/**
 * Login - calls backend route: POST /login
 * Expects: { email, password }
 * On success: stores token & user in localStorage
 */
export const loginApi = async (payload) => {
  const res = await api.post('/login', payload);
  // Adjust depending on backend response shape:
  // if backend returns { token, user } this will work.
  const data = res.data;
  if (data.token) {
    localStorage.setItem('raynott_token', data.token);
  }
  if (data.user) {
    localStorage.setItem('raynott_user', JSON.stringify(data.user));
  }
  return data;
};

/**
 * Register - calls backend route: POST /reg
 * Expects: { name, email, password }
 * On success: optionally store token
 */
export const registerApi = async (payload) => {
  const res = await api.post('/reg', payload);
  const data = res.data;
  if (data.token) {
    localStorage.setItem('raynott_token', data.token);
  }
  if (data.user) {
    localStorage.setItem('raynott_user', JSON.stringify(data.user));
  }
  return data;
};

export const logoutLocal = () => {
  localStorage.removeItem('raynott_token');
  localStorage.removeItem('raynott_user');
};

/* ----------------- Events ----------------- */
/**
 * POST /addevent (protected)
 * GET  /getevent  (protected) -> all events
 * GET  /getevent/:id
 * DELETE /deleteevent/:id
 * PUT /editevent/:id
 */
export const addEvent = async (payload) => {
  const res = await api.post('/addevent', payload);
  return res.data;
};
export const getAllEvents = async () => {
  const res = await api.get('/getevent');
  return res.data;
};
export const getEventById = async (id) => {
  const res = await api.get(`/getevent/${id}`);
  return res.data;
};
export const deleteEvent = async (id) => {
  const res = await api.delete(`/deleteevent/${id}`);
  return res.data;
};
export const editEvent = async (id, payload) => {
  const res = await api.put(`/editevent/${id}`, payload);
  return res.data;
};

/* ----------------- Faculty ----------------- */
/**
 * POST /addfaculty
 * GET  /getfaculty
 * GET  /getfaculty/:id
 * DELETE /deletefaculty/:id
 * PUT /editfaculty/:id
 */
export const addFaculty = async (payload) => {
  const res = await api.post('/addfaculty', payload);
  return res.data;
};
export const getAllFaculty = async () => {
  const res = await api.get('/getfaculty');
  return res.data;
};
export const getFacultyById = async (id) => {
  const res = await api.get(`/getfaculty/${id}`);
  return res.data;
};
export const deleteFaculty = async (id) => {
  const res = await api.delete(`/deletefaculty/${id}`);
  return res.data;
};
export const editFaculty = async (id, payload) => {
  const res = await api.put(`/editfaculty/${id}`, payload);
  return res.data;
};

/* ----------------- Courses ----------------- */
/**
 * POST /addcourse
 * GET  /getcourse
 * GET  /getcourse/:id
 * DELETE /deletecourse/:id
 * PUT /editcourse/:id
 */
export const addCourse = async (payload) => {
  const res = await api.post('/addcourse', payload);
  return res.data;
};
export const getAllCourses = async () => {
  const res = await api.get('/getcourse');
  return res.data;
};
export const getCourseById = async (id) => {
  const res = await api.get(`/getcourse/${id}`);
  return res.data;
};
export const deleteCourse = async (id) => {
  const res = await api.delete(`/deletecourse/${id}`);
  return res.data;
};
export const editCourse = async (id, payload) => {
  const res = await api.put(`/editcourse/${id}`, payload);
  return res.data;
};

/* ----------------- File upload (optional) ----------------- */
/**
 * If your backend has a file-upload endpoint (multipart),
 * adjust the path below. Not required if backend doesn't provide one.
 */
export const uploadFile = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export default api;
