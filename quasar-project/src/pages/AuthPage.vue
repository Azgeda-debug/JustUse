<template>
  <div class="q-pa-xs">
    <div class="q-gutter-y-md" style="max-width: 600px; margin: 0 auto;">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <LoginRegisterForm :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <LoginRegisterForm :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginRegisterForm from "components/LoginRegisterForm.vue";

const tab = ref("login");
</script>
