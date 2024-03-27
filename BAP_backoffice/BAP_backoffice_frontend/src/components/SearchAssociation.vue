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
 <div class="fond">
    <h1 id="Titre">Rechercher une association</h1>
    <div class="container">
        <div class="search-bar">
            <div>
                <button class="boutton-rechercher" @click="searchAssociation">Rechercher</button>
            </div>
            <div>
                <input class="search" type="text" placeholder="Rechercher par nom, représentant.e, catégorie, etc." v-model="searchInput">
            </div>
        </div>
    </div>

    <div class="container-modif">
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
                    <td class="boutons">
                        <router-link :to="{name:'EditAsso', params:{id: searched.id}}" class="modifier" >Modifier</router-link>
                        <button class="supprimer" @click="deleteAssociation(searched.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>
  
<style>


.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
    display: flex;
    align-items: center;
    gap:10px;
}

.a {
    text-decoration: none;
    color: black;
}

.search {
  display: grid;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(232, 232, 232, 0);
  border: 1px solid #424242;
  border-radius: 10px;
  color: white;
  width: 548.736px;
  height: 40px;
  margin: 10px 0;
  color: rgba(66, 66, 66, 0.70);
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.boutton-rechercher {
    width: 192.82px;
    height: 40px;
    border-radius: 10px;
    border: none;
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #9F81A1;
}

.container-modif {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.boutons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.modifier {
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

.supprimer {
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


</style>