<script>
    import axios from "axios"

    export default {
        data(){
            return{   
                event: {
                    name: "",
                    start_date : "",
                    end_date: "",
                    id_association: "",
                    address: "",
                    complement_address: "",
                    town: "",
                    postal_code: "",
                    longitude: "",
                    latitude: "",
                    archived: false
                },
                associations : []             
            }
        },

        created(){
            this.getAssociations();
        },

        methods:{
            async saveEvent(){
                try{
                    const boolString = document.querySelector("#archived").value
                    const boolean = (/true/).test(boolString)
                    this.event.archived = boolean

                    await axios.post("http://localhost:3000/events", this.event)
                    .then (response => {
                        this.event = {
                            name: "",
                            start_date : "",
                            end_date: "",
                            id_association: "",
                            address: "",
                            complement_address: "",
                            town: "",
                            postal_code: "",
                            longitude: "",
                            latitude: "",
                            archived: false
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    });
                } catch(err){
                    console.log(err.response.data)
                }
            },
            async getAssociations(){
                try {
                    const response = await axios.get("http://localhost:3000/associations");
                    this.associations = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div class="fond2">

        <div>
            <h1 id="Titre">Crée un évènement</h1>
            <label class="sous-titre ">Evènement</label>
            <div class="form-group1">
                <input class="form-control" type="text" placeholder="Nom de l'évènement" v-model="event.name">
            </div>
            <div class="form-group6">
                <input class="form-control" type="datetime-local" placeholder="Date et heure de début" v-model="event.start_date">
                <select class="select" name="associations" id="associations" v-model="event.id_association">
                    <option value="" disabled selected>Association</option>
                    <option v-for="association in associations" :value="association.id">{{ association.name }}</option>
                </select>
                <select class="select" name="archived" id="archived" v-model="event.archived">
                    <option value="" disabled selected>Archivé</option>
                    <option value="false">En cours</option>
                    <option value="true">Archivé</option>
                </select>
            </div>
            <div class="form-group2">
              <input class="form-control" type="datetime-local" placeholder="Date et heure de fin" v-model="event.end_date">
            </div>
        <div>
            <label class="sous-titre">Coordonnées</label>
            <div class="form-group3">
                <input class="form-control" type="text" placeholder="Voie/ Rue" v-model="event.address">
                <input class="form-control" type="text" placeholder="Complément d'adresse" v-model="event.complement_address">
                <input class="form-control" type="text" placeholder="Ville" v-model="event.town">
            </div>
            <div class="form-group4">
                <input class="form-control" type="text" placeholder="Code postal" v-model="event.postal_code">
                <input class="form-control" type="text" placeholder="Longitude" v-model="event.longitude">
                <input class="form-control" type="text" placeholder="Latitude" v-model="event.latitude">
                
            </div>
        </div>

        <div>
            <button class="ajouter2" @click="saveEvent">Enregistrer</button>
        </div>

    </div>
</div>

</template>
  
<style>

.ajouter2{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375.522px;
  height: 60.083px;
  background: #60E886;
  border-radius: 11px;
  color: black;
  font-size: 24px;
  font-family: Poppins;
  font-weight: 600;
  border: none;
  margin-left: 650px;
  margin-top: 50px;
  
}

.fond2 {
      align-content: center;
      border-radius: 34px;
      background: #CECECE;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      width: 170vh;
      height: 700px;
}

.form-group6 {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left:100px ;
 }
</style>