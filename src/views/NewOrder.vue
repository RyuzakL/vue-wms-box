<script setup>
import AddBox from "@/components/AddBox.vue";
import RefCommand from "@/components/RefCommand.vue";
import Validate from "@/components/ValidateOrder.vue";
import AddClientSite from "../components/AddClientSite.vue";
</script>

<template>
  <h1 class="margin-btm margin-top">Nouvelle commande</h1>
  <AddClientSite />
  <RefCommand />
  <AddBox />
  <Validate />
</template>
