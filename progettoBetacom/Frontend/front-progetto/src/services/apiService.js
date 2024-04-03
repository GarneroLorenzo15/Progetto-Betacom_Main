import { API_URL } from "../../api.config";
import axios from "axios";
import router from "@/router";
/* eslint-disable */
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token;
    return config;
}),
  


axios.interceptors.response.use(function (response) {
  return response;
  }, error => {
    if(error.response.status === 401) {
      logout()
    }
    return Promise.reject(error);
  });


function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

export default {
  fetchEvents() {
    return axios.get(`${API_URL}/api/eventi`); //tested
  },
  fetchUsers() {
    return axios.get(`${API_URL}/api/utenti`); //tested
  },
  fetchUserDetails(id) {
    return axios.get(`${API_URL}/api/utenti/${id}`); //tested
  },
  updateUser(id, data) {
    return axios.put(`${API_URL}/api/utenti/update/${id}`, data); //tested
  },
  fetchProposals() {
    return axios.get(`${API_URL}/api/proposte`);
  },
  fetchEventDetails(id) { 
    return axios.get(`${API_URL}/api/eventi/${id}`); //tested
  },
  addEvents(newEvent) {
    return axios.post(`${API_URL}/api/eventi/add`, newEvent); //tested
  },
  deleteEvent(id) {
    return axios.delete(`${API_URL}/api/eventi/delete/${id}`); //tested
  },
  Login(Credenziali) {
    return axios.post(`${API_URL}/api/login`, Credenziali); //tested
  },
  addUtenti(newUtente) {
    return axios.post(`${API_URL}/api/utenti/add`, newUtente); //tested
  },
  deleteUtenti(id) {
    return axios.delete(`${API_URL}/api/utenti/delete/${id}`); //tested
  },
  fetchDate(){
    return axios.get(`${API_URL}/api/date`);
  },
  fetchDateId(id){
    return axios.get(`${API_URL}/api/date/${id}`);
  },
  addDate(nuovaDataInserita) {
    return axios.post(`${API_URL}/api/date/add`, nuovaDataInserita);
  },
  fetchMaxVotedDate(){
    return axios.get(`${API_URL}/api/date/deciding`);
  },
  addVoti(infoVoti){
    return axios.post(`${API_URL}/api/voti/add`, infoVoti);
  },
  fetchVoti(){
    return axios.get(`${API_URL}/api/voti`);
  },
  countVoti(){
    return axios.get(`${API_URL}/api/voti/count`);
  },
  deleteVoti(){
    return axios.delete(`${API_URL}/api/voti/delete`);
  },
  logout
};
