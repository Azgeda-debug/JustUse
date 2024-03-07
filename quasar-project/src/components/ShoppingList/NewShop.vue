<template>
  <div>
    <q-dialog v-model="shoppingListStore.showNewShopDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <q-input
            @keyup.enter="shoppingListStore.firebaseAddShop"
            dense
            outlined
            rounded
            v-model="shoppingListStore.newShop.name"
            label="Store Name"
          >
            <template v-slot:prepend>
              <q-icon name="store" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="openIconDialog"
            flat
            no-caps
            label="Choose Icon"
            color="primary"
          />
          <q-btn
            @click="shoppingListStore.firebaseAddShop"
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="shoppingListStore.chooseIconDialog">
      <q-card style="max-width: 350px">
        <q-card-section>
          <q-list>
            <q-item
              v-for="(icon, index) in shoppingListStore.shopIcons"
              :key="index"
              class="items-center"
            >
              <q-btn
                @click="selectIcon(icon)"
                dense
                rounded
                v-close-popup
                color="primary"
                :icon="icon.name"
                size="lg"
              />
              <q-item-label class="text-h6 q-ml-md">{{
                icon.title
              }}</q-item-label>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
          <q-btn flat no-caps label="Close" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useShoppingListStore } from "stores/ShoppingListStore";

const shoppingListStore = useShoppingListStore();

const openIconDialog = () => {
  shoppingListStore.chooseIconDialog = true;
};

const selectIcon = (icon) => {
  shoppingListStore.newShop.icon = icon.name;
};
</script>