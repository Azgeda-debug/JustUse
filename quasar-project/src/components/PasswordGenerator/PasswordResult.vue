<template>
  <q-card class="col-10" style="margin: 20px auto">
    <q-card-section>
      <span class="text-h6">Your password:</span>
      <q-input v-model="passwordStore.password" dense readonly ref="inputField">
        <template v-slot:append>
          <q-btn
            @click="copyPassword()"
            flat
            dense
            rounded
            color="primary"
            icon="content_copy"
            title="copy"
          />
          <q-btn
            @click="passwordStore.generatePassword()"
            flat
            dense
            rounded
            color="primary"
            icon="autorenew"
            title="generate"
          />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { usePasswordStore } from "stores/passwordGeneratorStore";
import { useQuasar } from 'quasar'

const $q = useQuasar()

const passwordStore = usePasswordStore();

const inputField = ref("");

const copyPassword = () => {
  inputField.value.select();
  document.execCommand("copy");

  $q.notify({
    type: "positive",
    message: "copied",
  });
};
</script>