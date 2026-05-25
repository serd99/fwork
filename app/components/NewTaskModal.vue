<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="close">
        <div class="modal-box" role="dialog" aria-modal="true">
          <!-- Header -->
          <div class="modal-header">
            <div class="header-left">
              <div class="header-icon">
                <i class="fas fa-plus"></i>
              </div>
              <h3>Create New Task</h3>
            </div>
            <button class="close-btn" @click="close" aria-label="Close">
              <i class="fas fa-xmark"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <!-- Task name -->
            <div class="field">
              <label>Task Name <span class="req">*</span></label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Quarterly report"
                class="input"
                :class="{ error: errors.name }"
              />
              <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
            </div>

            <!-- Type + Assignee row -->
            <div class="field-row">
              <div class="field">
                <label>Type</label>
                <select v-model="form.type" class="input select">
                  <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
              <div class="field">
                <label>Assignee</label>
                <select v-model="form.assignee" class="input select">
                  <option v-for="a in assigneeOptions" :key="a" :value="a">{{ a }}</option>
                </select>
              </div>
            </div>

            <!-- Importance pills -->
            <div class="field">
              <label>Importance</label>
              <div class="pill-group">
                <button
                  v-for="level in importanceLevels"
                  :key="level.value"
                  type="button"
                  class="pill"
                  :class="[`pill-${level.value}`, { active: form.importance === level.value }]"
                  @click="form.importance = level.value"
                >
                  {{ level.label }}
                </button>
              </div>
            </div>

            <!-- Start + End date -->
            <div class="field-row">
              <div class="field">
                <label>Start Date</label>
                <input v-model="form.startDate" type="date" class="input" />
              </div>
              <div class="field">
                <label>End Date</label>
                <input v-model="form.endDate" type="date" class="input" />
              </div>
            </div>

            <!-- Deadline + Status -->
            <div class="field-row">
              <div class="field">
                <label>Deadline</label>
                <input v-model="form.deadline" type="date" class="input" />
              </div>
              <div class="field">
                <label>Status</label>
                <select v-model="form.updateStatus" class="input select">
                  <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

            <!-- Progress slider -->
            <div class="field">
              <label>Progress: <strong>{{ form.progress }}%</strong></label>
              <input
                v-model.number="form.progress"
                type="range"
                min="0"
                max="100"
                step="5"
                class="slider"
                :style="sliderStyle"
              />
            </div>

            <!-- Notes -->
            <div class="field">
              <label>Notes</label>
              <textarea
                v-model="form.notes"
                placeholder="Add any details..."
                class="input textarea"
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-cancel" @click="close">Cancel</button>
            <button class="btn btn-submit" @click="submit">
              <i class="fas fa-check"></i>
              Create Task
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'create'])

// Dropdown options
const typeOptions = ['Meeting', 'System / IT', 'Document', 'Design', 'Other']
const assigneeOptions = ['Mr Serd', 'Team A', 'Team B', 'Unassigned']
const statusOptions = ['Not Started', 'In Progress', 'Completed']
const importanceLevels = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

// Default form state
function emptyForm() {
  return {
    name: '',
    type: 'Meeting',
    assignee: 'Mr Serd',
    importance: 'medium',
    startDate: '',
    endDate: '',
    deadline: '',
    updateStatus: 'Not Started',
    progress: 0,
    notes: '',
  }
}

const form = reactive(emptyForm())
const errors = reactive({ name: '' })

// Slider fill color
const sliderStyle = computed(() => ({
  background: `linear-gradient(to right, #378add 0%, #378add ${form.progress}%, #e6e9ee ${form.progress}%, #e6e9ee 100%)`,
}))

// Reset form whenever modal opens
watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      Object.assign(form, emptyForm())
      errors.name = ''
    }
  }
)

function validate() {
  errors.name = ''
  if (!form.name.trim()) {
    errors.name = 'Task name is required'
    return false
  }
  return true
}

function submit() {
  if (!validate()) return

  // Map importance value back to label (High/Medium/Low)
  const importanceLabel = importanceLevels.find(l => l.value === form.importance)?.label || 'Medium'

  emit('create', {
    name: form.name.trim(),
    type: form.type,
    assignee: form.assignee,
    importance: importanceLabel,
    startDate: form.startDate,
    endDate: form.endDate,
    deadline: form.deadline,
    updateStatus: form.updateStatus,
    progress: form.progress,
    notes: form.notes,
  })

  close()
}

function close() {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
$accent: #378add;

/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 45, 90, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

/* Box */
.modal-box {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #eef0f3;
  flex-shrink: 0;

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;

    .header-icon {
      width: 32px;
      height: 32px;
      background: #e6f1fb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $accent;
      font-size: 15px;
    }

    h3 {
      margin: 0;
      font-size: 17px;
      font-weight: 700;
      color: #1a2533;
    }
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 8px;
    color: #8a93a0;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: #f0f2f5;
      color: #1a2533;
    }
  }
}

/* Body */
.modal-body {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex: 1;
}

/* Fields */
.field {
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #5a6573;
    margin-bottom: 6px;

    .req {
      color: #e24b4a;
    }

    strong {
      color: $accent;
    }
  }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

/* Inputs */
.input {
  height: 42px;
  border: 1px solid #e6e9ee;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 13px;
  color: #1a2533;
  background: #fff;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  width: 100%;

  &::placeholder {
    color: #9aa3b0;
  }

  &:focus {
    border-color: $accent;
    box-shadow: 0 0 0 3px rgba(55, 138, 221, 0.12);
  }

  &.error {
    border-color: #e24b4a;

    &:focus {
      box-shadow: 0 0 0 3px rgba(226, 75, 74, 0.12);
    }
  }
}

.select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aa3b0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.textarea {
  height: auto;
  padding: 10px 14px;
  resize: vertical;
  line-height: 1.5;
}

.error-msg {
  font-size: 11px;
  color: #e24b4a;
  margin-top: 5px;
}

/* Importance pills */
.pill-group {
  display: flex;
  gap: 8px;
}

.pill {
  flex: 1;
  height: 38px;
  border: 1px solid #e6e9ee;
  background: #fff;
  color: #5a6573;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c5ccd6;
  }

  &.active {
    font-weight: 700;
  }

  &.pill-high.active {
    border-color: #e24b4a;
    background: #fceaea;
    color: #c0392b;
  }

  &.pill-medium.active {
    border-color: #8a93a0;
    background: #eef0f2;
    color: #3a4452;
  }

  &.pill-low.active {
    border-color: #3b6d11;
    background: #eaf3de;
    color: #3b6d11;
  }
}

/* Progress slider */
.slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin-top: 6px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #378add;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.15s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #378add;
    cursor: pointer;
  }
}

/* Footer */
.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #eef0f3;
  background: #fafbfc;
  flex-shrink: 0;
}

.btn {
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: all 0.2s ease;
  font-family: inherit;

  i {
    font-size: 13px;
  }
}

.btn-cancel {
  background: #fff;
  border: 1px solid #e6e9ee;
  color: #5a6573;

  &:hover {
    background: #f4f6f9;
    border-color: #d0d4d8;
  }
}

.btn-submit {
  background: $accent;
  border: none;
  color: #fff;

  &:hover {
    background: color.adjust($accent, $lightness: -6%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(55, 138, 221, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;

  .modal-box {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-box {
    transform: scale(0.94) translateY(20px);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 560px) {
  .field-row {
    grid-template-columns: 1fr;
  }

  .modal-box {
    max-height: 95vh;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-box,
  .modal-leave-active .modal-box {
    transition: opacity 0.15s ease !important;
    transform: none !important;
  }
}
</style>