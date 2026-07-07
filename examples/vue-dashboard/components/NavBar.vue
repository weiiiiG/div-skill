<script setup>
defineProps({
  title: { type: String, default: 'DivSkill' },
})
</script>

<template>
  <!-- 外层：背景色 -->
  <header class="navbar">
    <!-- 内层：flex 行布局 -->
    <div class="navbar-body">
      <!-- 子容器：左侧 -->
      <div class="navbar-left">
        <div class="navbar-logo">D</div>
        <span class="navbar-title">{{ title }}</span>
      </div>
      <!-- 子容器：右侧 -->
      <div class="navbar-right">
        <div class="navbar-avatar">JD</div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 外层：背景色 + 自身在父级中的定位 */
.navbar { flex: 0 0 auto; background: #1e293b; }

/* 内层：flex 行布局撑满 */
.navbar-body { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 20px; }

/* 子容器：内容对齐 */
.navbar-left,
.navbar-right { display: flex; align-items: center; gap: 12px; overflow: hidden; }

.navbar-logo { width: 28px; height: 28px; border-radius: 6px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }

.navbar-title { font-size: 16px; font-weight: 600; color: #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.navbar-avatar { width: 32px; height: 32px; border-radius: 50%; background: #6366f1; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 600; flex-shrink: 0; }
</style>
