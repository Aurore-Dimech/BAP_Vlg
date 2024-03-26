<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios"

export default {
        name:'App',

        components: {

        },

        data(){
          return{
            superadmin(){
              return false
            } 
          }
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
            this.verifyRole();
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
          },

          async verifyRole(){
            const response = await axios.get("http://localhost:3000/auth/connection", {headers: {'x-access-token' : this.token}});
            
            if (!response.data.error){
              this.superadmin = true
            }
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
        <RouterLink to="/users/list" v-if="superadmin ==true">Liste d'utilisateurs</RouterLink>
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