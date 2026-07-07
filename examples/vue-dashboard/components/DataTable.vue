<script setup>
defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
})

function statusClass(status) {
  const map = { Active: 'active', Pending: 'pending', Inactive: 'inactive' }
  return map[status] || ''
}
</script>

<template>
  <!-- 外层 -->
  <div class="table-card">
    <!-- 内层 -->
    <div class="table-card-body">
      <!-- 子容器：标题 -->
      <div class="table-header"><h3>Recent Orders</h3></div>
      <!-- 子容器：可滚动表格 -->
      <div class="table-scroll">
        <table>
          <colgroup>
            <col style="width:22%">
            <col style="width:24%">
            <col style="width:16%">
            <col style="width:14%">
            <col style="width:24%">
          </colgroup>
          <thead>
            <tr>
              <th v-for="h in headers" :key="h">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td>{{ row.name }}</td>
              <td>{{ row.email }}</td>
              <td>{{ row.role }}</td>
              <td><span class="status" :class="statusClass(row.status)">{{ row.status }}</span></td>
              <td>Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 外层 */
.table-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }

/* 内层 */
.table-card-body { display: flex; flex-direction: column; padding: 0; }

/* 子容器 */
.table-header { flex: 0 0 auto; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; overflow: hidden; }

.table-header h3 { font-size: 15px; font-weight: 600; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* 子容器：可滚动 */
.table-scroll { overflow-x: auto; min-width: 0; }

table { width: 100%; border-collapse: collapse; table-layout: fixed; }

th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; background: #f8fafc; border-bottom: 2px solid #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

td { padding: 12px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.status { display: inline-block; padding: 2px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }

.status.active { background: #dcfce7; color: #166534; }

.status.pending { background: #fef9c3; color: #854d0e; }

.status.inactive { background: #f1f5f9; color: #64748b; }
</style>
