<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>

<style>
.big {
  font-size: 1.1rem;
  font-weight: 600;
}

.container {
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
}

.log-message {
  color: blue;
  font-weight: 600;
}

.margin-btm {
  margin-bottom: 0.5rem;
}

.margin-top {
  margin-top: 1rem;
}

.btn-validate {
  margin-top: 1rem;
  color: white;
  background-color: rgb(58, 58, 209);
  border: none;
  border-radius: 6px;
  letter-spacing: 1px;
}

.error-msg {
  color: red;
  font-weight: 700;
}

input {
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  border: none;
  filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.1));
}

input:focus {
  outline: none;
  outline: 1px solid rgba(0, 0, 0, 0.178);
}

button {
  padding: 0.5rem 1rem;
}
</style>

