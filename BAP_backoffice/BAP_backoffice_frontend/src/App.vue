<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
        name:'App',

        components: {

        },

        computed:{
                token(){
                  return localStorage.getItem('token')
                } 
        },

        watch: {
          '$route': function() {
            return this.token
          }
        },

        created: function(){
            this.verifyConnection();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                  this.$router.push('/login');
                }
            },
            disconnect(){
              localStorage.removeItem('token')
              location.reload()
            }
        }
    }


</script>

<template>

  <header>
    <div class="wrapper">
      <nav v-if="token">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/associations/create">Créer une association</RouterLink>
        <RouterLink to="/associations/search">Rechercher une association</RouterLink>
        <RouterLink to="/events/create">Créer un évènement</RouterLink>
        <RouterLink to="/events/search">Rechercher un évènement</RouterLink>
        <RouterLink to="/users/list">Liste d'utilisateurs</RouterLink>
        <RouterLink to="/closed">Archives</RouterLink>
        <button @click="disconnect">Se déconnecter</button>
      </nav>

      <nav v-else>
        <RouterLink to="/signup">Créer un compte</RouterLink>
        <RouterLink to="/login">Se connecter</RouterLink>
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