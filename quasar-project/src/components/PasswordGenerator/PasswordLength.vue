<template>
  <q-card class="col-10" flat bordered style="margin: 20px auto">
    <q-card-section>
      <span class="text-h6">Password Length</span>
      <div class="flex items-center justify-between">
        <q-input
          filled
          v-model="passwordStore.passwordLength"
          type="number"
          min="1"
          max="50"
          style="max-width: 70px"
        />
        <q-slider
          v-model="passwordStore.passwordLength"
          :min="1"
          :max="50"
          style="width: 65%"
        />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="flex">
        <q-checkbox
          @click="passwordStore.generatePassword"
          v-model="passwordStore.uppercase"
          label="Uppercase"
        />
        <q-checkbox
          @click="passwordStore.generatePassword"
          v-model="passwordStore.lowercase"
          label="Lowercase"
        />
        <q-checkbox
          @click="passwordStore.generatePassword"
          v-model="passwordStore.numbers"
          label="Numbers"
        />
        <q-checkbox
          @click="passwordStore.generatePassword"
          v-model="passwordStore.symbols"
          label="Symbols"
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        @click.prevent="passwordStore.generatePassword"
        no-caps
        label="Generate"
        class="bg-primary text-white"
        padding="3px 30px"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { watch } from "vue";
import { usePasswordStore } from "stores/passwordGeneratorStore";

const passwordStore = usePasswordStore();

watch(
  [
    () => passwordStore.uppercase,
    () => passwordStore.lowercase,
    () => passwordStore.numbers,
    () => passwordStore.symbols,
  ],
  (newVal) => {
    let totalCharacters = 0;

    newVal.forEach((val) => {
      if (val) totalCharacters++;
    });

    passwordStore.characters = totalCharacters;
  }
);
</script>