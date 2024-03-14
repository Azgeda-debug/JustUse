<template>
  <q-dialog v-model="shoppingListStore.showChartDialog">
    <q-card class="q-pa-md" style="min-width: 300px">
      <q-card-section>
        <column-chart
          empty="No data"
          suffix="$"
          thousands=","
          :data="shoppingListStore.shopChart"
        ></column-chart>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            no-caps
            v-close-popup
            class="bg-red-6 text-white"
            padding="6px 30px"
            label="Close"
          />
   
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
  <script setup>
import { useShoppingListStore } from "stores/ShoppingListStore";

const shoppingListStore = useShoppingListStore();
</script>