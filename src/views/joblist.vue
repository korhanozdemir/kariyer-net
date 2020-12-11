<template>
  <div class="home">
    <MainPage />
  </div>
</template>

<script>
// @ is an alias to /src
import MainPage from '@/components/main_page.vue'

export default {
  name: 'Joblist',
  components: {
    MainPage
  }
}
</script>
