<template>
  <aside class="sidebar">
    <nav>
      <a
        v-for="link in links"
        :key="link.label"
        href="#"
        :class="{ active: link.active }"
      >{{ link.label }}</a>
    </nav>
  </aside>
</template>

<script setup>
const links = [
  { label: 'Dashboard', active: true },
  { label: 'Users', active: false },
  { label: 'Settings', active: false },
]
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #16213e;
  color: #ccc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar nav {
  padding: 16px 0;
}

.sidebar a {
  display: block;
  padding: 12px 24px;
  color: #a0aec0;
  text-decoration: none;
  font-size: 15px;
  transition: 0.15s;
}

.sidebar a:hover,
.sidebar a.active {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.sidebar a.active {
  border-right: 3px solid #e94560;
}
</style>
