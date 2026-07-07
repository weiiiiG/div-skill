<template>
  <div class="data-table">
    <div class="data-table__inner">
      <div class="data-table__header">
        <h3 class="data-table__title">Recent Transactions</h3>
      </div>
      <div class="data-table__wrapper">
        <table class="data-table__table">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 30%" />
            <col style="width: 20%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.id">
              <td class="data-table__cell--name">{{ row.name }}</td>
              <td>{{ row.email }}</td>
              <td>{{ row.role }}</td>
              <td>
                <span
                  class="data-table__status"
                  :class="`data-table__status--${row.status.toLowerCase()}`"
                >
                  {{ row.status }}
                </span>
              </td>
              <td>
                <button class="data-table__action">Edit</button>
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
  data: { type: Array, required: true },
})
</script>

<style src="./DataTable.scss" scoped></style>
