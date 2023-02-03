<script setup>
import fetchHelper from "@/helper/fetchHelper.js";
import BaseCombobox from "@/components/BaseCombobox.vue";
import { watch, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.state.userModule.user);
const siteClient = computed({
  get: () => store.state.siteClient,
  set: (newSiteClient) => {
    store.dispatch("updateSiteClient", newSiteClient);
  },
});

const siteClientsArr = ref([]);
const inputQuery = ref("");

watch(inputQuery, async () => {
  if (!inputQuery.value) return;
  const res = await fetchHelper.getSiteClients(inputQuery.value);
  const data = await res.data.values;
  siteClientsArr.value = data;
  // modifier la fonction de manière à garder les résultats en caches
  // sans doublon*
});

const updateInput = (newInput) => (inputQuery.value = newInput);
</script>

<template>
  <div class="margin-btm">Ajouter site client</div>
  <div>
    <BaseCombobox v-model="siteClient" :options="siteClientsArr" placeholder="Site Client"
      :emptyPlaceholder="'Aucun site Client'" :propertyToDisplay="'siteCode'" :query="inputQuery"
      @update:queryValue="updateInput" />
  </div>
</template>

