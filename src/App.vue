<template>
  <q-layout>
    <q-page-container>
      <Header />
    </q-page-container>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from './pages/Header.vue';
</script>
