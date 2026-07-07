<template>
  <div class="app-shell">
    <div class="app-shell__inner">
      <Sidebar />
      <div class="app-shell__main">
        <NavBar />
        <main class="app-shell__content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import NavBar from './NavBar.vue'
</script>

<style src="./AppShell.scss" scoped></style>
