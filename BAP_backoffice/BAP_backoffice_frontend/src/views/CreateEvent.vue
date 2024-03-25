<script>
    import AddEvent from '@/components/AddEvent.vue';

    export default {
        name: 'CreateEvent',

        components: {
            AddEvent
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
        <AddEvent />
    </div>
</template>
  
<style>
  
</style>
  