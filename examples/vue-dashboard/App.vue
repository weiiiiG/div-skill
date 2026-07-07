<script setup>
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar.vue'
import StatCard from './components/StatCard.vue'
import DataTable from './components/DataTable.vue'

const tableHeaders = ['Name', 'Email', 'Role', 'Status', 'Actions']
const tableRows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol Wang', email: 'carol@example.com', role: 'Viewer', status: 'Pending' },
  { name: 'David Kim', email: 'david@example.com', role: 'Admin', status: 'Inactive' },
  { name: 'Eve Martinez', email: 'eve@example.com', role: 'Editor', status: 'Active' },
]
</script>

<template>
  <!-- 外层 -->
  <div class="app">
    <!-- 内层 -->
    <div class="app-inner">
      <!-- 子容器：导航栏 -->
      <NavBar />

      <!-- 子容器：主体区域 -->
      <div class="body-area">
        <!-- 外层 -->
        <div class="body-outer">
          <!-- 内层 -->
          <div class="body-inner">
            <!-- 子容器：侧边栏 -->
            <Sidebar />

            <!-- 子容器：主内容 -->
            <main class="main">
              <!-- 外层 -->
              <div class="main-outer">
                <!-- 内层 -->
                <div class="main-inner">
                  <!-- 子容器：页面标题 -->
                  <div class="page-header"><h1>Dashboard</h1></div>

                  <!-- 内层（网格布局） -->
                  <div class="metrics-grid">
                    <StatCard label="Revenue" value="$48,250" change="+12.5%" :isUp="true" />
                    <StatCard label="Users" value="2,847" change="+8.3%" :isUp="true" />
                    <StatCard label="Orders" value="1,842" change="-3.1%" :isUp="false" />
                  </div>

                  <DataTable :headers="tableHeaders" :rows="tableRows" />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 根容器 ===== */
/* 外层：视口撑满 + 背景 */
.app { height: 100vh; width: 100vw; overflow: hidden; background: #f1f5f9; }
/* 内层：flex 列撑满 */
.app-inner { display: flex; flex-direction: column; height: 100%; }

/* ===== 主体区域子容器 ===== */
.body-area { flex: 1; min-height: 0; }
/* 外层 */
.body-outer { height: 100%; }
/* 内层 */
.body-inner { display: flex; height: 100%; }

/* ===== 主内容子容器 ===== */
.main { flex: 1; min-width: 0; }
/* 外层 */
.main-outer { height: 100%; }
/* 内层 */
.main-inner { display: flex; flex-direction: column; height: 100%; padding: 24px; gap: 24px; overflow-y: auto; }

/* ===== 页面标题子容器 ===== */
.page-header { flex: 0 0 auto; overflow: hidden; }
.page-header h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ===== 指标卡内层 ===== */
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
</style>
