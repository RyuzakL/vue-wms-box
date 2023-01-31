<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isUserLogged = computed(() => store.state.user.isUserLogged);

onMounted(() => {
  if (isUserLogged.value) router.push({ name: "new-order" });
});

const errorMessage = ref("");
const userToMatch = reactive({
  id: "foo",
  password: "foo",
  URL: "foo.com",
});
const user = reactive({
  id: "",
  password: "",
  URL: "",
});

function onSubmit() {
  if (JSON.stringify(user) === JSON.stringify(userToMatch)) {
    store.dispatch("user/logUser", true);
    router.push({ name: "new-order" });
  } else {
    errorMessage.value = "veuillez entrer des identifiants valides";
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
    <div class="error-msg">{{ errorMessage }}</div>
    <form class="container-input" @submit.prevent="onSubmit">
      <input v-model.trim="user.id" type="text" placeholder="identifiant" />
      <input
        v-model.trim="user.password"
        type="text"
        placeholder="mot de passe"
      />
      <input v-model.trim="user.URL" type="text" placeholder="url" />
      <button submit>Se connecter</button>
    </form>
    <span class="user"
      >(ID : {{ userToMatch.id }} | MDP : {{ userToMatch.password }} | URL :
      {{ userToMatch.URL }} )</span
    >
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

.error-msg {
  color: red;
  font-weight: 700;
}
</style>
