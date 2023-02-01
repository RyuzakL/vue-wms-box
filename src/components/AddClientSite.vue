<script setup>
import fetchHelper from "@/helper/fetchHelper.js";
import BaseCombobox from "@/components/BaseCombobox.vue";
import { watch, ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => store.state.userModule.user);
const siteClient = computed({
  get: () => store.state.siteClient,
  set: (newSiteClientCode) => {
    const newSiteClient = siteClientsArr.value.find(
      (siteClient) => newSiteClientCode === siteClient.siteCode
    );
    store.dispatch("updateSiteClient", newSiteClient);
    // chope l'object site client basé sur la string de l'input qui est un site code
  },
});

const siteClientsArr = ref([]);
const input = ref("");

watch(input, async () => {
  if (!input.value) return;
  const res = await fetchHelper.getSiteClients(
    input.value,
    user.value.domain,
    user.value.username,
    user.value.password
  );
  const data = await res.data.values;
  siteClientsArr.value = data;
});

const updateInput = (newInput) => (input.value = newInput);
</script>

<template>
  <div class="margin-btm">Ajouter site client</div>
  <div>
    <BaseCombobox
      v-model="siteClient"
      :options="siteClientsArr"
      placeholder="Site Client"
      :emptyPlaceholder="'Aucun site Client'"
      :propertyToDisplay="'siteCode'"
      :query="input"
      @update:queryValue="updateInput"
    />
  </div>
</template>

<!-- MAP vs Set -->
<!-- Faire une fonction qui stocke les valeurs sans doublons -->
<!-- marche bien pour l'instant mais peut stocker des doublons -->
<!-- voir si map serait pas mieux -->
<!-- demander à chat gpt -->

<!-- ---- -->

<!-- const siteClientsSet = ref(new Set());
const cacheInput = new Set();
});watch(siteClientsInput, async (input) => {
  if (cacheInput.has(input) || !input) return;
  cacheInput.add(input);
  console.log(cacheInput);

  const res = await fetchHelper.getSiteClients(input);
  const data = await res.data.values;
  if (data.length === 0) return;

  console.log(data);
  data.forEach((value) => {
    if (siteClientsSet.value.has(value)) return;
    siteClientsSet.value.set(value.siteCode, value);
  });

  console.log(siteClientsSet.value);
 }); -->
