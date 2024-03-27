<script>
    import SearchAssociation from '@/components/SearchAssociation.vue';

    export default {
        name: 'SearchAsso',

        components: {
            SearchAssociation
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
        <SearchAssociation />
    </div>
</template>
  
<style>
  
</style>
  