<script>
    import UpdateEvent from '@/components/UpdateEvent.vue';

    export default {
        name: 'EditEvent',

        components: {
            UpdateEvent
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
        <UpdateEvent />
    </div>
</template>
  
<style>
  
</style>
  