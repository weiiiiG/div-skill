<template>
  <div class="sidebar__outer">
    <div class="sidebar__inner">
      <nav class="sidebar__nav">
        <a
          v-for="item in navItems"
          :key="item.label"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': item.active }"
          href="#"
        >
          <span class="sidebar__icon">{{ item.icon }}</span>
          <span class="sidebar__label">{{ item.label }}</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
const navItems = [
  { icon: '⌂', label: 'Dashboard', active: true },
  { icon: '☰', label: 'Analytics', active: false },
  { icon: '⚙', label: 'Settings', active: false },
  { icon: 'ℹ', label: 'Help', active: false }
]
</script>

<style src="./Sidebar.scss" />
