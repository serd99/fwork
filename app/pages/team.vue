<template>
  <div class="team-page">
    <div class="team-header">
      <div>
        <h1>Team</h1>
        <p>Manage your team members and their roles.</p>
      </div>

      <button class="add-btn">
        <span>+</span>
        Add Member
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card blue">
        <p>Total Members</p>
        <h2>4</h2>
      </div>

      <div class="stat-card green">
        <p>Online Now</p>
        <h2>2</h2>
      </div>

      <div class="stat-card orange">
        <p>Active Tasks</p>
        <h2>16</h2>
      </div>
    </div>

    <div class="team-table">
      <div class="table-header">
        <span>Member</span>
        <span>Role</span>
        <span>Department</span>
        <span>Tasks</span>
        <span>Joined</span>
        <span>Status</span>
      </div>

      <div
        v-for="member in members"
        :key="member.email"
        class="table-row"
      >
        <div class="member-info">
          <div class="avatar" :class="member.color">
            {{ member.short }}
          </div>
          <div>
            <h3>{{ member.name }}</h3>
            <p>{{ member.email }}</p>
          </div>
        </div>

        <span>{{ member.role }}</span>
        <span>{{ member.department }}</span>
        <strong>{{ member.tasks }}</strong>
        <span>{{ member.joined }}</span>

        <div class="status" :class="member.status.toLowerCase()">
          <i></i>
          {{ member.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const members = [
  {
    short: 'MS',
    name: 'Mr Serd',
    email: 'serd@fellowwork.la',
    role: 'Admin',
    department: 'Management',
    tasks: 5,
    joined: '01/01/2569',
    status: 'Online',
    color: 'blue'
  },
  {
    short: 'TA',
    name: 'Team A',
    email: 'teama@fellowwork.la',
    role: 'Developer',
    department: 'Engineering',
    tasks: 3,
    joined: '15/02/2569',
    status: 'Offline',
    color: 'green'
  },
  {
    short: 'TB',
    name: 'Team B',
    email: 'teamb@fellowwork.la',
    role: 'Designer',
    department: 'Design',
    tasks: 8,
    joined: '20/03/2569',
    status: 'Online',
    color: 'orange'
  }
]
</script>

<style lang="scss" scoped>
.team-page {
  padding: 32px;
  background: #f6f8fb;
  min-height: 100vh;
  color: #182230;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  h1 {
    font-size: 42px;
    font-weight: 800;
    margin: 0;
  }

  p {
    font-size: 22px;
    color: #8a93a3;
    margin-top: 8px;
  }
}

.add-btn {
  background: #3689df;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 18px 34px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;

  span {
    font-size: 30px;
    margin-right: 12px;
    vertical-align: middle;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

.stat-card {
  background: white;
  border: 1px solid #dde3ec;
  border-radius: 16px;
  padding: 24px 34px;
  border-left: 5px solid;

  p {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: 800;
    margin: 0 0 12px;
  }

  h2 {
    font-size: 42px;
    margin: 0;
  }

  &.blue {
    border-left-color: #3689df;

    p {
      color: #3689df;
    }
  }

  &.green {
    border-left-color: #21a67a;

    p {
      color: #21a67a;
    }
  }

  &.orange {
    border-left-color: #bd700d;

    p {
      color: #bd700d;
    }
  }
}

.team-table {
  background: white;
  border: 1px solid #dde3ec;
  border-radius: 18px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2.2fr 1fr 1.3fr 0.7fr 1.2fr 1fr;
  align-items: center;
}

.table-header {
  padding: 24px 32px;
  border-bottom: 1px solid #dde3ec;

  span {
    color: #8a93a3;
    font-size: 17px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

.table-row {
  padding: 26px 32px;
  border-bottom: 1px solid #edf0f5;
  font-size: 22px;
  color: #8a93a3;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #344054;
  }
}

.member-info {
  display: flex;
  align-items: center;
  gap: 18px;

  h3 {
    font-size: 24px;
    color: #182230;
    margin: 0;
  }

  p {
    font-size: 19px;
    color: #8a93a3;
    margin: 3px 0 0;
  }
}

.avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 800;

  &.blue {
    background: #3689df;
  }

  &.green {
    background: #21a67a;
  }

  &.orange {
    background: #bd700d;
  }
}

.status {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;

  i {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }

  &.online {
    color: #21a67a;

    i {
      background: #21a67a;
    }
  }

  &.offline {
    color: #8a93a3;

    i {
      background: #c8d0dc;
    }
  }
}

@media (max-width: 900px) {
  .team-header {
    flex-direction: column;
    gap: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .team-table {
    overflow-x: auto;
  }

  .table-header,
  .table-row {
    min-width: 1000px;
  }
}
</style>