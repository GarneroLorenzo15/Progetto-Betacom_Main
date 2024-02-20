import { API_URL } from "../../api.config";
import axios from "axios";

export default {
  fetchEvents() {
    return axios.get(`${API_URL}/api/eventi`);
  },
  fetchUsers() {
    return axios.get(`${API_URL}/api/utenti`);
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
  Login(email, password) {
    return axios.post(`${API_URL}/api/login`, { email, password });
  },
};
