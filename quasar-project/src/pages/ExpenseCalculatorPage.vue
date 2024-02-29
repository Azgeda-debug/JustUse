<template>
  <q-page class="q-pa-xs">
    <ExpenseCalculatorForm  />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ExpenseCalculatorForm from "components/ExpenseCalculator/ExpenseCalculatorForm";
</script>
