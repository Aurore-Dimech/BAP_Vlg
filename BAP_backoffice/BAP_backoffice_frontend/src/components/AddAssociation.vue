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
                    closed: false
                }             
            }
        },

        methods:{
            async saveAssociation(){
                try{
                    const boolString = document.querySelector("#closed").value
                    const boolean = (/true/).test(boolString)
                    this.association.closed = boolean
                    
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
                        closed: false
                    }
                } catch(err){
                    console.log(err.response.data)
                }
            }
        }
    }
</script>

<template>
    <form>
            <div>
                    <div class="title">
                        <h1 id="Titre">Ajouter une association</h1>
                    </div>
                <!-- Identité des associations -->
                    <div class="form-group">
                        <h2 id="Titre2">Identité des associations</h2>
                        <input type="text" class="form-control" id="inputEmail4" placeholder="Nom de l'association" v-model="association.name">
                        <p class="error" v-if="association.name.length <= 0">Champ obligatoire</p>
                    </div>
    
                <!-- Numéro SIRET -->
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Numéro SIRET" v-model="association.siret">
                    </div>
    
                <!-- Description -->
                    <div class="form-group">
                         <h3 id="Titre3">Description</h3>
                        <textarea class="form-control" id="description" rows="3" placeholder="Description" v-model="association.description"></textarea>
                    </div>
                <div>
                    <select class="select" name="category" id="category" v-model="association.category">
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
    <div class="container">
        <!-- Première colonne -->
        <div class="column">
            <div class="form-group">
                <label for="inputPassword4">Représentant-e</label>
                <input type="text" class="form-control" id="inputPassword4" placeholder="Nom" v-model="association.representative_name">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                <input type="text" class="form-control" id="inputPassword5" placeholder="Prénom" v-model="association.representative_surname">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
            </div>
            <div class="form-group">
                <label for="inputAddress">Contacts</label>
                <input type="email" class="form-control" id="inputAddress" placeholder="Courriel" v-model="association.mail">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                <input type="tel" class="form-control" id="inputAddress2" placeholder="Téléphone" v-model="association.phone">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
            </div>
            <div class="form-group">
                <label for="Voie/Rue">Coordonnées</label>
                <input type="text" class="form-control" id="Voie/Rue" placeholder="Voie/Rue" v-model="association.address">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                <input type="text" class="form-control" id="Longitude" placeholder="Longitude" v-model="association.longitude">
                <p class="error" v-if="association.longitude.length <= 0">Champ obligatoire</p>
            </div>
        </div>
        <!-- Deuxième colonne -->
        <div class="column2">
            <div class="form-group">
                <label style="visibility: hidden;">Label invisible</label>
                <input type="text" class="form-control" id="Complément d'adresse" placeholder="Complément d'adresse" v-model="association.complement_address">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                <input type="text" class="form-control" id="Latitude" placeholder="Latitude" v-model="association.latitude">
                <p class="error" v-if="association.latitude.length <= 0">Champ obligatoire</p>
            </div>
        </div>
        <!-- Troisième colonne -->
            <div class="column3">
                <div class="form-group">
                    <label style="visibility: hidden;">Label invisible</label>
                    <input type="text" class="form-control" id="Ville" placeholder="Ville" v-model="association.town">
                    <p class="error" v-if="association.town.length <= 0">Champ obligatoire</p>
                    <input type="text" class="form-control" id="Code postal" placeholder="Code postal" v-model="association.postal_code">
                    <p class="error" v-if="association.postal_code.length <= 0">Champ obligatoire</p>
                </div>
            </div>
    </div>
            <!-- Bouton Ajouter -->
            <div class="bouton">
                <button type="submit" class="ajouter" @click="saveAssociation"> Ajouter</button>
            </div>
    </form>
    </template>
      
    <style>
    .error{
        color : red;
    }
    body{
      background-color: #E8E8E8;
      border-radius: 10px;
    }
    
    .h1 {
      align-items: center;
    }
    
    #Titre {
    display: grid;
      color: #000000;
      font-size: 40px;
      font-family: Poppins;
      font-weight: 600;
      align-items: center;
      justify-content: center;
    }
    
    #Titre2 {
      color: #000000;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    
    #Titre3 {
      color: #000000;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    
    label {
        display: block;
      color: #000000;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 10px;
    }
    
    .container {
      display: grid;
      grid-template-columns: repeat(3 , 1fr);
      gap: 10px;
      justify-content: center;
    }
    
    .column {
      width: 100%;
      padding: 10px;
    }
    
    .column2 {
      width: 100%;
      padding: 10px;
      margin-top: 530px;
    }
    .column3 {
      width: 100%;
      padding: 10px;
      margin-top: 530px;
    }
    .form-group {
      margin-top: 40px;
      margin-bottom: 20px;
    }
    
    .form-control  {
        width: 250px;
        height: 40px;
        border-radius: 11px;
        border: 1px solid #424242;
        color: rgba(66, 66, 66, 0);
        background-color: rgba(232, 232, 232, 0);
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    
    }
    
    .form-control::placeholder {
      padding-left: 5px;
    }
    
    .error {
        margin-top: 5px;
    }
    
    .ajouter {
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
    
    .select {
        width: 250px;
        height: 40px;
        border-radius: 11px;
        border: 1px solid #424242;
        color: rgba(66, 66, 66, 0.70);
        background-color: rgba(232, 232, 232, 0);
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      
    }
    
    .input, .form-control {
        width: 250px;
        height: 40px;
        border-radius: 11px;
        border: 1px solid #424242;
        color: rgba(66, 66, 66, 0.70);
        background-color: rgba(232, 232, 232, 0);
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    
    </style>
      