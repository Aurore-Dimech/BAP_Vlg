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
                    await axios.delete(`http://localhost:3000/auth/${id}`, {
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
<div class="fond">
    <div class="title">
        <h1 id="Titre">Liste des utilisateurs</h1>
    </div>
    <div>
      
        <table>

            <thead>
                <tr>
                    <th>Utilisateurs</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key='user.id'>
                    <td>
                        <router-link :to="{name:'SingleUser', params:{id: user.id}}"> {{ user.email }}</router-link>
                    </td>
                    <td>{{ user.role }}</td>
                    <td>
                        <router-link :to="{name:'EditUser', params:{id: user.id}}" class="boutton-modifier">Modifier</router-link>
                        <button class="boutton-supprimer" @click="deleteUser(user.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>
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

   
    tr {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    gap: 10px;
    padding: 1% 0;
}


th {
    padding: 1% 5%;
    margin-right: 150px;
}

td {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-left: -150px;
    
    
}
}

    #map {
        height: 700px;
        width: 700px;
        margin: 0 auto;
    }



.boutton-supprimer {
    width: 166.156px;
    height: 36.377px;
    border-radius: 11px;
    border: none;
    background: #FF5D5D;
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;

}

.boutton-modifier {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 166.156px;
    height: 36.377px;
    border-radius: 11px;
    border: none;
    background: #60E886;
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration: none;
}
</style>