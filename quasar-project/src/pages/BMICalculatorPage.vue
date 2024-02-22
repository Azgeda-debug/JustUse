<template>
  <q-page class="q-pa-lg">
    <BmiForm />

    <q-separator class="q-mt-md" />

    <BmiHistoryButtons />

    <BmiResult />

    <BmiTable />

    <BmiChart />
  </q-page>
</template>

<script setup>
import BmiTable from "components/BmiCalculator/BmiTable.vue";
import BmiForm from "components/BmiCalculator/BmiForm.vue";
import BmiResult from "components/BmiCalculator/BmiResult.vue";
import BmiChart from "components/BmiCalculator/BmiChart.vue";
import BmiHistoryButtons from "components/BmiCalculator/BmiHistoryButtons.vue";
</script>
