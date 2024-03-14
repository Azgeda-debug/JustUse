<template>
  <div>
    <q-form
      class="q-gutter-md"
      style="margin: 0 auto"
      :style="$q.screen.width <= 600 ? 'max-width: 90%;' : 'max-width: 60%;'"
    >
      <q-select
        outlined
        dense
        rounded
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
        rounded
        dense
        :options="months"
        v-model="expenseCalculatorStore.formData.month"
        label="Select month"
      />

      <q-input
        v-if="expenseCalculatorStore.formData.selectedOption === 'Weekly'"
        outlined
        dense
        rounded
        min="1"
        max="5"
        type="number"
        v-model="expenseCalculatorStore.formData.weekOfMonth"
        placeholder="Week of the month"
      />

      <q-input
        v-if="expenseCalculatorStore.formData.selectedOption"
        outlined
        rounded
        dense
        min="1"
        type="number"
        v-model="expenseCalculatorStore.formData.year"
        placeholder="Year"
      />

      <q-input
        outlined
        rounded
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
          label="Add"
          type="submit"
          class="bg-primary text-white"
          padding="6px 30px"
          no-caps
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
  if (!expenseCalculatorStore.formData.selectedOption) {
    $q.notify({
      type: "negative",
      message: "Select Period",
    });

    return;
  }

  switch (expenseCalculatorStore.formData.selectedOption) {
    case "Weekly":
      if (
        !expenseCalculatorStore.formData.weekOfMonth ||
        !expenseCalculatorStore.formData.expense
      ) {
        $q.notify({
          type: "negative",
          message: "Fill in all fields",
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
          message: "Fill in all fields",
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
          message: "Fill in all fields",
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
  