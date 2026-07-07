<template>
  <div class="app">
    <div class="app__inner">
      <NavBar />
      <div class="app__body">
        <Sidebar />
        <div class="app__content">
          <div class="stats-grid">
            <StatCard label="Revenue" value="$128,500" change="+12.5%" />
            <StatCard label="Users" value="24,890" change="+8.2%" />
            <StatCard label="Orders" value="1,420" change="-3.1%" />
            <StatCard label="Conversion" value="3.6%" change="+1.4%" />
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar/NavBar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import StatCard from './components/StatCard/StatCard.vue'
import DataTable from './components/DataTable/DataTable.vue'
</script>
