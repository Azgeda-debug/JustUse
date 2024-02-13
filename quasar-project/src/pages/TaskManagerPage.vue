<template>
  <q-page class="q-pa-md">
    <q-btn
      @click="openDialog"
      dense
      color="primary"
      no-caps
      label="Add a New Task"
    />
    <TaskManagerForm />
    <TaskManagerTasks />
  </q-page>
</template>

<script setup>
import TaskManagerForm from "components/TaskManagerComponents/TaskManagerForm";
import TaskManagerTasks from "components/TaskManagerComponents/TaskManagerTasks";
import { useTaskManagerStore } from "stores/taskManagerStore";

const taskManagerStore = useTaskManagerStore();

const openDialog = () => {
  taskManagerStore.toggleForm = true
  taskManagerStore.newTask.action = 'addTask'
}
</script>
