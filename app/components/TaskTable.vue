<template>
  <div class="task-table-wrapper">
    <table class="task-table">
      <thead>
        <tr>
          <th class="col-idx">IDX</th>
          <th class="col-name">Task name</th>
          <th>Type</th>
          <th>Importance</th>
          <th>Deadline</th>
          <th>Days near</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Update status</th>
          <th class="col-status">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, i) in tasks"
          :key="task.id || i"
          class="task-row"
          :class="{ completed: task.progress >= 100 }"
          :style="{ animationDelay: (i * 0.05) + 's' }"
        >
          <td class="col-idx">{{ i + 1 }}</td>
          <td class="col-name">
            <span class="task-name">{{ task.name }}</span>
          </td>
          <td class="muted">{{ task.type }}</td>
          <td>
            <span class="badge" :class="`badge-${importanceClass(task.importance)}`">
              {{ task.importance }}
            </span>
          </td>
          <td>{{ task.deadline }}</td>
          <td>
            <span :class="{ 'expired-text': task.daysNear === 'Expired' }">
              {{ task.daysNear }}
            </span>
          </td>
          <td class="muted">{{ task.startDate }}</td>
          <td class="muted">{{ task.endDate }}</td>
          <td>
            <span class="update-status" :class="updateStatusClass(task.updateStatus)">
              {{ task.updateStatus }}
            </span>
          </td>
          <td class="col-status">
            <StatusCircle :percent="task.progress" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  tasks: { type: Array, default: () => [] },
})

function importanceClass(level) {
  const map = { High: 'high', Medium: 'medium', Low: 'low' }
  return map[level] || 'medium'
}

function updateStatusClass(status) {
  if (status === 'Completed') return 'status-completed'
  if (status === 'In Progress') return 'status-progress'
  return 'status-pending'
}
</script>

<style lang="scss" scoped>
.task-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e6e9ee;
  border-radius: 12px;
  background: #fff;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    th {
      text-align: left;
      padding: 14px 16px;
      font-size: 10px;
      font-weight: 700;
      color: #8a93a0;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1px solid #e6e9ee;
      white-space: nowrap;
      background: #fafbfc;
    }
  }

  tbody {
    .task-row {
      opacity: 0;
      transform: translateY(8px);
      animation: rowFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: background 0.15s ease;

      td {
        padding: 14px 16px;
        color: #3a4452;
        border-bottom: 1px solid #f0f2f5;
        white-space: nowrap;
        vertical-align: middle;
      }

      &:last-child td {
        border-bottom: none;
      }

      &:hover {
        background: #f7f9fb;
      }

      &.completed {
        .task-name {
          text-decoration: line-through;
          color: #9aa3b0;
        }
      }
    }
  }
}

.col-idx {
  width: 50px;
  color: #9aa3b0 !important;
}

.col-name .task-name {
  font-weight: 700;
  color: #1a2533;
}

.col-status {
  width: 90px;
}

.muted {
  color: #8a93a0 !important;
}

/* Importance badges */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;

  &.badge-high {
    background: #fceaea;
    color: #c0392b;
  }
  &.badge-medium {
    background: #eef0f2;
    color: #5a6573;
  }
  &.badge-low {
    background: #eaf3de;
    color: #3b6d11;
  }
}

.expired-text {
  color: #e24b4a;
  font-weight: 600;
}

.update-status {
  font-weight: 500;

  &.status-completed {
    color: #1d9e75;
  }
  &.status-progress {
    color: #378add;
  }
  &.status-pending {
    color: #8a93a0;
  }
}

@keyframes rowFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .task-row {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>