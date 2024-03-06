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
                },
                associations: [],
                startDate: '',
                endDate: ''      
            }
        },

        created: function(){
            this.getEventById();
            this.getAssociations();
        },

        methods:{
            async getEventById(){
                try{
                    const response = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`);
                        
                    this.event = {
                        name: response.data.name,
                        start_date : response.data.start_date,
                        end_date: response.data.end_date,
                        id_association: response.data.id_association,
                        address: response.data.address,
                        complement_address: response.data.complement_address,
                        town: response.data.town,
                        postal_code: response.data.postal_code,
                        longitude: response.data.longitude,
                        latitude: response.data.latitude,
                    }

                    this.event.start_date = this.event.start_date.slice(0,16)
                    this.event.end_date = this.event.end_date.slice(0,16)
                } catch(err){
                    console.log(err)
                }
            },

            async updateEvent(){
                try{
                    await axios.patch(`http://localhost:3000/events/${this.$route.params.id}`, this.event);
                    const response = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`);
                    
                    this.event = {
                        name: response.data.name,
                        start_date : response.data.start_date,
                        end_date: response.data.end_date,
                        id_association: response.data.id_association,
                        address: response.data.address,
                        complement_address: response.data.complement_address,
                        town: response.data.town,
                        postal_code: response.data.postal_code,
                        longitude: response.data.longitude,
                        latitude: response.data.latitude,
                    }

                    this.event.start_date = this.event.start_date.slice(0,16)
                    this.event.end_date = this.event.end_date.slice(0,16)

                    window.alert("Evènement mise à jour !")
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
            <label>Evènement</label>
            <div id="main">
                <input type="text" placeholder="Nom de l'évènement" v-model="event.name">
                <p class="error" v-if="event.name.length <= 0">Champ obligatoire</p>
                <input type="datetime-local" placeholder="Date et heure de début" v-model="event.start_date">
                <input type="datetime-local" placeholder="Date et heure de fin" v-model="event.end_date">
                <select name="associations" id="associations" v-model="event.id_association">
                    <option value="" disabled selected>Association</option>
                    <option v-for="association in associations" :value="association.id">{{ association.name }}</option>
                </select>
            </div>
        </div>

        <div>
            <label>Coordonnées</label>
            <div>
                <input type="text" placeholder="Voie/ Rue" v-model="event.address">
                <p class="error" v-if="event.address.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Complément d'adresse" v-model="event.complement_address">
                <input type="text" placeholder="Ville" v-model="event.town">
                <p class="error" v-if="event.town.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Code postal" v-model="event.postal_code">
                <p class="error" v-if="event.postal_code.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Longitude" v-model="event.longitude">
                <p class="error" v-if="event.longitude.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Latitude" v-model="event.latitude">
                <p class="error" v-if="event.latitude.length <= 0">Champ obligatoire</p>
            </div>
        </div>

        <div>
            <button @click="updateEvent">Enregistrer</button>
        </div>
        
    </div>

</template>
  
<style>
  
</style>
  