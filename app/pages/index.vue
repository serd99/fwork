<template>
  <div class="overview-page">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Overview</h1>
        <p class="page-subtitle">Your daily task summary and priorities.</p>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="stats-grid">
      <StatCard label="Total Tasks" :value="stats.total" icon="fas fa-list-check" color="blue" />
      <StatCard label="Completed" :value="stats.completed" icon="fas fa-circle-check" color="green" />
      <StatCard label="Pending" :value="stats.pending" icon="fas fa-clock" color="amber" />
      <StatCard label="Near Deadline" :value="stats.nearDeadline" icon="fas fa-triangle-exclamation" color="red" />
    </div>

    <!-- Today's Priorities -->
    <section class="table-section">
      <div class="section-header">
        <h2 class="section-title">Today's Priorities</h2>
        <a href="#" class="section-action">View all <i class="fas fa-arrow-right"></i></a>
      </div>
      <TaskTable :tasks="priorities" />
    </section>

    <!-- All Ongoing Tasks -->
    <section class="table-section">
      <div class="section-header">
        <h2 class="section-title">All Ongoing Tasks</h2>
        <a href="#" class="section-action"><i class="fas fa-filter"></i> Filter</a>
      </div>
      <TaskTable :tasks="allTasks" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

// Seed tasks (replace with useFetch from your Go backend)
const baseTasks = ref([
  { id: 1, name: 'Meeting', type: 'Meeting', importance: 'High', deadline: '3/05/2569', daysNear: 'Expired', startDate: '30/04/2569', endDate: '30/04/2569', updateStatus: 'Not Started', progress: 0 },
  { id: 2, name: 'Excel Teaching', type: 'System / IT', importance: 'Medium', deadline: '4/05/2569', daysNear: '2', startDate: '01/05/2569', endDate: '01/05/2569', updateStatus: 'In Progress', progress: 50 },
  { id: 3, name: 'Video Editing', type: 'System / IT', importance: 'Medium', deadline: '5/05/2569', daysNear: '3', startDate: '02/05/2569', endDate: '02/05/2569', updateStatus: 'In Progress', progress: 25 },
  { id: 4, name: 'Test', type: 'Document', importance: 'Low', deadline: '5/05/2569', daysNear: '3', startDate: '03/05/2569', endDate: '03/05/2569', updateStatus: 'Not Started', progress: 0 },
  { id: 5, name: 'Test 2', type: 'Meeting', importance: 'Medium', deadline: '10/05/2569', daysNear: '8', startDate: '05/05/2569', endDate: '05/05/2569', updateStatus: 'Completed', progress: 100 },
])

// Tasks created via the New Task modal (shared state from the layout)
const newTasks = useState('newTasks', () => [])

// Combine: newest first
const allTasks = computed(() => [...newTasks.value, ...baseTasks.value])

// Auto-calculated stats
const stats = computed(() => {
  const list = allTasks.value
  return {
    total: list.length,
    completed: list.filter(t => t.progress >= 100).length,
    pending: list.filter(t => t.progress < 100).length,
    nearDeadline: list.filter(t => t.daysNear === 'Expired' || (Number(t.daysNear) <= 2 && !isNaN(Number(t.daysNear)))).length,
  }
})

const priorities = computed(() => allTasks.value.slice(0, 2))

// ─── Connect to Go backend (uncomment when ready) ───
// const { data } = await useFetch('/api/tasks/overview')
// if (data.value) { baseTasks.value = data.value.tasks }
</script>

<style lang="scss" scoped>
.overview-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  color: #1a2533;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  color: #8a93a0;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.table-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a2533;
  margin: 0;
}

.section-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #378add;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  transition: gap 0.2s ease, color 0.2s ease;

  i {
    font-size: 11px;
  }

  &:hover {
    color: color.adjust(#378add, $lightness: -10%);
    gap: 9px;
  }
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 22px;
  }
}
</style>