<template>
  <q-dialog v-model="shoppingListStore.openCurrentShopDialog">
    <q-card style="min-width: 450px">
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
        class="q-pt-none"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 600px; max-width: 100%"
        >
          <q-list>
            <q-item
              v-for="(product, key) in shoppingListStore.products"
              :key="key"
              class="q-my-xs"
            >
              <q-checkbox @click="shoppingListStore.productBought(product, key)" v-model="product.completed" />

              <q-item-section>
                <div class="flex items-center">
                  <q-item-label class="text-h6">{{
                    product.name
                  }}</q-item-label>
                </div>
                <q-item-label>{{ product.quantity }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label class="text-h6"
                  >{{ product.price }}$</q-item-label
                >
              </q-item-section>
              <q-btn
                @click="deleteProduct(key)"
                flat
                dense
                rounded
                color="red"
                icon="delete"
              />
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="Close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>

    <NewProduct />
  </q-dialog>
</template>
  
<script setup>
import { useShoppingListStore } from "stores/ShoppingListStore";
import { onBeforeUnmount, } from "vue";
import NewProduct from "./NewProduct";

const shoppingListStore = useShoppingListStore();

const openNewProductDialog = () => {
  shoppingListStore.newProductDialog = true;
};

const deleteProduct = (key) => {
  shoppingListStore.firebaseDeleteProduct(key);
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