<template>
  <div class="data-table">
    <div class="data-table__inner">
      <table class="data-table__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.name"
            class="data-table__row"
          >
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td>
              <span
                class="data-table__status"
                :class="'data-table__status--' + row.statusClass"
              >{{ row.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const rows = [
  { name: 'Alice Chen',   email: 'alice@example.com',    role: 'Admin',  status: 'Active',   statusClass: 'active' },
  { name: 'Bob Martinez', email: 'bob@example.com',      role: 'Editor', status: 'Active',   statusClass: 'active' },
  { name: 'Carol Johnson', email: 'carol@example.com',   role: 'Viewer', status: 'Inactive', statusClass: 'inactive' },
  { name: 'David Kim',    email: 'david@example.com',    role: 'Editor', status: 'Active',   statusClass: 'active' },
  { name: 'Eve Williams', email: 'eve@example.com',      role: 'Viewer', status: 'Inactive', statusClass: 'inactive' },
  { name: 'Frank Lee',    email: 'frank@example.com',    role: 'Admin',  status: 'Active',   statusClass: 'active' },
]
</script>

<style src="./DataTable.scss"></style>
