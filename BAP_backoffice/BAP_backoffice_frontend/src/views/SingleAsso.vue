<script>
    import singleAssociation from '@/components/SingleAssociation.vue';

    export default {
        name: 'SingleAsso',

        components: {
            singleAssociation
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
        <singleAssociation />
    </div>
</template>
  
<style>
  
</style>
  