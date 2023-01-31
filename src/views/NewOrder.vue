<script setup>
import AddBox from "@/components/AddBox.vue";
import RefCommand from "@/components/RefCommand.vue";
import Validate from "@/components/ValidateOrder.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import AddClientSite from "../components/AddClientSite.vue";

const router = useRouter();
const store = useStore();
const isUserLogged = computed(() => store.state.user.isUserLogged);
const isCommandRegistered = computed(() => store.state.isCommandRegistered);

onMounted(() => {
  if (!isUserLogged.value) router.push({ name: "login" });
});
</script>

<template>
  <div v-if="!isCommandRegistered">
    <h1 class="margin-btm margin-top">Nouvelle commande</h1>
    <AddClientSite />
    <RefCommand />
    <AddBox />
  </div>
  <Validate />
</template>
