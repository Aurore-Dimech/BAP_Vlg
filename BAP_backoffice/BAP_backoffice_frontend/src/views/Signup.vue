<script>
    import SignUpComponent from '@/components/SignUpComponent.vue';

    export default {
        name: 'Signup',

        components: {
            SignUpComponent
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
                if (this.token) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<template>
    <div>
        <SignUpComponent />
    </div>
</template>
  
<style>
  
</style>
  