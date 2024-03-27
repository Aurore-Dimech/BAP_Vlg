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
  padding: 25px;
  background-color: #CECECE;
  border-radius: 10px;
  text-decoration: none;
}

img {
  margin-left: 1px;
  
}

nav{
  display: flex;
  justify-content: space-between;
  width: 1379px;
height: 20px;
  color: #000;
text-align: center;
font-family: Inter;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: 120.833%;
text-decoration: none;
  
}

.deconnection{
    width: 120px;
    height: 30px;
    border-radius: 10px;
    border: none;
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #9F81A1;
    cursor: pointer;
}
</style>