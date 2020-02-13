const APIURL = "http://localhost:3000";
const axios = require("axios");export const requestsMixin = {
  methods: {
    getDistances() {
      return axios.get(`${APIURL}/distances`);
    },    addDistance(data) {
      return axios.post(`${APIURL}/distances`, data);
    },    editDistance(data) {
      return axios.put(`${APIURL}/distances/${data.id}`, data);
    },    deleteDistance(id) {
      return axios.delete(`${APIURL}/distances/${id}`);
    }
  }
};