<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/createAsso">Créer une association</RouterLink>
        <RouterLink to="/searchAsso">Rechercher une association</RouterLink>
        <RouterLink to="/createEvent">Créer un évènement</RouterLink>
        <RouterLink to="/searchEvent">Rechercher un évènement</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>

<style scoped>

header{
  padding: 15px
}

nav{
  display: flex;
  justify-content: space-between;
}

</style>