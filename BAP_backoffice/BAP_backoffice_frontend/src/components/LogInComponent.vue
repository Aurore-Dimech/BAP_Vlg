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
                const response = await axios.post("http://localhost:3000/auth/login", this.user);

                this.data = response.data

                if(!this.token && !this.data.error) {
                    try{
                        localStorage.setItem('token', this.data)
    
                        window.location.href = '/'
                    } catch(err){
                        console.log(err.response.data)
                    }
                }
            },

            async importUsers() {
                await axios.post('http://localhost:3000/auth/import', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    console.log("done")
                    // location.reload()
                })
            },

            verifyConnection() {
                if(this.token) {
                    this.$router.push('/')
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
                <input type="password" placeholder="Mot de passe" v-model="user.password">
            </div>
        </div>

        <div> <!---mot de passe perdu ?-->
            <button @click="logIn">Enregistrer</button>
        </div>

        <p class="error" v-if="data && data.error">{{ data.error }}</p>

    </div>

    <button @click="importUsers()">Importer</button>

</template>
  
<style>
.error{
    color : red;
}
</style>
  