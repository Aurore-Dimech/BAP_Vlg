<script>
    import axios from "axios"

    export default {
        data(){
            return{   
                user: {
                    email: "",
                    password: "",

                    data: null
                }             
            }
        },

        methods:{
            async logIn(){
                try{
                    const response = await axios.post("http://localhost:3000/auth/login", this.user);
                    this.data = response.data
                    console.log(this.data)
                    localStorage.setItem('token', this.data)
                        
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
            <label>Se connecter</label>
            <div>
                <input type="email" placeholder="Adresse mail" v-model="user.email">
                <p class="error" v-if="user.email.length <= 0">Champ obligatoire</p>
                <input type="password" placeholder="Mot de passe" v-model="user.password">
            </div>
        </div>

        <div> <!---mot de passe perdu ?-->
            <button @click="logIn">Enregistrer</button>
        </div>

    </div>

</template>
  
<style>
.error{
    color : red;
}
</style>
  