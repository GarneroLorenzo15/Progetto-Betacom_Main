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
                                <div class="col-6">
                                    <p>Nome Evento</p>
                                </div>
                                <div class="col-6 d-flex justify-content-end">
                                    <p>N° Voti</p>
                                    <div v-for="result in risultati" :key="result.id">
                                        {{  }}
                                    </div>
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
            risultati: [],
        }
    },
    mounted(){
        this.fetchResultsFromApi();
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
        }
    }
}
</script>

<style scoped></style>