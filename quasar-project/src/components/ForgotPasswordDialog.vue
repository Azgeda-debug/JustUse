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
        <q-btn flat no-caps label="Cancel" color="red" v-close-popup />
        <q-btn
          @click="userStore.handleForgotPassword()"
          flat
          no-caps
          label="Reset password"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useUserStore } from "stores/userStore";

const userStore = useUserStore();
</script>