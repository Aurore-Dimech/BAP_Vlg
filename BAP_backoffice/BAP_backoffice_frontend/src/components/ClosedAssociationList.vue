<script>
    import axios from "axios"

    
    export default {
        data(){
            return{
                associations: []
            }
        },

        created(){
            this.getClosedAssos();
        },

        methods:{
            async getClosedAssos(){
                try {
                    const response = await axios.get("http://localhost:3000/associations/deleted");
                    this.associations = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div class="fond">

        <table>

            <thead>
                <tr>
                    <th>Association</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="association in associations" :key='association.id'>
                    <td>
                        <router-link :to="{name:'SingleAsso', params:{id: association.id}}"> {{ association.name }}</router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'EditAsso', params:{id: association.id}}" class="modifier">Modifier</router-link>
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
            
        }
    }
}

    #map {
        height: 700px;
        width: 700px;
        margin: 0 auto;
    }
</style>