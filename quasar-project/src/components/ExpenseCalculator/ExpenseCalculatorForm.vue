<template>
  <div>
    <q-form
      class="q-gutter-md"
      style="margin: 0 auto"
      :style="$q.screen.width <= 600 ? 'max-width: 80%;' : 'max-width: 60%;'"
    >
      <q-select
        outlined
        dense
        :options="options"
        v-model="expenseCalculatorStore.formData.selectedOption"
        label="Select period"
      />

      <q-select
        v-if="
          expenseCalculatorStore.formData.selectedOption === 'Monthly' ||
          expenseCalculatorStore.formData.selectedOption === 'Weekly'
        "
        outlined
        dense
        :options="months"
        v-model="expenseCalculatorStore.formData.month"
        label="Select month"
      />

      <q-input
        v-if="expenseCalculatorStore.formData.selectedOption === 'Weekly'"
        outlined
        dense
        min="1"
        max="5"
        type="number"
        v-model="expenseCalculatorStore.formData.weekOfMonth"
        placeholder="Week of the month"
      />

      <q-input
        v-if="expenseCalculatorStore.formData.selectedOption"
        outlined
        dense
        min="1"
        type="number"
        v-model="expenseCalculatorStore.formData.year"
        placeholder="Year"
      />

      <q-input
        outlined
        dense
        min="1"
        type="number"
        v-model="expenseCalculatorStore.formData.expense"
        placeholder="Expense"
        suffix="$"
      />

      <div class="flex justify-end col q-gutter-x-md">
        <q-btn
          @click="checkCharts"
          flat
          rounded
          dense
          color="primary"
          icon="bar_chart"
        />
        <q-btn
          @click.prevent="handleForm"
          label="Submit"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>

    <ExpensesCharts />
  </div>
</template>
  
  <script setup>
import { useExpenseCalculatorStore } from "stores/ExpenseCalculatorStore";
import { useQuasar } from "quasar";
import ExpensesCharts from "components/ExpenseCalculator/ExpensesCharts";

const $q = useQuasar();

const expenseCalculatorStore = useExpenseCalculatorStore();

const options = ["Weekly", "Monthly", "Yearly"];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const handleForm = () => {
  switch (expenseCalculatorStore.formData.selectedOption) {
    case "Weekly":
      if (
        !expenseCalculatorStore.formData.weekOfMonth ||
        !expenseCalculatorStore.formData.expense
      ) {
        $q.notify({
          type: "negative",
          message: "Please fill in all fields",
        });
        return;
      }

      if (expenseCalculatorStore.formData.weekOfMonth > 7) {
        $q.notify({
          type: "negative",
          message: "Invalid week number",
        });
        return;
      }
      break;
    case "Monthly":
      if (
        !expenseCalculatorStore.formData.month ||
        !expenseCalculatorStore.formData.expense
      ) {
        $q.notify({
          type: "negative",
          message: "Please fill in all fields",
        });
        return;
      }

      if (expenseCalculatorStore.formData.month > 12) {
        $q.notify({
          type: "negative",
          message: "Invalid month number",
        });
        return;
      }
      break;
    case "Yearly":
      if (
        !expenseCalculatorStore.formData.year ||
        !expenseCalculatorStore.formData.expense
      ) {
        $q.notify({
          type: "negative",
          message: "Please fill in all fields",
        });
        return;
      }
      break;
  }

  expenseCalculatorStore.firebaseSetData();
};

const checkCharts = () => {
  expenseCalculatorStore.firebaseCheckCharts();
};
</script>
  