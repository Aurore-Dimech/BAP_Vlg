<script>
    import axios from "axios"

    export default {
        data(){
            return{
                user: {
                    email: "",
                    password : "",
                    role: "",
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
                        role: response.data.role,
                    }

                } catch(err){
                    console.log(err)
                }
            },

            async updateUser(){
                try{
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
                        role: response.data.role,
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
                        <option value="en attente">En attente</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
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
  