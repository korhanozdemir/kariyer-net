<template>
  <div class="about">
    <jobdetail />
  </div>
</template>

<script>
// @ is an alias to /src
import jobdetail from "@/components/job_detail.vue";

export default {
  name: "Jobdetail",
  components: {
    jobdetail
  }
};
</script>
