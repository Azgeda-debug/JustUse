<template>
  <div
    v-if="Object.keys(shoppingListStore.shops).length"
    class="flex justify-center q-gutter-md"
  >
    <q-card
      @click="selectShop(shop, key)"
      v-for="(shop, key) in shoppingListStore.shops"
      :key="key"
      class="cursor-pointer"
      :style="$q.screen.width >= 700 ? 'width: 47%' : 'width: 100%'"
    >
      <div class="flex justify-between">
        <q-card-section class="flex q-gutter-x-md">
          <div class="text-h6">{{ shop.name }}</div>
          <q-icon color="primary" size="md" :name="shop.icon" />
        </q-card-section>
        <q-card-section>
          <q-btn
            @click.stop="deleteShop(key)"
            flat
            dense
            rounded
            color="red"
            icon="delete"
          />
        </q-card-section>
      </div>
      <q-card-section class="flex justify-between items-center">
        <q-linear-progress
          size="lg"
          rounded
          :value="shopLinearProgress(shop)"
          color="green"
        />
        <div class="flex justify-end full-width q-mt-xs">
          <div>{{ shop.completedProducts }} / {{ shop.totalProducts }}</div>
        </div>
      </q-card-section>
    </q-card>

    <CurrentShop />
  </div>
</template>
  
  <script setup>
import { useQuasar } from "quasar";
import CurrentShop from "components/shoppingList/CurrentShop";
import { useShoppingListStore } from "stores/ShoppingListStore";

const $q = useQuasar();

const shoppingListStore = useShoppingListStore();

const selectShop = (shop, key) => {
  shoppingListStore.openCurrentShopDialog = true;
  shoppingListStore.selectedShop = {
    icon: shop.icon,
    name: shop.name,
    shopId: key,
  };

  shoppingListStore.firebaseClearProducts();
  shoppingListStore.firebaseGetProducts();
};

const deleteShop = (key) => {
  shoppingListStore.firebaseDeleteShop(key);
};

const shopLinearProgress = (shop) => {
  let totalProducts = parseInt(shop.totalProducts);
  let completedProducts = parseInt(shop.completedProducts);

  if (completedProducts > 0) {
    let result = completedProducts / totalProducts;
    return result;
  }

  return 0;
};
</script>