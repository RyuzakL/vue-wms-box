<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import fetchHelper from "@/helper/fetchHelper.js";

const router = useRouter();
const store = useStore();

const user = computed(() => store.state.user);
console.log(user.value);

onMounted(() => {
  if (user.value.isUserLogged) router.push({ name: "new-order" });
});

const errorMessage = ref("");

const userInput = reactive({
  username: "",
  password: "",
  domain: "",
});

async function onSubmit() {
  try {
    const res = await fetchHelper.getSiteClients(
      "",
      "wms.parcelontime.es",
      userInput.username,
      userInput.password
    );
    if (res.status !== 200) return;
    store.dispatch("user/logUser", true);
    store.dispatch("user/setPassword", userInput.password);
    store.dispatch("user/setUsername", userInput.username);
    store.dispatch("user/setDomain", userInput.domain);
    router.push({ name: "new-order" });
  } catch (err) {
    errorMessage.value = "il y a eu une erreur lors de la connexion";
  }

  // if (JSON.stringify(user) === JSON.stringify(userToMatch)) {
  //   store.dispatch("user/logUser", true);
  //   router.push({ name: "new-order" });
  // } else {
  //   errorMessage.value = "veuillez entrer des identifiants valides";
  // }
}
</script>

<template>
  <div class="container-loggin margin-btm">
    <h2 class="margin-btm">Login</h2>
    <p class="margin-btm">
      Veuillez vous connectez et rentrer l'URL de l'entrepot avant d'ajouter une
      commande.
    </p>
    <div class="error-msg">{{ errorMessage }}</div>
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
      <button submit>Se connecter</button>
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
