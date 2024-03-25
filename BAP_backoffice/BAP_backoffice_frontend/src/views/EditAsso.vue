<script>
    import EditAssociation from '@/components/EditAssociation.vue';

    export default {
        name: 'EditAsso',

        components: {
            EditAssociation
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
        <EditAssociation />
    </div>
</template>
  
<style>
  
</style>
  