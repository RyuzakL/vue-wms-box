<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import fetchHelper from "@/helper/fetchHelper.js";

const router = useRouter();
const store = useStore();
const user = computed(() => store.state.userModule.user);

onMounted(() => {
  if (user.value.isLogged) router.push({ name: "new-order" });
});

const errorMessage = ref("");

const userInput = ref({
  username: "",
  password: "",
  domain: "",
});

const boxsInput = ref("");

async function onSubmit() {
  try {
    const res = await fetchHelper.getSiteClients(
      "",
      userInput.value.domain,
      userInput.value.username,
      userInput.value.password
    );

    if (res.status !== 200) return;
    store.dispatch("userModule/setUser", {
      ...userInput.value,
      isLogged: true,
    });
    setBoxs();
    router.push({ name: "new-order" });
  } catch (err) {
    console.log(err);
    errorMessage.value = err.message;
  }
}

function setBoxs() {
  store.dispatch("setBoxs", transformInputBoxs());
}
function transformInputBoxs() {
  if (!boxsInput.value) throw new Error("Veuillez insérer des boxs");

  const lines = boxsInput.value.split("\n");
  const obj = {};
  try {
    lines.forEach((line) => {
      const [parentSku, childSku, qty] = line.split("\t");
      if (!obj[parentSku]) {
        obj[parentSku] = { sku: parentSku, childs: [] };
      }
      obj[parentSku].childs.push({ sku: childSku.trim(), qty: parseInt(qty) });
    });
    delete obj["REF BOX"];
    return Object.values(obj);
  } catch (err) {
    throw new Error("Veuillez insérer des box valides");
  }
}
</script>

<template>
  <div class="container-loggin margin-btm">
    <h2 class="margin-btm">Login</h2>
    <p class="margin-btm">
      Veuillez vous connectez et rentrer l'URL de l'entrepot avant d'ajouter une
      commande.
    </p>
    <form class="container-input" @submit.prevent="onSubmit">
      <input
        v-model.trim="userInput.username"
        type="text"
        placeholder="identifiant"
      />
      <input
        v-model.trim="userInput.password"
        type="password"
        placeholder="mot de passe"
      />
      <input v-model.trim="userInput.domain" type="text" placeholder="domain" />
      <textarea
        v-model.trim="boxsInput"
        cols="30"
        rows="10"
        placeholder="Ajoutez box ici"
      />
      <button submit>Se connecter</button>
      <div class="error-msg">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  margin-bottom: 2rem;
}

.user {
  font-size: 0.9rem;
  font-style: italic;
}
</style>
