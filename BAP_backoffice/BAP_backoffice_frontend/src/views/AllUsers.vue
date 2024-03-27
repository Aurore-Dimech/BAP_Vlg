<script>
    import UserList from '@/components/UserList.vue';

    export default {
        name:'AllUsers',

        components: {
            UserList
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
        <UserList />
    </div>
</template>
  
<style>
  
</style>
  