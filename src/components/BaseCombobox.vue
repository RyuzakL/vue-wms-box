<script setup>
import { computed } from "vue";

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

const props = defineProps({
  options: Array,
  modelValue: String,
  placeholder: {
    type: String,
    default: "Select option",
  },
  emptyPlaceholder: String,
  propertyToDisplay: String,
  query: String,
});

const emit = defineEmits(["update:modelValue", "update:queryValue"]);

const filteredOptions = computed(() =>
  props.query === ""
    ? props.options
    : props.options.filter((option) => {
        return option[props.propertyToDisplay]
          .toLowerCase()
          .includes(props.query.toLowerCase());
      })
);

const updateDisplayValue = (option) => {
  if (Object.keys(option).length === 0) return "";
  return option[props.propertyToDisplay]
    ? option[props.propertyToDisplay]
    : option;
  // si jamais la valeur passé dans le v-model n'est pas un objet
};
</script>

<template>
  <Combobox
    @update:model-value="(value) => emit('update:modelValue', value)"
    :model-value="props.modelValue"
  >
    <ComboboxInput
      :placeholder="props.placeholder"
      @change="emit('update:queryValue', $event.target.value)"
      :displayValue="updateDisplayValue"
      class="margin-btm"
    />
    <ComboboxOptions class="z-10 container-display-options">
      <ComboboxOption
        class="option"
        v-for="(option, index) in filteredOptions"
        :key="index"
        :value="option[props.propertyToDisplay]"
      >
        <span>{{ option[props.propertyToDisplay] }}</span>
      </ComboboxOption>
      <span v-if="filteredOptions.length === 0 && props.query !== ''">
        {{ props.emptyPlaceholder }}
      </span>
    </ComboboxOptions>
  </Combobox>
</template>

<style>
.z-10 {
  z-index: 10;
}

.container-display-options {
  list-style-type: none;
  background-color: white;
  width: 150px;
  padding: 1rem;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: scroll;
}

.option + .option {
  margin-top: 0.3rem;
  cursor: pointer;
}
</style>
