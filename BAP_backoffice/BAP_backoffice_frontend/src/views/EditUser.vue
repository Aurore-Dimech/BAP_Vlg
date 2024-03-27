<script>
    import UpdateUser from '@/components/UpdateUser.vue';

    export default {
        name: 'EditUser',

        components: {
            UpdateUser
        },

        data(){
            return {
                token: localStorage.getItem('token')
            }
        },

        created: function(){
            this.verifyConnection();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<template>
    <div>
        <UpdateUser />
    </div>
</template>
  
<style>
  
</style>
  