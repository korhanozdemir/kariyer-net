<template>
  <div class="main">
    <div class="container">
      <button class="back-button button" @click="goBack()">
        <img class="back-icon" src="/icons/back-icon.svg" alt="" />
        <img class="logo" src="/kariyernet-logo.png" alt="" />
      </button>
      <div class="detail">
        <div class="detail-container">
          <div class="detail-job-info" v-if="chosenJob.contactPhone">
            <div class="header">
              <h2 class="position-name">{{ chosenJob.positionName }}</h2>
              <p class="company-name-header">{{ chosenJob.companyName }}</p>
            </div>
            <p class="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              vitae laoreet quam, eget ullamcorper purus. Vestibulum eget varius
              ligula. Donec elementum egestas quam.
            </p>
            <button class="apply-button button">Apply Now</button>
          </div>
          <div class="detail-company-info" v-if="chosenJob.contactPhone">
            <div class="company-logo">
              <img :src="chosenJob.imageUrl" alt="" />
            </div>
            <div class="company-details">
              <h4 class="company-name">{{ chosenJob.companyName }}</h4>
              <div class="company-subtitle">
                <p class="address">
                  {{ chosenJob.townName }}, {{ chosenJob.cityName }}
                </p>
                <p class="phone">
                  {{ chosenJob.contactPhone.countryCallingCode }} ({{
                    chosenJob.contactPhone.areaCode
                  }}) {{ chosenJob.contactPhone.number }}
                </p>
              </div>
            </div>
            <img class="map" src="/maps-example.jpg" alt="" />
            <button class="contact-button button">Contact</button>
          </div>
        </div>
        <div class="mobile-desc-map" v-if="chosenJob.contactPhone">
          <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae
            laoreet quam, eget ullamcorper purus. Vestibulum eget varius ligula.
            Donec elementum egestas quam.
          </p>
          <img class="map" src="/maps-example.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="mobile-footer" v-if="chosenJob.contactPhone">
      <button class="apply-button button">Apply Now</button>
      <button class="contact-button button">Contact</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "jobdetail",
  created() {
    this.getJobsIfNotExists().then(() => {
      this.chooseJob(this.$route.params.id);
    });
  },
  methods: {
    ...mapActions({
      getJobs: "getJobs",
      chooseJob: "chooseJob"
    }),
    async getJobsIfNotExists() {
      if (this.job_list.length === 0) {
        await this.getJobs();
      }
    },
    goBack() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapGetters({
      job_list: "getJobList",
      chosenJob: "getChosenJob"
    })
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: conic-gradient(
      from -90deg at 58.19% 50%,
      rgba(165, 191, 225, 0.460271) -154.21deg,
      rgba(255, 255, 255, 0) 14.59deg,
      rgba(167, 192, 225, 0.452839) 63.75deg,
      rgba(61, 120, 200, 0.91) 115.53deg,
      rgba(165, 191, 225, 0.460271) 205.79deg,
      rgba(255, 255, 255, 0) 374.59deg
    ),
    #810090;
  padding: 4em;
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  margin: auto;
  max-width: 1100px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.back-button {
  display: flex;
  gap: 1em;
  margin-bottom: 2em;
  width: fit-content;
  .back-icon {
    width: 45px;
  }
  .logo {
    width: 219px;
  }
}
.button {
  outline: none;
  background: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
}
.button:hover,
.button:focus {
  transform: scale(1.03);
}
.apply-button {
  background-color: #810090;
  color: white;
  padding: 0.35em 1em;
  font-size: 23px;
}
.contact-button {
  color: #810090;
  border: 4px solid #810090;
  padding: 0.2em;
  font-size: 23px;
  font-weight: 500;
  margin-top: auto;
}
.detail {
  background-color: white;
  border-radius: 10px;
  padding: 3em;
  display: flex;
  flex-direction: column;
  max-height: 765px;
  flex-grow: 1;
  .detail-container {
    display: flex;
  }
  .detail-job-info {
    max-width: 60%;
    margin-right: 1em;
    .header {
      margin-bottom: 3em;
    }
    .position-name {
      font-weight: 500;
      font-size: clamp(26px, 4vw, 41px);
      line-height: 1;
    }
    .company-name-header {
      color: #868686;
      font-size: clamp(18px, 3vw, 26px);
    }
    .description {
      max-width: 45ch;
      margin-bottom: 4em;
      color: #555555;
      font-size: 21px;
    }
  }

  .detail-company-info {
    margin-left: auto;
    box-shadow: 0 0 5px 2px #f0f0f0;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    max-height: 600px;

    width: 20em;
    .company-logo {
      max-width: 100%;
      border: 1px solid #e6e6e6;
      padding: 1em;
      img {
        margin: auto;
      }
    }
    .company-name {
      font-size: 24px;
    }
    .company-subtitle {
      display: flex;
    }
    .address {
      color: #868686;
      font-size: 13px;
      margin-right: 10px;
    }
    .phone {
      font-weight: 300;
      font-size: 13px;
      color: #868686;
    }
    .map {
      max-width: 100%;
      border-radius: 9px;
    }
  }
}
.mobile-footer {
  gap: 1em;
  background-color: white;
  position: sticky;
  bottom: 0;
  padding: 1em;
  border-top: 1px solid #cacaca;
  display: none;
}
.mobile-desc-map {
  color: #555555;
  font-size: 18px;
  display: none;
  .description {
    margin-bottom: 2.5em;
    margin-top: 3em;
  }
  .map {
    border-radius: 9px;
  }
}
@media (max-width: 700px) {
  .main {
    padding: 2.5em 0 0;
  }
  .back-button {
    zoom: 0.8;
    margin-left: 1.5em;
  }
  .mobile-footer {
    display: grid;
  }
  .mobile-desc-map {
    display: block;
  }
  .detail {
    border-radius: 0;
    padding: 2em 1.5em;
    .button {
      display: none;
    }
    .detail-job-info {
      .description {
        display: none;
      }
    }
    .detail-company-info {
      box-shadow: none;
      padding: 0;
      max-width: 50%;
      .map,
      .company-name {
        display: none;
      }
      .company-subtitle {
        flex-direction: column;
      }
    }
  }
}
</style>
