<template>
  <aside class="sidebar">
    <div class="sidebar__inner">
      <div class="sidebar__header">
        <span class="sidebar__logo">DivSkill</span>
      </div>
      <nav class="sidebar__nav">
        <router-link
          v-for="link in store.sidebarLinks"
          :key="link.label"
          :to="link.route"
          class="sidebar__link"
        >
          <span class="sidebar__icon">{{ link.icon }}</span>
          <span class="sidebar__label">{{ link.label }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()
</script>

<style src="./Sidebar.scss" scoped></style>
