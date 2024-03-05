<template>
  <q-dialog v-model="expenseCalculatorStore.showExpensesCharts">
    <q-card
      :style="$q.screen.width <= 500 ? 'min-width: 80%;' : 'min-width: 500px'"
    >
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="weekly" label="Weekly" />
        <q-tab name="monthly" label="Monthly" />
        <q-tab name="yearly" label="Yearly" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="weekly">
          <div class="text-h6">Weekly Expenses</div>
          <column-chart
            v-show="expenseCalculatorStore.weeklyExpenses"
            suffix="$"
            thousands=","
            empty="No data"
            :data="expenseCalculatorStore.weeklyExpenses"
          ></column-chart>
        </q-tab-panel>

        <q-tab-panel name="monthly">
          <div class="text-h6">Monthly Expenses</div>
          <column-chart
            v-show="expenseCalculatorStore.monthlyExpenses"
            suffix="$"
            thousands=","
            empty="No data"
            :data="expenseCalculatorStore.monthlyExpenses"
          ></column-chart>
        </q-tab-panel>

        <q-tab-panel name="yearly">
          <div class="text-h6">Yearly Expenses</div>
          <column-chart
            v-show="expenseCalculatorStore.yearlyExpenses"
            suffix="$"
            thousands=","
            empty="No data"
            :data="expenseCalculatorStore.yearlyExpenses"
          ></column-chart>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
  
  <script setup>
import { ref } from "vue";
import { useExpenseCalculatorStore } from "stores/ExpenseCalculatorStore";
import { useQuasar } from "quasar";

const $q = useQuasar();

const tab = ref("weekly");

const expenseCalculatorStore = useExpenseCalculatorStore();
</script>
  