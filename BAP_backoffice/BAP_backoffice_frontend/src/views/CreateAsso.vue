<script>
    import AddAssociation from '@/components/AddAssociation.vue';

    export default {
        name: 'CreateAsso',

        components: {
            AddAssociation
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
        <AddAssociation />
    </div>
</template>
  
<style>
  
</style>
  