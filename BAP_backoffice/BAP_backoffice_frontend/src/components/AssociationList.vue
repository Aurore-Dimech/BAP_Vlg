<script>
    import axios from "axios"
    import L, { map, marker } from "leaflet"
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

    let DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerIconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    
    export default {
        data(){
            return{
                items:[],
                map: null,
                markers: [],
                categories:[ //ajouter toutes les catégories
                    {
                        name: "santé",
                        value: "health"
                    },
                    {
                        name: "culture",
                        value: "culture"
                    },
                    {
                        name: 'education',
                        value: 'education'
                    }
                ]
            }
        },

        mounted() {
                this.map = L.map('map').setView([48.93595, 2.3315], 16);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(this.map);
        },

        created(){
            this.getAssociations();
        },

        methods:{
            async getAssociations(){
                try {
                    const response = await axios.get("http://localhost:3000/associations");
                    this.items = response.data

                    this.items.forEach((item) =>{
                        const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                        marker.bindPopup(`${item.name}`)

                        if(item.category == "santé"){
                            marker._icon.style.filter = "hue-rotate(150deg)";
                        } else if(item.category == "culture"){
                            marker._icon.style.filter = "hue-rotate(280deg)";
                        } else if (item.category == "education") {
                            marker._icon.style.filter = "hue-rotate(120deg)";
                        }

                        this.markers.push(marker)
                    })
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
            },

            async getAssociationsByCategories(category){
                this.items = []
                this.markers.forEach(marker => marker.remove());
                this.markers = []

                const response = await axios.get(`http://localhost:3000/associations/category/${category}`);
                this.items = response.data

                this.items.forEach((item) =>{
                    const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                    marker.bindPopup(`${item.name}`)

                    if(item.category == "santé"){
                        marker._icon.style.filter = "hue-rotate(150deg)";
                    } else if(item.category == "culture"){
                        marker._icon.style.filter = "hue-rotate(280deg)";
                    } else if (item.category == "education") {
                        marker._icon.style.filter = "hue-rotate(120deg)";
                    }

                    this.markers.push(marker);
                })
            }
        }
    }
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

    <div>

        <table>

            <thead>
                <tr>
                    <th>Association</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key='item.id'>
                    <td>
                        <router-link :to="{name:'SingleAsso', params:{id: item.id}}">{{ item.name }}</router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'EditAsso', params:{id: item.id}}">Modifier</router-link>
                        <button @click="deleteAssociation(item.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>

            <div>
                <button v-for="category in categories" :key="category.value" @click="getAssociationsByCategories(category.value)">{{ category.name }}</button>
            </div>

        </table>
        
    </div>

    <div id="fullmap">
        <div id="map"></div>
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
            border: 1px solid grey;
        }
    }
}

    #map {
        height: 700px;
        width: 700px;
        margin: 0 auto;
    }
</style>