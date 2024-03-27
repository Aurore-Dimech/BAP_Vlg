<script>
    import ClosedAssociationList from '@/components/ClosedAssociationList.vue';
    import ArchivedEventList from '@/components/ArchivedEventList.vue';

    export default {
        name: 'Closed&Archived',

        components: {
            ClosedAssociationList,
            ArchivedEventList
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
<div class="fond">
  <div class="title">
    <h1 id="Titre"> Associations et évènements fermées</h1>
  </div>
    <div>
        <ClosedAssociationList />
        <ArchivedEventList />
    </div>
  
</div> 
</template>
  
<style scoped lang="scss">
  
</style>