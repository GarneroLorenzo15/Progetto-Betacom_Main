<!-- eslint-disable -->

<template>
    <div class="sondaggi">
        <div class="container">
            <div>
                <router-link :to="'/eventi/' + this.$route.params.id">
                    <i class="bi bi-skip-backward-circle-fill"></i>
                </router-link>
            </div>
            <div class="row">
                <div class="w-full d-flex justify-content-center">
                    <h2>Risultato Sondaggio</h2>
                </div>
                <div class="my-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="row d-flex align-items-center">
                                <p class="w-50 spaces">Nome Evento</p>
                                <p class=" w-50 d-flex justify-content-end">N° Voti</p>
                            </div>
                            <div class="row" v-for="risultati in risultatiCount.rows" :key="risultati">
                                <div class="col-6 d-flex felx-wrap">
                                    <div class="w-full ">{{ risultati.titolo }}</div>
                                </div>
                                <div class="col-6 d-flex flex-wrap">
                                    <div class="w-full d-flex justify-content-end">{{ risultati.conteggio }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card ">
                <p class=" d-flex justify-content-center my-2">Grafico Sondaggio</p>
                <canvas class="my-3" id="pieChart" width="400" height="400"></canvas>
            </div>
        </div>
        <NavBar></NavBar>
    </div>

</template>

<script>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue';
import apiService from '@/services/apiService';
import Chart from 'chart.js/auto';




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
    created() {
        this.scrollToTop();
    },
    mounted() {
        this.fetchResultsFromApi();
        this.countVotiFromApi();
    },
    methods: {
        async fetchResultsFromApi() {
            try {
                const response = await apiService.fetchVoti();
                this.risultati = response.data;
                console.log(this.risultati);
            } catch (err) {
                console.error(err);
            }
        },

        async countVotiFromApi() {
            try {
                const response = await apiService.countVoti();
                console.log(response.data);
                this.risultatiCount = response.data;
                this.generatePieChart();
            } catch (err) {
                console.error(err);
            }
        },

        async deleteVotiFromApi() {
            try {
                const response = await apiService.deleteVoti();
                this.$router.push("/eventi");
            } catch (err) {
                console.error(err);
            }
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        generatePieChart() {
            const labels = this.risultatiCount.rows.map(risultati => risultati.titolo);
            const count = this.risultatiCount.rows.map(risultati => risultati.conteggio);

            if (this.pieChart) {
                this.pieChart.destroy();
            }


            this.pieChart = new Chart(document.getElementById('pieChart'), {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: count,
                        backgroundColor: [
                            'rgba(25, 118, 210, 0.5)',    // Blu scuro
                            'rgba(255, 152, 0, 0.5)',     // Arancione scuro
                            'rgba(41, 121, 255, 0.5)',    // Blu
                            'rgba(255, 171, 64, 0.5)',    // Arancione
                            'rgba(92, 133, 255, 0.5)',    // Blu chiaro
                            'rgba(255, 193, 7, 0.5)',     // Arancione vivace
                            'rgba(0, 70, 153, 0.5)',      // Blu navy
                            'rgba(255, 210, 121, 0.5)',   // Arancione chiaro
                            'rgba(0, 145, 234, 0.5)',     // Blu vivace
                            'rgba(255, 235, 179, 0.5)' 
                        ]
                    }]
                },
                options: {
                    responsive: true,
                }
            });
        }
    }
}
</script>

<style scoped>
.sondaggi {
    height: 150vh;
}

.mr-5{
    margin-right: 5rem;
}
</style>