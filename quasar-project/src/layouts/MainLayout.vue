<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-show="userStore.userDetails.id"
          flat
          icon="menu"
          class="absolute-left"
        >
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/task-manager">
                <q-item-section>Task Manager</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/shopping-list">
                <q-item-section>Shopping List</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/expense-calculator">
                <q-item-section>Expense Calculator</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/currency-calculator">
                <q-item-section>Currency Calculator</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/weather">
                <q-item-section>Weather</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/password-generator">
                <q-item-section>Password Generator</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/bmi-calculator">
                <q-item-section>BMI Calculator</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title class="absolute-center"> Just Use </q-toolbar-title>

        <q-btn
          v-if="userStore.userDetails && userStore.userDetails.id"
          @click="logout()"
          no-caps
          flat
          color="white"
          icon="logout"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "stores/userStore";

const userStore = useUserStore();

const logout = () => {
  userStore.firebaseLogout();
};

onMounted(() => {
  userStore.firebaseAuthStateChanged();
});
</script>
