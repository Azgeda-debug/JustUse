<template>
  <div>
    <div class="text-center">
      <span
      v-show="!Object.keys(taskManagerStore.tasks).length"
      class="text-body1"
      >Your task list is empty. Start tracking your task by adding a task
    </span>
    </div>

    <div v-if="Object.keys(taskManagerStore.tasks).length" class="q-gutter-md">
      <q-card
        v-for="(task, key) in taskManagerStore.filterTaskContent
          ? taskManagerStore.filteredTasks
          : taskManagerStore.tasks"
        :key="key"
        flat
        bordered
      >
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

        <q-card-section>
          <q-item-label>{{ task.description }}</q-item-label>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-evenly">
          <q-btn
            @click="taskDone(key)"
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
            @click="copyTask(task)"
            flat
            rounded
            dense
            icon="content_copy"
            color="primary"
            title="copy"
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
import { useQuasar } from "quasar";

const $q = useQuasar();

const taskManagerStore = useTaskManagerStore();

const updateTask = (task, key) => {
  taskManagerStore.toggleForm = true;

  taskManagerStore.newTask = {
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    action: "update",
    taskId: key,
  };
};

const deleteTask = (key) => {
  $q.dialog({
    dark: true,
    title: "Are you sure?",
    message: "Deleted task can't be restored",
    cancel: {
      color: "red",
    },
    ok: {
      color: "primary",
    },
  }).onOk(() => {
    delete taskManagerStore.tasks[key];
    taskManagerStore.firebaseDeleteTask(key);
  });
};

const copyTask = (task) => {
  taskManagerStore.newTask = {
    title: task.title,
    description: task.description,
    deadline: task.deadline,
  };

  taskManagerStore.firebaseAddNewTask();
};

const taskDone = (key) => {
  delete taskManagerStore.tasks[key];
  taskManagerStore.firebaseTaskDone(key)
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

onMounted(() => {
  taskManagerStore.firebaseGetTasks();
});
</script>