<script>
    import axios from "axios"

    export default {
        data(){
            return{
                search:[],
                searchInput: '',
            }
        },

        methods:{
            
            async searchAssociation(){
                try {
                    this.search = []
                    let response = await axios.get(`http://localhost:3000/associations/search/${this.searchInput}`)
                    this.search = response.data
                    this.searchInput= ''
                } catch(err) {
                    console.log(err)
                }
            },

            async deleteAssociation(id){
                try{
                    await axios.delete(
                        `http://localhost:3000/associations/${id}`
                    )
                    this.getAssociations()
                }catch(err){
                    console.log(err)
                }
            }
        },
    }
</script>

<template>
        <div>
            <div>
                <input type="text" placeholder="Rechercher par nom, représentant.e, catégorie, etc." v-model="searchInput">
            </div>

            <div>
                <button @click="searchAssociation">Rechercher</button>
            </div>
        
        </div>

    <div>
        <table>

            <thead>
                <tr>
                    <th>Association</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="searched in search" :key='searched.id'>
                    <td>
                        <router-link :to="{name:'SingleAsso', params:{id: searched.id}}">{{ searched.name }}</router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'Edit', params:{id: searched.id}}">Modifier</router-link>
                        <button @click="deleteAssociation(searched.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>


</template>
  
<style>
  
</style>
  