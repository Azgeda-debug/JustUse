<template>
  <q-page
    class="q-pa-md"
    :style="$q.screen.width > 1024 ? 'max-width: 80%; margin: 0 auto;' : ''"
  >
    <div class="flex justify-between">
      <div
        class="q-gutter-md q-mb-md"
        :style="$q.screen.width <= 600 ? 'margin: -20px auto 10px auto;' : ''"
      >
        <q-btn
          @click="openNewTaskDialogForm"
          dense
          no-caps
          padding="5px 14px"
          color="primary"
          label="New Task"
        />

        <q-btn
          @click="showCompletedTasks"
          dense
          no-caps
          padding="5px 14px"
          color="green"
          label="View Completed Tasks"
        />
      </div>

      <q-input
        @keyup="taskManagerStore.filterTasks()"
        outlined
        dense
        rounded
        v-model="taskManagerStore.filterTaskContent"
        label="Filter Tasks by Title"
        :style="$q.screen.width > 600 ? 'width: 280px' : 'width: 100%'"
      >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    </div>
    <TaskManagerShowTasks class="q-mt-xl" />
    <TaskManagerShowCompletedTasks />
    <TaskManagerForm />
  </q-page>
</template>

<script setup>
import TaskManagerForm from "components/TaskManagerComponents/TaskManagerForm";
import TaskManagerShowTasks from "components/TaskManagerComponents/TaskManagerShowTasks";
import TaskManagerShowCompletedTasks from "components/TaskManagerComponents/TaskManagerShowCompletedTasks";
import { useTaskManagerStore } from "stores/taskManagerStore";
import { useQuasar } from "quasar";

const $q = useQuasar();

const taskManagerStore = useTaskManagerStore();

const openNewTaskDialogForm = () => {
  taskManagerStore.toggleForm = true;
  taskManagerStore.newTask = {
    title: "",
    description: "",
    deadline: "",
    action: "addTask",
  };
};

const showCompletedTasks = () => {
  taskManagerStore.showCompletedTasks = true;
  taskManagerStore.firebaseGetCompletedTasks();
};
</script>
