<template>
  <div>
    <q-dialog v-model="taskManagerStore.toggleForm" persistent>
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
            rounded
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

        <q-card-actions align="right" class="text-primary">
          <q-btn no-caps v-close-popup color="red" label="Cancel" />
          <q-btn
            @click="handleForm"
            no-caps
            v-close-popup
            color="primary"
            label="Add Task"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskManagerStore } from "stores/taskManagerStore";

const taskManagerStore = useTaskManagerStore();

const handleForm = () => {
  const action = taskManagerStore.newTask.action;

  if (action == "addTask") {
    taskManagerStore.firebaseAddNewTask();

    // taskManagerStore.newTask.value.title = ''
    // taskManagerStore.newTask.value.description = ''
    // taskManagerStore.newTask.value.deadline = ''
    // taskManagerStore.newTask.value.action = ''
    taskManagerStore.newTask.value.taskId = ''
  } else {
    taskManagerStore.firebaseUpdateTask();
    // taskManagerStore.newTask.value = {
    //   title: "",
    //   description: "",
    //   deadline: "",
    //   action: "",
    // };
  }
};
</script>