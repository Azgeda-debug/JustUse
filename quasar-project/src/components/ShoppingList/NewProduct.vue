<template>
  <q-dialog v-model="shoppingListStore.newProductDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input
          outlined
          rounded
          dense
          v-model="shoppingListStore.newProduct.name"
          label="Product's Name *"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          rounded
          dense
          v-model="shoppingListStore.newProduct.quantity"
          label="Quantity"
          hint="optional field"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          rounded
          dense
          v-model="shoppingListStore.newProduct.price"
          type="number"
          suffix="$"
          min="0.1"
          step="0.1"
          placeholder="Product's Price *"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" color="red" v-close-popup />
        <q-btn
          @click="shoppingListStore.addNewProduct"
          flat
          label="OK"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
  <script setup>
import { useShoppingListStore } from "stores/ShoppingListStore";

const shoppingListStore = useShoppingListStore();
</script>