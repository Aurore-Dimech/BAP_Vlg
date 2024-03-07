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

        <div>
            <label>S'enregistrer</label>
            <div>
                <input type="email" name="email" placeholder="Adresse mail" v-model="user.email">
                <p class="error" v-if="user.email.length <= 0">Champ obligatoire</p>
                <input type="password" name="password" placeholder="Mot de passe" v-model="user.password">
            </div>
        </div>

        <div> <!---mot de passe perdu ?-->
            <button @click="signUp">Enregistrer</button>
        </div>

    </div>

</template>
  
<style>
.error{
    color : red;
}
</style>
  