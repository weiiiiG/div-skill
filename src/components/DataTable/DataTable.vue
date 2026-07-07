<template>
  <div class="datatable__outer">
    <div class="datatable__inner">
      <div class="datatable__header">
        <span class="datatable__title">{{ title }}</span>
      </div>
      <div class="datatable__wrapper">
        <table class="datatable__table">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in columns" :key="col.key">
                <span v-if="col.key === 'status'" class="datatable__status" :class="statusClass(row[col.key])">
                  {{ row[col.key] }}
                </span>
                <span v-else>{{ row[col.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Data' },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true }
})

function statusClass(status) {
  if (!status) return ''
  const map = {
    Completed: 'datatable__status--success',
    Pending: 'datatable__status--warning',
    Failed: 'datatable__status--danger'
  }
  return map[status] || ''
}
</script>

<style src="./DataTable.scss" />
