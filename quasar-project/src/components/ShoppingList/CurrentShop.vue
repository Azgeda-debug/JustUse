<template>
  <q-dialog v-model="shoppingListStore.openCurrentShopDialog">
    <q-card
      :style="
        $q.screen.width <= 600
          ? 'min-width: 100%'
          : $q.screen.width > 600 && $q.screen.width <= 800
          ? 'min-width: 80%'
          : 'min-width: 60%'
      "
    >
      <q-card-section class="flex items-center justify-between">
        <div class="flex q-gutter-md">
          <div class="text-h6">{{ shoppingListStore.selectedShop.name }}</div>
          <q-icon
            color="primary"
            size="md"
            :name="shoppingListStore.selectedShop.icon"
          />
        </div>
        <q-btn
          @click="openNewProductDialog"
          flat
          round
          size="lg"
          color="primary"
          icon="add_circle"
        />
      </q-card-section>

      <q-separator />

      <q-card-section
        v-if="Object.keys(shoppingListStore.products).length"
        class="q-pa-none"
      >
        <q-card class="shadow-0">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab no-caps name="productsToBuy" label="Products to Buy" />
            <q-tab no-caps name="boughtProducts" label="Bought Products" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="productsToBuy">
              <ShowProducts :completed="false" />
            </q-tab-panel>

            <q-tab-panel name="boughtProducts">
              <ShowProducts :completed="true" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>

      <q-card-section class="absolute-bottom">
        <span v-show="tab == 'productsToBuy'"
          >Total Price:
          <span class="text-bold">{{ productsToBuyTotalPrice }} $</span></span
        >
        <span v-show="tab == 'boughtProducts'"
          >Total Price:
          <span class="text-bold">{{ boughtProductsTotalPrice }} $</span></span
        >
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

    <NewProduct />
  </q-dialog>
</template>
  
<script setup>
import { useShoppingListStore } from "stores/ShoppingListStore";
import NewProduct from "./NewProduct";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import ShowProducts from "components/ShoppingList/ShowProducts";

const $q = useQuasar();

const shoppingListStore = useShoppingListStore();

const openNewProductDialog = () => {
  shoppingListStore.newProductDialog = true;
};

const productsToBuyTotalPrice = computed(() => {
  const shopId = shoppingListStore.selectedShop.shopId;
  return shoppingListStore.shops[shopId].productsToBuyTotalPrice;
});

const boughtProductsTotalPrice = computed(() => {
  const shopId = shoppingListStore.selectedShop.shopId;
  return shoppingListStore.shops[shopId].boughtProductsTotalPrice;
});

const tab = ref("productsToBuy");
</script>