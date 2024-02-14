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
};
