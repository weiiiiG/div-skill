<template>
  <div class="app__outer">
    <div class="app__inner">
      <NavBar class="app__nav" />
      <div class="app__body">
        <Sidebar class="app__sidebar" />
        <main class="app__main">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/layout/NavBar/NavBar.vue'
import Sidebar from '@/layout/Sidebar/Sidebar.vue'
</script>

<style src="./App.scss" />
