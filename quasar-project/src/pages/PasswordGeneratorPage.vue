<template>
  <q-page class="q-pa-lg" style="max-width: 600px; margin: 0 auto;">
    <PasswordResult />

    <PasswordStrength />

    <PasswordLength />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { usePasswordStore } from "src/stores/passwordGeneratorStore";
import PasswordLength from "components/PasswordGenerator/PasswordLength";
import PasswordResult from "components/PasswordGenerator/PasswordResult.vue";
import PasswordStrength from "components/PasswordGenerator/PasswordStrength.vue";

const passwordStore = usePasswordStore();

onMounted(() => {
  passwordStore.generatePassword();
});
</script>