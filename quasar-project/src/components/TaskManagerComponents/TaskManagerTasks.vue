<template>
  <div>
    <span v-show="!Object.keys(tasks).length" class="text-body1"
      >You task list is empty. Start tracking your task by adding a task
    </span>

    <div v-if="Object.keys(tasks).length" class="q-gutter-md">
      <q-card v-for="(task, key) in tasks" :key="key" flat bordered>
        <q-card-section horizontal class="justify-between row">
          <q-item-label class="q-pa-sm text-h6 col-9">{{
            task.title
          }}</q-item-label>

          <q-card-section
            vertical
            class="bg-primary text-white text-center col-3"
          >
            {{ returnDeadline(task.deadline) }}
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section class="">
          <q-item-label>{{ task.description }}</q-item-label>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-evenly">
          <q-btn
            @click="taskDone"
            flat
            rounded
            dense
            icon="done"
            color="green"
            title="done"
          />
          <q-btn
            @click="updateTask(task, key)"
            flat
            rounded
            dense
            icon="update"
            color="primary"
            title="update"
          />
          <q-btn
            @click="deleteTask(key)"
            flat
            rounded
            dense
            icon="delete"
            color="red"
            title="delete"
          />
          <span class="text-bold text-caption"
            >task created: {{ returnDate(task.created) }}</span
          >
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTaskManagerStore } from "stores/taskManagerStore";
import { differenceInDays, parseISO } from "date-fns";

const taskManagerStore = useTaskManagerStore();

const tasks = ref({});
taskManagerStore.$subscribe((mutation, state) => {
  tasks.value = taskManagerStore.tasks;
});

const updateTask = (task, key) => {
  taskManagerStore.toggleForm = true;

  taskManagerStore.newTask.title = task.title;
  taskManagerStore.newTask.description = task.description;
  taskManagerStore.newTask.deadline = task.deadline;
  taskManagerStore.newTask.action = "update";
  taskManagerStore.newTask.taskId = key;
};

const deleteTask = (key) => {
  delete taskManagerStore.tasks[key];
  taskManagerStore.firebaseDeleteTask(key);
};

const taskDone = () => {
  console.log("task done");
};

const returnDate = (timestamp) => {
  const d = new Date(timestamp);

  const day = d.getDate().toString().padStart(2, 0);
  const month = (d.getMonth() + 1).toString().padStart(2, 0);
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
};

const returnDeadline = (timestamp) => {
  const startDate = parseISO(timestamp);
  const endDate = new Date();

  let deadline = differenceInDays(startDate, endDate) + 1;

  if (deadline < 0) deadline = 0;

  if (deadline == 1 || deadline == -1) {
    return `${deadline} day left`;
  } else {
    return `${deadline} days left`;
  }
};

// dodać sortowanie taskow na podstawie deadlina

onMounted(() => {
  taskManagerStore.firebaseGetTasks();
});
</script>