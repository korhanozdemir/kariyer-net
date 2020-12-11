import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const getDefaultState = () => {
  return {
    job_list: [],
    filtered_job_list: [],
    cities: [],
    detailed_jobs: [],
    chosen_job: {}
  };
};
// initial state
const state = getDefaultState();
const actions = {
  async getJobs({ commit }) {
    await axios
      .get("https://run.mocky.io/v3/9c30d17b-3678-4b23-b386-c5507605e7dd")
      .then(res => {
        if (res) {
          commit("setJobs", res);
        }
      })
      .catch(err => {
        console.log("Can't connect to the database, please try again.");
        console.log(err);
      });
    await axios
      .get("https://run.mocky.io/v3/e6311860-6d69-4808-8d0b-127d668193ed")
      .then(res => {
        if (res) {
          commit("setDetailedJobs", res);
        }
      })
      .catch(err => {
        console.log("Can't connect to the database, please try again.");
        console.log(err);
      });
  },
  filterJobs({ commit }, data) {
    commit("setFilteredJobs", data);
  },
  chooseJob({ commit }, data) {
    commit("setChosenJob", data);
  }
};
const mutations = {
  setJobs(state, data) {
    state.cities = [...new Set(data.data.map(city => city.cityName).sort())];
    state.job_list = data.data;
  },
  setDetailedJobs(state, data) {
    state.detailed_jobs = data.data;
  },
  setFilteredJobs(state, data) {
    state.filtered_job_list = state.job_list.filter(
      job => job.cityName === data
    );
  },
  setChosenJob(state, data) {
    state.chosen_job = state.detailed_jobs.filter(job => job.jobId === data)[0];
  }
};
const getters = {
  getJobList: state => {
    return state.filtered_job_list;
  },
  getJobLocations: state => {
    return state.cities;
  }
};
export default new Vuex.Store({
  modules: {},
  state,
  getters,
  actions,
  mutations
});
