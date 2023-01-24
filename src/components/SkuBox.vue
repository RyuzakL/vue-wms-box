<script setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const selectedPerson = ref(people[0]);
const query = ref("");

const filteredPeople = computed(() =>
  query.value === ""
    ? people
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase());
      })
);
</script>

<template>
  <span> Ajouter sku => </span>
  <Combobox v-model="selectedPerson">
    <ComboboxInput
      @change="query = $event.target.value"
      :displayValue="(person) => person.name"
    />
    <ComboboxOptions class="container-options">
      <ComboboxOption
        v-for="person in filteredPeople"
        :key="person.id"
        :value="person"
        :disabled="person.unavailable"
      >
        {{ person.name }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>

<style scoped>
li {
  list-style: none;
}

.container-options {
  background-color: white;
  width: 40%;
}
</style>
