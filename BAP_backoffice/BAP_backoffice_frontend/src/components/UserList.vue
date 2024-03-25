<script>
    import axios from "axios"

    
    export default {
        data(){
            return{
                users: [],
                token: localStorage.getItem('token')
            }
        },

        created(){
            this.getUsers();
        },

        methods:{
            async getUsers(){
                try {
                    const response = await axios({
                        method: 'get',
                        url: "http://localhost:3000/auth",
                        headers: {'x-access-token' : this.token}
                    })
                    if (response.data.error){
                        this.$router.push({name: 'Login'})
                    } else {
                        this.users = response.data
                    }
                } catch(err) {
                    console.log(err)
                }
            },

            async deleteUser(id){
                try{
                    await axios.delete(`http://localhost:3000/users/${id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    })
                    this.getUsers()
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<template>

    <div>

        <table>

            <thead>
                <tr>
                    <th>Utilisateurs</th>
                    <th>Role</th>
                    <th>Vérification</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key='user.id'>
                    <td>
                        <router-link :to="{name:'SingleUser', params:{id: user.id}}"> {{ user.email }}</router-link>
                    </td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.verified }}</td>
                    <td>
                        <router-link :to="{name:'EditUser', params:{id: user.id}}">Modifier</router-link>
                        <button @click="deleteUser(user.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>


</template>

<style scoped lang="scss">

#newAsso{
    position: fixed;
    background-color: gray;
    height: 50px;
    width: 50px;
    bottom: 15%;
    right: 10%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    text-decoration: none;
    color: white;
}
table{
    width: 100vw;

    tr{
        display: flex;
        justify-content: space-evenly;

        th{
            padding: 1% 5%;
            border: 1px solid grey;
        }
    }
}

    #map {
        height: 700px;
        width: 700px;
        margin: 0 auto;
    }
</style>