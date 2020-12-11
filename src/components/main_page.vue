<template>
  <div class="container">
    <div class="search-container">
      <div class="search_area">
        <div>
          <label for="location">Location</label>
          <v-select id="location" v-model="location" :options="job_locations" />
        </div>

        <div v-if="location">
          <label for="keyword">Search</label>
          <input
            type="text"
            placeholder="Position, company"
            id="keyword"
            v-model="keyword"
          />
        </div>
      </div>
    </div>
    <div class="job-list-container">
      <ul class="job-list ">
        <li
          class="job"
          v-for="job in keyword_filtered_jobs"
          :key="job.jobId"
          @click="selectJob(job.jobId)"
        >
          <div class="job-top">
            <div>
              <h1 class="position-name">{{ job.positionName }}</h1>

              <p class="company-name">{{ job.companyName }} LTD</p>
            </div>

            <img class="company-logo" :src="job.imageUrl" alt="" />
          </div>
          <div class="job-bottom">
            <p class="address">{{ job.townName }}, {{ job.cityName }}</p>
            <div class="duration">
              <img src="/duration-icon.svg" alt="" />
              <p>{{ job.durationDay }} days</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainPage",
  props: {},
  data() {
    return {
      loading: 0,
      keyword: "",
      location: "",
      keyword_filtered_jobs: []
    };
  },
  mounted() {
    this.getJobs();
  },
  computed: {
    ...mapGetters({
      job_list: "getJobList",
      job_locations: "getJobLocations"
    })
  },
  methods: {
    ...mapActions({
      getJobs: "getJobs",
      filterJobs: "filterJobs",
      chooseJob: "chooseJob"
    }),
    selectJob(jobId) {
      this.chooseJob(jobId);
      this.$router.push({ name: "jobDetail", params: { id: jobId } });
    }
  },
  watch: {
    location: function() {
      //debugger; // eslint-disable-line no-debugger
      this.keyword = "";
      this.filterJobs(this.location);
      this.keyword_filtered_jobs = this.job_list;
    },
    keyword: function() {
      const self = this;
      this.keyword_filtered_jobs = this.job_list.filter(
        job =>
          job.positionName.toLowerCase().includes(self.keyword.toLowerCase()) ||
          job.companyName.toLowerCase().includes(self.keyword.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  position: sticky;
  top: 0;
  padding: 1.5em 1em;
  background-color: #810090;

  color: white;
  margin-bottom: 2em;
}
.search_area {
  display: grid;
  gap: 1em;
  max-width: 1268px;
  margin: 0 auto;
  @media (min-width: 700px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
  }
  label {
    display: block;
    margin-bottom: 0.4em;
    font-size: 18px;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px;
    border: none;
  }
}
.job-list {
  display: grid;
  gap: 1em;
  max-width: 1300px;

  @media (min-width: 700px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
  }
  padding: 1em;
  margin: 0 auto;
  .job {
    transition: background-color 150ms linear;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    border: 1px solid #9c9c9c;
    padding: 1em;
    display: flex;
    flex-direction: column;

    .job-bottom {
      display: flex;
      margin-top: auto;
      .address {
        color: #464646;
        font-size: clamp(12px, 3vw, 14.5px);
      }
      .duration {
        display: flex;
        justify-content: center;
        color: #9c9c9c;
        width: 80px;
        align-items: center;
        margin-left: auto;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 7px;
        }
        p {
          font-size: 13px;
        }
      }
    }
    .job-top {
      display: flex;
      margin-bottom: 1.5em;
      .position-name {
        font-size: clamp(20px, 6vw, 26px);
        font-weight: 500;
        line-height: 1.1;
        max-width: 50vw;
      }
      .company-name {
        font-size: clamp(11px, 2vw, 12px);
        font-weight: 300;
        margin-top: 0.5em;
      }
      .company-logo {
        width: 8em;
        margin-left: auto;
        @media (max-width: 350px) {
          display: none;
        }
      }
    }
  }
}
.job:hover,
.job:focus {
  background-color: #f8f8f8;
}
</style>
<style>
#location .vs__search::placeholder,
#location .vs__dropdown-toggle,
#location .vs__dropdown-menu {
  background: #fff;
  border: none;
  color: #000;
  border-radius: 0;
  padding: 6px;
}

#location .vs__clear,
#location .vs__open-indicator {
  fill: #394066;
}
</style>
