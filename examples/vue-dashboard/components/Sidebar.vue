<script setup>
import { ref } from 'vue'

const links = ['Dashboard', 'Analytics', 'Users', 'Settings']
const activeLink = ref('Dashboard')

function setActive(label) {
  activeLink.value = label
}
</script>

<template>
  <!-- 子容器：clamp 宽度 -->
  <aside class="sidebar">
    <!-- 外层 -->
    <div class="sidebar-outer">
      <!-- 内层 -->
      <div class="sidebar-inner">
        <!-- 子容器 -->
        <div class="sidebar-heading">Main</div>
        <!-- 子容器：可滚动导航 -->
        <nav class="sidebar-nav">
          <div
            v-for="link in links"
            :key="link"
            class="sidebar-link"
            :class="{ active: activeLink === link }"
            @click="setActive(link)"
          >{{ link }}</div>
        </nav>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* 子容器：在父级 flex 中定位 */
.sidebar { flex: 0 0 auto; width: clamp(200px, 20vw, 280px); min-width: 0; }

/* 外层 */
.sidebar-outer { height: 100%; background: #1e293b; border-right: 1px solid #334155; }

/* 内层 */
.sidebar-inner { display: flex; flex-direction: column; height: 100%; padding: 16px 0; gap: 2px; }

/* 子容器 */
.sidebar-heading { padding: 8px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* 子容器：可滚动 */
.sidebar-nav { flex: 1; overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 2px; padding: 0 8px; }

.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; color: #94a3b8; font-size: 13px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.sidebar-link:hover { background: #334155; color: #f1f5f9; }

.sidebar-link.active { background: #334155; color: #818cf8; }
</style>
