<script>
    import axios from "axios"

    export default {
        data(){
            return{   
                user: {
                    email: "",
                    password: "",
                },

                token: localStorage.getItem('token'),
                data: null
            }
        },

        created(){
            this.verifyConnection();
        },

        methods:{
            async logIn(){
                // event.preventDefault()
                const response = await axios.post("http://localhost:3000/auth/login", this.user);

                this.data = response.data
                console.log(this.data)

                if(!this.token && !this.data.error) {
                    try{
                        localStorage.setItem('token', this.data)
                        window.location.href = '/'
                        
                    } catch(err){
                        console.log(err.response.data)
                    }
                }
            },
            verifyConnection() {
                if (this.token) {
                    this.$router.push('/');
                }
            }

            
        }
    }
</script>

<template>
    <form @submit.prevent="logIn"> 
      <div class="form">
          <h1 id="Titre">Se connecter</h1>
              <div class="inputs">
                  <input type="email" class="input-email" placeholder="Adresse mail" v-model="user.email">
                  <input type="password" class="input-password" placeholder="Mot de passe" v-model="user.password">
              </div>
              <div> <!---mot de passe perdu ?-->
              <button class="button-connecter">Se connecter</button>
          </div>
      </div>
    </form>
  </template>
    
  <style>
  
  .error{
      color : red;
  }
  
  .inputs {
      display: grid;
      justify-content: center;
  }
  
  .input-email, .input-password{
      background-color: rgba(232, 232, 232, 0);
    border: 1px solid black;
    border-radius: 10px;
    color: #424242B2;
    width: 295px;
    height: 52px;
    margin: 10px 0;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    margin-left: 20px;
  }
  
  .button-connecter {
    width: 375.522px;
    height: 60.083px;
    background: #60E886; 
    border-radius: 11px;
    color: black;
    font-size: 24px;
    font-family: Poppins;
    font-weight: 600;
    border: none;
    cursor: pointer;
  
  }
  
  .form{
      align-content: center;
      border-radius: 34px;
      background: #CECECE;
      width: 475px;
      height: 53px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      width: 475px;
      height: 531px;
  }
  </style>
    