<script>
    import AssociationList from '@/components/AssociationList.vue';
    import EventList from '@/components/EventList.vue'

    export default {
        name: 'Index',

        data() {
            return{
                
            }
        },

        components: {
            AssociationList,
            EventList
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
        <AssociationList />
    </div>
    <div>
        <EventList />
    </div>

</template>
  
<style scoped lang="scss">
  
</style>