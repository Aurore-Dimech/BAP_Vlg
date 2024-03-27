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
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/associations/create">Créer une association</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/associations/search">Rechercher une association</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/events/create">Créer un évènement</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/events/search">Rechercher un évènement</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/users/list" v-if="superadmin ==true">Liste d'utilisateurs</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <RouterLink to="/closed">Archives</RouterLink>
        <img src="./images/pipes.png" alt="pipes">
        <button class="deconnection" @click="disconnect">Se déconnecter</button>
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

header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 10px;
  background-color: #CECECE;
  border-radius: 23px;
  text-decoration: none;
  width: 165vh;
  height: 40px;
  color: inherit;
  
}

header a {
  color: inherit;
  text-decoration: none;
  font-family: Poppins;
}

img {
  margin-left: 1px;
}

nav{
  display: flex;
  justify-content: space-between;
  gap: 40px;
  color: #000;
  color: inherit;
  text-align: center;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  line-height: normal;
  
}

.deconnection {
  align-items: center;
  width: 130px;
  height: 25px;
  border-radius: 10px;
  border: none;
  background-color: #9F81A1;
  cursor: pointer;
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>