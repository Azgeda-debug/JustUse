<template>
  <q-page class="q-pa-lg">
    <q-card>
      <div class="flex justify-between items-center">
        <q-card-section>
          <div class="text-h6">My shops</div>
        </q-card-section>

        <q-card-section>
          <q-btn
            @click="openNewChartDialog"
            flat
            round
            size="lg"
            color="primary"
            icon="bar_chart"
          />

          <q-btn
            @click="openNewShopDialog"
            flat
            round
            size="lg"
            color="primary"
            icon="add_circle"
          />
        </q-card-section>
      </div>

      <q-card-section>
        <DisplayShops />
      </q-card-section>
    </q-card>

    <NewShop />
    <ChartDialog />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useShoppingListStore } from "stores/ShoppingListStore";
import NewShop from "components/shoppingList/NewShop";
import DisplayShops from "components/shoppingList/DisplayShops";
import ChartDialog from "components/shoppingList/ChartDialog";

const shoppingListStore = useShoppingListStore();

const openNewShopDialog = () => {
  shoppingListStore.showNewShopDialog = true;
};

const openNewChartDialog = () => {
  shoppingListStore.showChartDialog = true;
  shoppingListStore.firebaseGetChart()
};

onMounted(() => {
  shoppingListStore.firebaseGetShops();
});
</script>
