<script>
    import LogInComponent from '@/components/LogInComponent.vue';

    export default {
        name: 'Login',

        components: {
            LogInComponent
        },

        // data(){
        //     return {
        //         token: localStorage.getItem('token')
        //     }
        // },

        // created: function(){
        //     this.verifyConnection();
        // },

        // methods:{
        //     verifyConnection() {
        //         if (this.token) {
        //             this.$router.push('/');
        //         }
        //     }
        // }
    }
</script>

<template>
    <div>
        <LogInComponent />
    </div>
</template>
  
<style>
  
</style>
  