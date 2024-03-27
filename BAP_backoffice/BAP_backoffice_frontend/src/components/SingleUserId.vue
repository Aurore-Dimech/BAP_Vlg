<script>
    import axios from "axios"

    export default {
        data(){
            return{
                user: {
                }, 
                token: localStorage.getItem('token'),
            }
        },

        created: function(){
            this.getUserById();
        },
        
        methods:{
            async getUserById(){
                try{
                    const response = await axios.get(`http://localhost:3000/auth/${this.$route.params.id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });
                    this.user = response.data
                } catch(err){
                    console.log(err)
                }
            },
        }, 

    }

</script>

<template>

    <div>
        <div>
            <label>Profil de {{ user.email }}</label>
            <div>
                <p>Role : {{ user.role }}</p>
            </div>
        </div>
    </div>

</template>
 
<style scoped lang="scss">
</style>