<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  isUp: { type: Boolean, default: true },
})
</script>

<template>
  <!-- 子容器：grid 子项溢出保护 -->
  <article class="stat-card">
    <!-- 外层 -->
    <div class="stat-card-outer">
      <!-- 内层 -->
      <div class="stat-card-body">
        <!-- 子容器 -->
        <div class="stat-card-label">{{ label }}</div>
        <div class="stat-card-value">{{ value }}</div>
        <div class="stat-card-change" :class="{ up: isUp, down: !isUp }">{{ change }}</div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* 子容器：grid 子项溢出保护 */
.stat-card { min-width: 0; }

/* 外层 */
.stat-card-outer { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }

/* 内层 */
.stat-card-body { display: flex; flex-direction: column; padding: 20px; gap: 6px; }

/* 子容器 */
.stat-card-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.stat-card-value { font-size: 28px; font-weight: 700; color: #0f172a; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.stat-card-change { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.stat-card-change.up { color: #10b981; }

.stat-card-change.down { color: #ef4444; }
</style>
