<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <AppSidebar :collapsed="sidebarCollapsed" />

    <!-- Main area -->
    <div class="main-area" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Top navbar -->
      <AppNavbar @toggle-sidebar="toggleSidebar" @new-task="openNewTask" />

      <!-- Page content -->
      <main class="page-content">
        <slot />
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>

    <!-- New Task Modal (global — opens from navbar button) -->
    <NewTaskModal v-model="showNewTask" @create="handleCreateTask" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarCollapsed = ref(false)
const showNewTask = ref(false)

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

function openNewTask() {
  showNewTask.value = true
}

function handleCreateTask(task) {
  // The new task data is emitted here.
  // We store it in a shared Nuxt state so any page can read/react.
  const tasks = useState('newTasks', () => [])
  tasks.value.unshift({ id: Date.now(), ...task })
  console.log('New task created:', task)
}
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &.sidebar-collapsed {
    margin-left: 76px;
  }
}

.page-content {
  flex: 1;
  padding: 28px 32px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-area {
    margin-left: 0;

    &.sidebar-collapsed {
      margin-left: 0;
    }
  }

  .page-content {
    padding: 16px;
  }
}
</style>