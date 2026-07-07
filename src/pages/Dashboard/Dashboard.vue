<template>
  <div class="dashboard__outer">
    <div class="dashboard__inner">
      <div class="dashboard__cards">
        <Card
          v-for="stat in store.stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :change="stat.change"
        />
      </div>
      <DataTable
        title="Recent Orders"
        :columns="tableColumns"
        :rows="store.recentOrders"
      />
    </div>
  </div>
</template>

<script setup>
import { useDashboard } from '@/composables/useDashboard'
import Card from '@/components/Card/Card.vue'
import DataTable from '@/components/DataTable/DataTable.vue'

const { store, loading } = useDashboard()

const tableColumns = [
  { key: 'id', label: 'Order' },
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]
</script>

<style src="./Dashboard.scss" />
