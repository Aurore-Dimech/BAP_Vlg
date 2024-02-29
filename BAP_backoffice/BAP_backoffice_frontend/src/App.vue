<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/create">Créer une association</RouterLink>
        <RouterLink to="/search">Rechercher une association</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>

<style scoped>

header{
  padding: 15px 200px;
}

nav{
  display: flex;
  justify-content: space-between;
}

</style>