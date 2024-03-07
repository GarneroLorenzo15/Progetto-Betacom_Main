import { API_URL } from "../../api.config";
import axios from "axios";
/* eslint-disable */
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token;
    return config;
});

export default {
  fetchEvents() {
    return axios.get(`${API_URL}/api/eventi`);
  },
  fetchUsers() {
    return axios.get(`${API_URL}/api/utenti`);
  },
  fetchUserDetails(id) {
    return axios.get(`${API_URL}/api/utenti/${id}`);
  },
  updateUser(id, data) {
    return axios.put(`${API_URL}/api/utenti/update/${id}`, data);
  },
  fetchProposals() {
    return axios.get(`${API_URL}/api/proposte`);
  },
  fetchEventDetails(id) {
    return axios.get(`${API_URL}/api/eventi/${id}`);
  },
  addEvents(newEvent) {
    return axios.post(`${API_URL}/api/eventi/add`, newEvent);
  },
  deleteEvent(id) {
    return axios.delete(`${API_URL}/api/eventi/delete/${id}`);
  },
  Login(Credenziali) {
    return axios.post(`${API_URL}/api/login`, Credenziali);
  },
  addUtenti(newUtente) {
    return axios.post(`${API_URL}/api/utenti/add`, newUtente);
  },
  deleteUtenti(id) {
    return axios.delete(`${API_URL}/api/utenti/delete/${id}`);
  },
  fetchDate(){
    return axios.get(`${API_URL}/api/date`);
  },
  addDate(SelectedDate) {
    return axios.post(`${API_URL}/api/date/add`, SelectedDate);
  }
};
