<template>
  <q-dialog v-model="taskManagerStore.showCompletedTasks">
    <div
      :style="$q.screen.width <= 500 ? 'min-width: 90%' : 'min-width: 500px'"
    >
      <span
        v-show="!Object.keys(taskManagerStore.completedTasks).length"
        class="text-body1"
        >Your completed tasks list is empty.
      </span>

      <q-card
        v-if="Object.keys(taskManagerStore.completedTasks).length"
        class="q-pa-sm"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 70dvh; max-width: 100%"
        >
          <q-list separator class="q-pa-md">
            <q-item
              v-for="(task, key) in taskManagerStore.completedTasks"
              :key="key"
              class="column q-my-xs"
            >
              <q-item-section class="col">
                <q-item-label class="q-pa-sm text-h6">{{
                  task.title
                }}</q-item-label>
              </q-item-section>

              <q-item-section class="col q-mb-sm">
                <q-item-label>{{ task.description }}</q-item-label>
              </q-item-section>

              <q-item-section side class="absolute-bottom-right">
                <q-item-label caption>
                  <span class="text-bold text-primary"
                    >task created: {{ returnDate(task.created) }}</span
                  >
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-scroll-area>

       

        <q-card-actions align="right" class="text-primary">
          <q-btn no-caps v-close-popup color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>
  
<script setup>
import { useTaskManagerStore } from "stores/taskManagerStore";

const taskManagerStore = useTaskManagerStore();

const returnDate = (timestamp) => {
  const d = new Date(timestamp);

  const day = d.getDate().toString().padStart(2, 0);
  const month = (d.getMonth() + 1).toString().padStart(2, 0);
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
};

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};
</script>