<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 60dvh; max-width: 100%"
  >
    <q-list>
      <q-item
        v-for="(product, key) in shoppingListStore.products"
        :key="key"
        v-show="props.completed == product.completed"
        class="q-my-xs"
      >
        <q-checkbox
          @click="shoppingListStore.productBought(product, key)"
          v-model="product.completed"
        />

        <q-item-section>
          <div class="flex items-center">
            <q-item-label class="text-h6">{{ product.name }}</q-item-label>
          </div>
          <q-item-label>{{ product.quantity }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-h6">{{ product.price }}$</q-item-label>
        </q-item-section>

        <q-btn
          @click="shoppingListStore.firebaseDeleteProduct(key)"
          flat
          dense
          rounded
          color="red"
          icon="delete"
        />
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { defineProps } from "vue";
import { useShoppingListStore } from "stores/ShoppingListStore";

const shoppingListStore = useShoppingListStore();

const props = defineProps({
  completed: Boolean,
});

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