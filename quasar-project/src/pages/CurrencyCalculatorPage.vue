<template>
  <q-page class="q-pa-sm">
    <q-form
      class="q-gutter-md"
      style="margin: 0 auto"
      :style="$q.screen.width <= 600 ? 'max-width: 90%;' : 'max-width: 60%;'"
    >
      <q-select
        outlined
        rounded
        dense
        :options="currencyCalculatorStore.options"
        v-model="currencyCalculatorStore.formData.baseCurrency"
        label="Select Currency"
      />
      <q-select
        outlined
        rounded
        dense
        :options="currencyCalculatorStore.options"
        v-model="currencyCalculatorStore.formData.targetCurrency"
        label="Select Currency"
      />

      <q-input
        outlined
        rounded
        dense
        v-model="currencyCalculatorStore.formData.amount"
        placeholder="Amount"
        type="number"
        min="0.1"
        step="0.1"
      />
      <div
        class="flex items-center"
        :class="
          currencyCalculatorStore.conversionRate
            ? 'justify-between'
            : 'justify-end'
        "
      >
        <div v-show="currencyCalculatorStore.conversion">
          <div class="text-h6">
            {{ currencyCalculatorStore.formData.amount }}
            {{ currencyCalculatorStore.formData.baseCurrency[0] }} is
            {{ currencyCalculatorStore.conversion }}
            {{ currencyCalculatorStore.formData.targetCurrency[0] }}
          </div>
          <div class="text-caption text-grey">
            1 {{ currencyCalculatorStore.formData.baseCurrency[0] }} is
            {{ currencyCalculatorStore.conversionRate }}
            {{ currencyCalculatorStore.formData.targetCurrency[0] }}
          </div>
        </div>

        <q-btn
          @click.prevent="handleForm"
          no-caps
          label="Calculate"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useCurrencyCalculatorStore } from "stores/CurrencyCalculator";

const currencyCalculatorStore = useCurrencyCalculatorStore();

const handleForm = () => {
  currencyCalculatorStore.getExchange();
};

onMounted(() => {
  currencyCalculatorStore.getSupportedCodes();
});
</script>

<q-btn
no-caps
v-close-popup
class="bg-red-6 text-white"
padding="6px 30px"
label="Close"
/>
<q-btn
@click="shoppingListStore.addNewProduct"
no-caps
v-close-popup
class="bg-primary text-white"
padding="6px 30px"
label="Add Store"
/>