<template>
  <q-card class="col-10" style="margin: 0 auto">
    <q-card-section>
      <span class="text-h6">Password Strength</span>
      <q-linear-progress
        :value="linearProgress"
        :style="linearProgressColor"
        class="q-mt-md"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { watch, computed } from "vue";
import { usePasswordStore } from "stores/passwordGeneratorStore";

const passwordStore = usePasswordStore();

const linearProgress = computed(() => {
  if (
    passwordStore.characters < 2 ||
    (passwordStore.passwordLength > 0 && passwordStore.passwordLength <= 5)
  ) {
    return 0.1;
  } else if (
    passwordStore.characters == 2 ||
    (passwordStore.passwordLength > 5 && passwordStore.passwordLength <= 9)
  ) {
    return 0.25;
  } else if (
    passwordStore.characters >= 3 &&
    passwordStore.passwordLength > 9 &&
    passwordStore.passwordLength <= 13
  ) {
    return 0.5;
  } else if (
    passwordStore.characters >= 3 &&
    passwordStore.passwordLength > 13 &&
    passwordStore.passwordLength < 16
  ) {
    return 0.75;
  } else {
    return 1;
  }
});

const linearProgressColor = computed(() => {
  if (
    passwordStore.characters < 2 ||
    (passwordStore.passwordLength > 0 && passwordStore.passwordLength <= 5)
  ) {
    return "color: red;";
  } else if (
    passwordStore.characters == 2 ||
    (passwordStore.passwordLength > 5 && passwordStore.passwordLength <= 9)
  ) {
    return "color: orange;";
  } else if (
    passwordStore.characters >= 3 &&
    passwordStore.passwordLength > 9 &&
    passwordStore.passwordLength <= 13
  ) {
    return "color: #84e98d;";
  } else if (
    passwordStore.characters >= 3 &&
    passwordStore.passwordLength > 13 &&
    passwordStore.passwordLength < 16
  ) {
    return "color: #2caf37;";
  } else {
    return "color: #00750a;";
  }
});
</script>