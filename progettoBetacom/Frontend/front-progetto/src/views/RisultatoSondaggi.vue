<!-- eslint-disable -->

<template>
    <div class="sondaggi">
        <div class="container">
            <div class="row">
                <div class="d-flex justify-content-center my-5">
                    <h2>Risultato Sondaggi</h2>
                </div>
                <div class="my-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6 d-flex felx-wrap">
                                    <p class="spaces">Nome Evento</p>
                                    <div class="w-full"></div>
                                </div>
                                <div class="col-6 d-flex flex-wrap">
                                    <p class=" w-full d-flex justify-content-end">N° Voti</p>
                                    <div class="w-full d-flex justify-content-end" v-for="index in risultatiCount"
                                        :key="index">{{ risultatiCount.rows[0].conteggio }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NavBar></NavBar>
    </div>

</template>

<script>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue';
import apiService from '@/services/apiService';

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            risultati: [{}],
            risultatiCount: [],
        }
    },
    mounted(){
        this.fetchResultsFromApi();
        this.countVotiFromApi();
    },
    methods: {
        async fetchResultsFromApi() {
            try {
                const response = await apiService.fetchVoti();
                this.risultati = response.data;
                console.log(this.risultati);
            } catch (err){
                console.error(err);
            }   
        },
        
        async countVotiFromApi() {
            try{
                const response = await apiService.countVoti();
                console.log(response.data);
                this.risultatiCount = response.data;
            } catch (err) {
                console.error(err);
            }
        }
    }
}
</script>

<style scoped>
.sondaggi{
    height: 40rem;
}
</style>