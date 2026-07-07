<template>
  <header class="navbar">
    <span class="logo">MyApp</span>
    <span class="avatar">JD</span>
  </header>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: #1a1a2e;
  color: #fff;
  flex-shrink: 0;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e94560;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
</style>
