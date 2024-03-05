<template>
  <div class="q-pa-md">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        v-show="props.tab == 'register'"
        outlined
        rounded
        dense
        v-model="formData.name"
        autocomplete
        label="Name"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        outlined
        rounded
        dense
        v-model="formData.email"
        autocomplete
        label="Email"
        type="email"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        outlined
        rounded
        dense
        v-model="formData.password"
        autocomplete
        label="Password"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            @click="isPwd = !isPwd"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <div class="text-center">
        <q-btn :label="props.tab" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useUserStore } from "stores/userStore";

const userStore = useUserStore();

const props = defineProps({
  tab: String,
});

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const onSubmit = () => {
  if (props.tab == "login") {
    userStore.firebaeLoginUser(formData.value);
  } else {
    userStore.firebaseRegisterUser(formData.value);
  }
};
const isPwd = ref(true);
</script>