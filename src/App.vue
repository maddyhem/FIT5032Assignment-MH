<script setup>
import MainPage from './views/MainPage.vue'
import AboutPage from './views/AboutPage.vue'
import SignupLoginPage from './views/SignupLoginPage.vue'
import EventsPage from './views/EventsPage.vue'
import Header from './components/Header.vue';

</script>

<template>
  <Header />
  <main>
    <!-- <MainPage /> -->
    <!-- <AboutPage /> -->
    <!-- <SignupLoginPage /> -->
    <!-- <EventsPage /> -->
     <router-view></router-view>

  </main>
</template>

<style scoped>

</style>
