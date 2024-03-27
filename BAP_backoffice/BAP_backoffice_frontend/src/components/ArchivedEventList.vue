<script>
    import axios from "axios"

    
    export default {
        data(){
            return{
                events: []
            }
        },

        created(){
            this.getArchivedEvents();
        },

        methods:{
            async getArchivedEvents(){
                try {
                    const response = await axios.get("http://localhost:3000/events/archived");
                    this.events = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div>

        <table>

            <thead>
                <tr>
                    <th>Evenements</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="event in events" :key='event.id'>
                    <td>
                        <router-link :to="{name:'SingleEvent', params:{id: event.id}}"> {{ event.name }}</router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'EditEvent', params:{id: event.id}}" class="modifier">Modifier</router-link>
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