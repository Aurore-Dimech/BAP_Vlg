<script>
    import SearchEventId from '@/components/SearchForEvent.vue';

    export default {
        name: 'SearchEvent',

        components: {
            SearchEventId
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
        <SearchEventId />
    </div>
</template>
  
<style>
  
</style>
  