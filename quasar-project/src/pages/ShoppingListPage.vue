<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section class="flex justify-between items-center">
        <q-card-section>
          <div class="text-h6">My shops</div>
        </q-card-section>

        <q-card-section>
          <q-btn
            @click="openNewShopDialog"
            flat
            round
            size="lg"
            color="primary"
            icon="add_circle"
          />
        </q-card-section>
      </q-card-section>

      <q-card-section>
        <DisplayShops />
      </q-card-section>
    </q-card>

    <NewShop />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useShoppingListStore } from "stores/ShoppingListStore";
import NewShop from "components/shoppingList/NewShop";
import DisplayShops from "components/shoppingList/DisplayShops";

const shoppingListStore = useShoppingListStore();

const openNewShopDialog = () => {
  shoppingListStore.showNewShopDialog = true;
};

onMounted(() => {
  shoppingListStore.firebaseGetShops();
});
</script>
