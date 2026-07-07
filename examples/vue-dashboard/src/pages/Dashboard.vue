<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <div class="dashboard__cards">
        <Card
          v-for="stat in store.stats"
          :key="stat.title"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :trend="stat.trend"
        />
      </div>
      <div class="dashboard__table">
        <DataTable :data="store.tableData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '../stores/dashboard'
import Card from '../components/Card.vue'
import DataTable from '../components/DataTable.vue'

const store = useDashboardStore()
</script>

<style src="./Dashboard.scss" scoped></style>
