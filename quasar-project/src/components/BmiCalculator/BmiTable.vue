<template>
  <div>
    <q-table
      title="BMI"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
const columns = [
  {
    name: "Underweight",
    align: "left",
    label: "Classification",
    field: "name",
  },
  {
    name: "Underweight",
    align: "left",
    label: "BMI",
    field: "content",
  },
];

const rows = [
  {
    name: "Underweight",
    content: "Below 18.5",
  },
  {
    name: "Normal",
    content: "18.5-24.9",
  },
  {
    name: "Overweight",
    content: "	25.0-29.9",
  },
  {
    name: "Obesity",
    content: "30 and above",
  },
  {
    name: "Class I",
    content: "30.0-34.9",
  },
  {
    name: "Class II",
    content: "35.0-39.9",
  },
  {
    name: "Class III",
    content: "40 and above",
  },
];
</script>