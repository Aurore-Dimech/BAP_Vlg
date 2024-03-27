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

    <div>

        <div>
            <h1 id="Titre">Créer un évènement</h1>
            <label>Evènement</label>
            <div id="main">
                <input class="form-control" type="text" placeholder="Nom de l'évènement" v-model="event.name">
                <p class="error" v-if="event.name.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="datetime-local" placeholder="Date et heure de début" v-model="event.start_date">
                <p class="error" v-if="event.town.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="datetime-local" placeholder="Date et heure de fin" v-model="event.end_date">
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
        </div>

        <div>
            <label>Coordonnées</label>
            <div>
                <input class="form-control" type="text" placeholder="Voie/ Rue" v-model="event.address">
                <p class="error" v-if="event.address.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="text" placeholder="Complément d'adresse" v-model="event.complement_address">
                <p class="error" v-if="event.town.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="text" placeholder="Ville" v-model="event.town">
                <p class="error" v-if="event.town.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="text" placeholder="Code postal" v-model="event.postal_code">
                <p class="error" v-if="event.postal_code.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="text" placeholder="Longitude" v-model="event.longitude">
                <p class="error" v-if="event.longitude.length <= 0">Champ obligatoire</p>
                <input class="form-control" type="text" placeholder="Latitude" v-model="event.latitude">
                <p class="error" v-if="event.latitude.length <= 0">Champ obligatoire</p>
            </div>
        </div>

        <div>
            <button class="ajouter" @click="saveEvent">Enregistrer</button>
        </div>

    </div>

</template>
  
<style>
.error{
    color : red;
}


.ajouter{
  width: 375.522px;
  height: 60.083px;
  background: #60E886;
  border-radius: 11px;
  color: black;
  font-size: 24px;
  font-family: Poppins;
  font-weight: 600;
  border: none;
  margin-left: auto;
  margin-right: auto;
}



</style>