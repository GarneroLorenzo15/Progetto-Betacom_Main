<!-- eslint-disable -->

<template>
    <div class="data">
        <div class="container mb-10">
            <div>
                <router-link :to="'/eventi/' + this.$route.params.id">
                    <i class="bi bi-skip-backward-circle-fill"></i>
                </router-link>
            </div>
            <div class="d-flex justify-content-center my-3">
                <h1>Scegli una data</h1>
            </div>
            <div class="card container-2 my-2" v-for="(month, key) in months" :key="key">
                <div class="card-header">
                    <div class="d-flex justify-content-center">
                        <h3>{{ month.nome }}</h3>
                    </div>
                </div>
                <div class="card-body d-flex justify-content-center">
                    <div class="row w-full">
                        <div class="w-7 spaces d-flex justify-content-center" v-for="days in month.daysign" :key="days">{{ days }}</div>
                        <div class="w-7" v-for="n in month.blankDays" :key="`empty-${n}`"></div>
                        <div class="w-7 d-flex justify-content-center my-1" v-for="(day, index) in  daysInMonth(key)"
                            :key="index" @click="toggleDate(day, key)">
                            <div class="px-2 py-1" :class="{ 'selected': isSelected(day, key) }">{{ day }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fab-wrapper">
                <button class="fab-button" @click="addDateFromApi()" v-if="showConfirm">
                    <i class="bi bi-check"></i>
                </button>
            </div>

            <div class="card my-3">
                <div class="card-header">
                    <div class="d-flex justify-content-center">
                        <h3>Giornata con più voti</h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row d-flex justify-content-between flex-nowrap">
                        <div class="w-50">
                            <div class="row">
                                <p class="spaces">Data</p>
                                <p>{{ maxDate }}</p>
                            </div>
                        </div>
                        <div class="w-50">
                            <div class="row">
                                <p class="spaces">Numero di voti</p>
                                <p>{{ maxCount }}</p>
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
/* eslint-disable*/
import NavBar from '@/components/NavBar.vue';
import { getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import apiService from '@/services/apiService';
import Swal from 'sweetalert2';
import utils from '@/services/utilsService';


export default {
    components: {
        NavBar
    },
    data() {
        return {
            originalDates: [],
            showConfirm: false,
            months: {
                '06': {
                    'nome': 'Giugno',
                    'blankDays': this.calculateBlankDays(6),
                    'daysign': ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom']
                },
                '07': {
                    'nome': 'Luglio',
                    'blankDays': this.calculateBlankDays(7),
                    'daysign': ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom']
                },
            },
            nuovaDataInserita: {
                id_Utente: localStorage.getItem('utente'),
                id_Evento: this.$route.params.id,
                date: [],
            },
            maxDate: '',
            maxCount: 0,
        }
    },
    created() {
        this.fetchDateFromApi();
    },
    computed: {
    },
    methods: {
        showConfirmButton() {
            if (this.originalDates && this.nuovaDataInserita?.date) {
                this.showConfirm = !this.arraysEqual(this.originalDates, this.nuovaDataInserita.date);
                return
            }
            this.showConfirm = false;
        },
        arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        },
        calculateBlankDays(month) {
            const date = new Date(new Date().getFullYear(), month - 1, 1);
            const startDay = getDay(startOfMonth(date)); // Ottieni il giorno della settimana in cui inizia il mese
            return startDay === 0 ? 6 : startDay - 1; // Se è Domenica (0), restituisci 6; altrimenti sottrai 1
        },
        daysInMonth(month) {
            let now = new Date()
            now.setMonth(+month)
            return new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        },
        toggleDate(day, month) {
            // this.showConfirmButton = true;
            let selected = new Date().getFullYear() + "-" + ("" + month).padStart(2, "0") + "-" + ("" + day).padStart(2, "0")
            console.log(selected);
            const index = this.nuovaDataInserita.date.indexOf(selected);
            if (index === -1) {
                this.nuovaDataInserita.date.push(selected);
                console.log(this.nuovaDataInserita.date, "toggle date");
            } else {
                this.nuovaDataInserita.date.splice(index, 1);
            }
            this.showConfirmButton()
        },
        isSelected(day, month) {
            let selected = new Date().getFullYear() + "-" + ("" + month).padStart(2, "0") + "-" + ("" + day).padStart(2, "0")
            return this.nuovaDataInserita.date.includes(selected);
        },
        async fetchDateFromApi() {
            try {
                const response = await apiService.fetchDateId(this.nuovaDataInserita.id_Utente);
                this.nuovaDataInserita.date = response.data.date.map(date => utils.datePadString(date));
                this.originalDates = [].concat(this.nuovaDataInserita.date);
                this.dateDeciding();
            } catch (err) {
                console.log(err);
            }
        },
        async addDateFromApi() {
            try {
                console.log(this.nuovaDataInserita)
                const response = await apiService.addDate(this.nuovaDataInserita);
                this.addDateDone();
                const nuovaData = response.data;
                this.nuovaDataInserita.date.push(nuovaData);
                this.$router.push("/eventi");
            } catch (err) {
                console.log(err);
            }
        },
        async dateDeciding() {
            try {
                const response = await apiService.fetchMaxVotedDate();
                this.maxCount = response.data.rows[0].voti;
                this.maxDate = utils.dateMaxPadString(response.data.rows[0].date);
            } catch (err) {
                console.log(err);
            }
        },
        addDateDone() {
            Swal.fire({
                icon: 'success',
                title: 'Data aggiunta con successo',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
};



</script>


<style scoped>
.w-7 {
    width: 14.28%;
}

.container-2:last-of-type {
    margin-bottom: 10rem;
}

.mb-10 {
    margin-bottom: 10rem;
}

.selected {
    background-color: #034ea1;
    color: white;
    cursor: pointer;
}



.fab-wrapper {
    position: fixed;
    right: 1rem;
    bottom: 8rem;
    z-index: 5;
    display: flex;
    flex-direction: center;
    align-items: center;
}


.fab-button {
    width: 70px;
    height: 70px;
    background-color: #f38120;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.1s ease-in-out;
}
</style>
