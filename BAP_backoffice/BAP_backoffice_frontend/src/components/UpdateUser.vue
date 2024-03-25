<script>
    import axios from "axios"

    export default {
        data(){
            return{
                user: {
                    email: "",
                    password : "",
                    role: "",
                    verified: false,
                }, 
                token: localStorage.getItem('token'),
            }
        },

        created: function(){
            this.getUserById();
        },

        methods:{
            async getUserById(){
                try{
                     const response = await axios({
                        method: 'get',
                        url: `http://localhost:3000/auth/${this.$route.params.id}`,
                        headers: {'x-access-token' : this.token}
                    })
                        
                    this.user = {
                        email: response.data.email,
                        password : response.data.password,
                        role: response.data.role,
                        verified: response.data.verified,
                    }

                } catch(err){
                    console.log(err)
                }
            },

            async updateUser(){
                try{
                    const boolString = document.querySelector("#verified").value
                    const boolean = (/true/).test(boolString)
                    this.user.verified = boolean

                    await axios.patch(`http://localhost:3000/auth/update/${this.$route.params.id}`, this.user, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });

                    const response = await axios.get(`http://localhost:3000/auth/${this.$route.params.id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });
                    
                    this.user = {
                        email: response.data.email,
                        password : response.data.password,
                        role: response.data.role,
                        verified: response.data.verified,
                    }

                    window.alert("Utilisateur mis à jour !")
                } catch(err){
                    console.log(err.response.data)
                }
            },
        }
    }

</script>

<template>
    <div>

        <div>
            <div>
                <label>Modifier le profil</label>
                <div>
                    <input type="email" name="email" placeholder="Adresse mail" v-model="user.email">
                    <p class="error" v-if="user.email.length <= 0">Champ obligatoire</p>
                    <input type="password" name="password" placeholder="Mot de passe" v-model="user.password">
                    <select name="role" id="role" v-model="user.role">
                        <option value="En attente">En attente</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                    </select>
                    <select name="verified" id="verified" v-model="user.verified">
                        <option value="" disabled selected>Etats</option>
                        <option value="false">refusé</option>
                        <option value="true">vérifié</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <button @click="updateUser">Enregistrer</button>
        </div>
        
    </div>

</template>
  
<style>
  
</style>
  