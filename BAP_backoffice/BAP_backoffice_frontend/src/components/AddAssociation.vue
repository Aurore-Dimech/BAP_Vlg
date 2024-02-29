<script>
    import axios from "axios"

    export default {
        data(){
            return{   
                association: {
                    name: "",
                    siret : "",
                    description: "",
                    category: "",
                    representative_name: "",
                    representative_surname: "",
                    mail: "",
                    phone: "",
                    address: "",
                    complement_address: "",
                    town: "",
                    postal_code: "",
                    longitude: "",
                    latitude: "",
                }             
            }
        },

        methods:{
            async saveAssociation(){
                try{
                    await axios.post("http://localhost:3000/associations", this.association);
                        
                    this.association = {
                        name: "",
                        siret : "",
                        description: "",
                        category: "",
                        representative_name: "",
                        representative_surname: "",
                        mail: "",
                        phone: "",
                        address: "",
                        complement_address: "",
                        town: "",
                        postal_code: "",
                        longitude: "",
                        latitude: "",
                    }
                } catch(err){
                    console.log(err.response.data)
                }
            }
        }
    }
</script>

<template>

    <div>

        <div>
            <label>Identité de l'association</label>
            <div>
                <input type="text" placeholder="Nom de l'association" v-model="association.name">
                <p class="error" v-if="association.name.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Numéro SIRET" v-model="association.siret">
                <textarea v-model="association.description">Description</textarea>
                <select name="category" id="category" v-model="association.category">
                    <option value="" disabled selected>Catégorie</option>
                    <option value="sport">sport</option>
                    <option value="health">santé</option>
                    <option value="culture">culture</option>
                    <option value="education">education</option>
                </select>
                <p class="error" v-if="association.category.length <= 0">Champ obligatoire</p>
                <!-- category NOT NULL ; script pour avoir autant de categories que de données différentes dans la table ; possibilité d'ajouter une nouvelle catégorie (catégorie autre = nouveau champ) -->
            </div>
        </div>

        <div>
            <label>Représentant.e</label>
            <div>
                <input type="text" placeholder="Nom" v-model="association.representative_name">
                <input type="text" placeholder="Prénom" v-model="association.representative_surname">
            </div>
        </div>

        <div>
            <label>Contacts</label>
            <div>
                <input type="email" placeholder="Courriel" v-model="association.mail">
                <input type="tel" placeholder="Téléphone" v-model="association.phone">
            </div>
        </div>

        <div>
            <label>Coordonnées</label>
            <div>
                <input type="text" placeholder="Voie/ Rue" v-model="association.address">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Complément d'adresse" v-model="association.complement_address">
                <input type="text" placeholder="Ville" v-model="association.town">
                <p class="error" v-if="association.town.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Code postal" v-model="association.postal_code">
                <p class="error" v-if="association.postal_code.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Longitude" v-model="association.longitude">
                <p class="error" v-if="association.longitude.length <= 0">Champ obligatoire</p>
                <input type="text" placeholder="Latitude" v-model="association.latitude">
                <p class="error" v-if="association.latitude.length <= 0">Champ obligatoire</p>
            </div>
        </div>

        <div>
            <button @click="saveAssociation">Enregistrer</button>
        </div>

    </div>

</template>
  
<style>
.error{
    color : red;
}
</style>
  