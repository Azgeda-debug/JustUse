<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        v-show="props.tab == 'Register'"
        outlined
        rounded
        dense
        v-model="formData.name"
        autocomplete
        label="Name *"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend> <q-icon name="person" /> </template
      ></q-input>

      <q-input
        outlined
        rounded
        dense
        v-model="formData.email"
        autocomplete
        label="Email *"
        type="email"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input
        outlined
        rounded
        dense
        v-model="formData.password"
        autocomplete
        label="Password *"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            @click="isPwd = !isPwd"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <div class="flex justify-end cursor-pointer">
        <q-btn
          @click="userStore.openForgotPasswordDialog"
          flat
          rounded
          no-caps
          class="text-primary text-body1"
          label="Forgot Password?"
        />
      </div>

      <div class="column q-gutter-y-md">
        <q-btn
          @click.prevent="onSubmit"
          :label="props.tab"
          no-caps
          type="submit"
          color="primary"
        />

        <q-btn @click="userStore.loginWithGoogle()" no-caps>
          <img src="../assets/googleLogo.png" class="q-mr-md" />
          {{ props.tab }} with Google
        </q-btn>
      </div>
    </q-form>

    <ForgotPasswordDialog />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useUserStore } from "stores/userStore";
import { useQuasar } from "quasar";
import ForgotPasswordDialog from "src/components/ForgotPasswordDialog";

const $q = useQuasar();

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
  if (props.tab == "Login") {
    if (!formData.value.email || !formData.value.password) {
      $q.notify({
        type: "negative",
        message: "Fill in all fields.",
      });

      return;
    }

    userStore.firebaseLoginUser(formData.value);
  } else {
    if (
      !formData.value.email ||
      !formData.value.password ||
      !formData.value.name
    ) {
      $q.notify({
        type: "negative",
        message: "Fill in all fields.",
      });

      return;
    }

    userStore.firebaseRegisterUser(formData.value);
  }
};
const isPwd = ref(true);
</script>