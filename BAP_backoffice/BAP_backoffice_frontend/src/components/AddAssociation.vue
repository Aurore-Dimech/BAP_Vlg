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
    <div class="fond">
            <div>
                    <div class="title">
                        <h1 id="Titre">Ajouter une association</h1>
                    </div>
                <!-- Identité des associations -->
                <h2 id="Titre2">Identité des associations</h2>
                    <div class="form-group">
                        <div>
                        <input type="text" class="form-control" id="inputEmail4" placeholder="Nom de l'association" v-model="association.name">
                        </div>
                        <input type="text" class="form-control" placeholder="Numéro SIRET" v-model="association.siret">
                    </div>
    
                <!-- Description -->
                <h3 id="Titre3">Description</h3>
                    <div class="form-group">
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
                    <!-- category NOT NULL ; script pour avoir autant de categories que de données différentes dans la table ; possibilité d'ajouter une nouvelle catégorie (catégorie autre = nouveau champ) -->
                </div>
            </div>
    
            <label class="sous-titre" for="inputPassword4">Représentant-e</label>
            <div class="form-group1">
                <div>
                <input type="text" class="form-control" id="inputPassword4" placeholder="Nom" v-model="association.representative_name">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="text" class="form-control" id="inputPassword5" placeholder="Prénom" v-model="association.representative_surname">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
            </div>

            <label class="sous-titre" for="inputAddress">Contacts</label>
            <div class="form-group2">
                <div>
                <input type="email" class="form-control" id="inputAddress" placeholder="Courriel" v-model="association.mail">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="tel" class="form-control" id="inputAddress2" placeholder="Téléphone" v-model="association.phone">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
            </div>

            <label class="sous-titre" for="Voie/Rue">Coordonnées</label>
            <div class="form-group3">
                <div>
                <input type="text" class="form-control" id="Voie/Rue" placeholder="Voie/Rue" v-model="association.address">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="text" class="form-control" id="Ville" placeholder="Ville" v-model="association.town">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="text" class="form-control" id="Complément d'adresse" placeholder="Complément d'adresse" v-model="association.complement_address">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
            </div>

            <div class="form-group4">
                <div>
                <input type="text" class="form-control" id="Longitude" placeholder="Longitude" v-model="association.longitude">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="text" class="form-control" id="Latitude" placeholder="Latitude" v-model="association.latitude">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
                <div>
                <input type="text" class="form-control" id="Code postal" placeholder="Code postal" v-model="association.postal_code">
                <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                </div>
            </div>

            <!-- Bouton Ajouter -->
            <div class="bouton">
                <button type="submit" class="ajouter" @click="saveAssociation">Ajouter</button>
            </div>
            
    </div>
    </template>
      
    <style>
#Titre {
    display: flex;
    justify-content: center;
    align-content: center;
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-top: 20px;
}

#Titre2 {
    color: #000;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left:100px ;
}

#Titre3 {
    color: #000;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left:100px ;
}
.sous-titre {
    color: #000;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left:100px ;
  }

.form-control {
    width: 250px;
    height: 40px;
    border-radius: 11px;
    border: 1px solid #424242;
    color: black;
    background-color: rgba(66, 66, 66, 0);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
} 

.form-group {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap:50px;
    padding-left:100px ;
 }

 .form-group1 {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap:50px;
    padding-left:100px ;
 }

 .form-group2 {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap:50px;
    padding-left:100px ;
 }

 .form-group3 {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap:50px;
    padding-left:100px ;
 }

 .form-group4 {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap:50px;
    padding-left: 100px ;
 }
    
.select {
    width: 255px;
    height: 40px;
    border-radius: 11px;
    border: 1px solid #424242;
    color: black;
    background-color: rgba(66, 66, 66, 0);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    gap:50px;
    margin-left:100px ;
}

.fond {
      align-content: center;
      border-radius: 34px;
      background: #CECECE;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      width: 170vh;
      height: 1070px;
}

.ajouter{
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
    </style>