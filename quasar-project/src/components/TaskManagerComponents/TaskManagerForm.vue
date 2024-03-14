<template>
  <div>
    <q-dialog v-model="taskManagerStore.toggleForm">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            dense
            rounded
            label="Title"
            v-model="taskManagerStore.newTask.title"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            dense
            type="textarea"
            label="Task Description"
            v-model="taskManagerStore.newTask.description"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            rounded
            dense
            label="Task Deadline"
            type="date"
            v-model="taskManagerStore.newTask.deadline"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            no-caps
            v-close-popup
            class="bg-red-6 text-white"
            padding="6px 30px"
            label="Close"
          />
          <q-btn
            @click="handleForm"
            no-caps
            v-close-popup
            class="bg-primary text-white"
            padding="6px 30px"
            label="Add Task"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useTaskManagerStore } from "stores/taskManagerStore";
import { useQuasar } from "quasar";

const $q = useQuasar();

const taskManagerStore = useTaskManagerStore();

const handleForm = () => {
  const action = taskManagerStore.newTask.action;

  if (
    !taskManagerStore.newTask.deadline ||
    !taskManagerStore.newTask.description ||
    !taskManagerStore.newTask.title
  ) {
    $q.notify({
      type: "negative",
      message: "Fill in all fields.",
    });

    return;
  }

  if (action == "addTask") {
    taskManagerStore.firebaseAddNewTask();
  } else {
    taskManagerStore.firebaseUpdateTask();
  }
  taskManagerStore.newTask.taskId = "";
};
</script>