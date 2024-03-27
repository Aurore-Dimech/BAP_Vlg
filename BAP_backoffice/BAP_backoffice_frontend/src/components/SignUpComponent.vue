<script>
    import axios from "axios"

    export default {
        data(){
            return{   
                user: {
                    email: "",
                    password: "",
                }             
            }
        },

        methods:{
            async signUp(){
                try{
                    await axios.post("http://localhost:3000/auth/signup", this.user);
                        
                    this.user = {
                        email: "",
                        password: "",
                    }
                } catch(err){
                    console.log(err.response.data)
                }
            }
        }
    }
</script>

<template>

    <div>
         <div class="form">
                <h1 id="Titre">Crée un compte</h1>
            <div class="inputs">
                <input type="email" class="input-email" placeholder="Adresse mail" v-model="user.email">
                <input type="password" class="input-password" placeholder="Mot de passe" v-model="user.password">
                
            </div>
            <div> <!---mot de passe perdu ?-->
                 <button class="button-enregistrer" @click="signUp">Enregistrer</button>
            </div>
        </div>
    </div>

</template>
  
<style>

.error{
    color : red;
}
.inputs{
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
  
}

.button-enregistrer {
    width: 375.522px;
    height: 60.083px;
    background: #60E886; 
    border-radius: 11px;
    color: black;
    font-size: 24px;
    font-family: Poppins;
    font-weight: 600;
    border: none;
    margin-top: 20px;
    cursor: pointer;

}

.form {
    display: grid;
    justify-content: center;
    align-content: center;
    gap: 20px;
    margin-top: 50px;
    font-family: Poppins;
}
</style>
  