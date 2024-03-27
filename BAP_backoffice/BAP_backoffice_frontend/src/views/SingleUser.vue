<script>
    import SingleUserId from '@/components/SingleUserId.vue';

    export default {
        name: 'SingleUser',

        components: {
            SingleUserId
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
        <SingleUserId />
    </div>
</template>
  
<style>
  
</style>
  