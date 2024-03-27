<script>
    import singleEventId from '@/components/SingleEventId.vue';

    export default {
        name: 'SingleEvent',

        components: {
            singleEventId
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
        <singleEventId />
    </div>
</template>
  
<style>
  
</style>
  