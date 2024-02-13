<template>
  <div class="q-pa-sm row q-gutter-md">
    <q-card class="col-10" style="margin: 20px auto">
      <q-card-section>
        <span class="text-h6">Your password:</span>
        <q-input v-model="password" dense readonly ref="inputField">
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
              @click="generatePassword()"
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

    <q-card class="col-10" style="margin: 0 auto">
      <q-card-section>
        <span class="text-h6">Password Strength</span>
        <q-linear-progress :value="linearProgress" class="q-mt-md" />
      </q-card-section>
    </q-card>

    <q-card class="col-10" flat bordered style="margin: 20px auto">
      <q-card-section>
        <span class="text-h6">Password Length</span>
        <div class="flex items-center justify-between">
          <q-input
            filled
            v-model="passwordLength"
            type="number"
            min="1"
            max="50"
            style="max-width: 70px"
          />
          <q-slider
            v-model="passwordLength"
            :min="1"
            :max="50"
            style="width: 65%"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="flex">
          <q-checkbox
            @click="generatePassword()"
            v-model="uppercase"
            label="Uppercase"
          />
          <q-checkbox
            @click="generatePassword()"
            v-model="lowercase"
            label="Lowercase"
          />
          <q-checkbox
            @click="generatePassword()"
            v-model="numbers"
            label="Numbers"
          />
          <q-checkbox
            @click="generatePassword()"
            v-model="symbols"
            label="Symbols"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const password = ref("");
const passwordLength = ref(12);

const uppercase = ref(true);
const lowercase = ref(true);
const numbers = ref(true);
const symbols = ref(true);

watch(passwordLength, (newVal) => {
  if (newVal) {
    generatePassword();
  }
});

const generatePassword = () => {
  const uppercaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const numberChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const symbolChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '<', '>', '?'];
  
  let newPassword = "";
  let shouldGeneratePassword = false;
  const getRandomPassword = () => {
    newPassword = "";

    for (let i = 0; i < passwordLength.value && shouldGeneratePassword; i++) {
      const randomIndex = Math.floor(Math.random() * avilableChars.length);
      newPassword += avilableChars[randomIndex];
    }
    return newPassword;
  };

  let avilableChars = [];

  if (uppercase.value) {
    avilableChars = [...avilableChars, ...uppercaseChars];
    shouldGeneratePassword = true;
  }

  if (lowercase.value) {
    avilableChars = [...avilableChars, ...lowercaseChars];
    shouldGeneratePassword = true;
  }
  if (numbers.value) {
    avilableChars = [...avilableChars, ...numberChars];
    shouldGeneratePassword = true;
  }

  if (symbols.value) {
    avilableChars = [...avilableChars, ...symbolChars];
    shouldGeneratePassword = true;
  }

  password.value = getRandomPassword();
};

const inputField = ref("");
const copyPassword = () => {
  inputField.value.select();
  document.execCommand("copy");

  $q.notify({
    type: "positive",
    message: "copied",
  });
};

const linearProgress = computed(() => {
  if (passwordLength.value > 0 && passwordLength.value <= 5) {
    return 0.05;
  } else if (passwordLength.value > 5 && passwordLength.value <= 7) {
    return 0.35;
  } else if (passwordLength.value > 7 && passwordLength.value <= 9) {
    return 0.55;
  } else if (passwordLength.value > 9 && passwordLength.value < 13) {
    return 0.8;
  } else {
    return 1;
  }
});

onMounted(() => {
  generatePassword();
});
</script>
