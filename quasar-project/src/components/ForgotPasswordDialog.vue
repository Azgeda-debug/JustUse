<template>
  <q-dialog v-model="userStore.forgotPasswordDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your email address</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="userStore.emailAddress"
          autofocus
          hint="Check your email spam folder to find the password reset link."
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          no-caps
          v-close-popup
          class="bg-red-6 text-white"
          padding="6px 30px"
          label="Close"
        />

        <q-btn
          @click="userStore.handleForgotPassword()"
          no-caps
          v-close-popup
          class="bg-primary text-white"
          padding="6px 30px"
          label="Reset password"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useUserStore } from "stores/userStore";

const userStore = useUserStore();
</script>