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
                        <div class="w-7 spaces" v-for="days in month.daysign" :key="days">{{ days }}</div>
                        <div class="w-7" v-for="n in month.blankDays" :key="`empty-${n}`"></div>
                        <div class="w-7 d-flex justify-content-center my-1" v-for="(day, index) in  daysInMonth(key)"
                            :key="index" @click="toggleDate(day, key)">
                            <div :class="{ 'selected': isSelected(day, key) }">{{ day }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center my-3">
                <button @click="addDateFromApi()">CONFERMA SELEZIONE</button>
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

export default {
    components: {
        NavBar
    },
    data() {
        return {
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
            }
        }
    },
    created() {
        this.fetchDateFromApi()
    },
    methods: {
        calculateBlankDays(month) {
            const date = new Date(new Date().getFullYear(), month - 1, 1);
            const startDay = getDay(startOfMonth(date)); // Ottieni il giorno della settimana in cui inizia il mese
            return startDay === 0 ? 6 : startDay -1  ; // Se è Domenica (0), restituisci 6; altrimenti sottrai 1
        },
        daysInMonth(month) {
            let now = new Date()
            now.setMonth(month)
            return new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        },
        toggleDate(day, month) {
            let selected = new Date(new Date().getFullYear(), month - 1, day).toISOString().substring(0, 10);
            const index = this.nuovaDataInserita.date.indexOf(selected);
            if (index === -1) {
                this.nuovaDataInserita.date.push(selected);
            } else {
                this.nuovaDataInserita.date.splice(index, 1);
            }
            console.table(this.nuovaDataInserita)
        },
        isSelected(day, month) {
            let selected = new Date(new Date().getFullYear(), month - 1, day).toISOString().substring(0, 10);
            return this.nuovaDataInserita.date.includes(selected);
        },
        async fetchDateFromApi() {
            try {
                const response = await apiService.fetchDateId(this.nuovaDataInserita.id_Utente);
                this.nuovaDataInserita.date = response.data.date.map(date => new Date(date).toISOString().substring(0, 10));
            } catch (err) {
                console.log(err)
            }
        },
        async addDateFromApi() {
            console.log(this.nuovaDataInserita);
            try {
                const response = await apiService.addDate(this.nuovaDataInserita);
                const nuovaData = response.data;
                console.log(response.data);
                this.nuovaDataInserita.data.push(nuovaData);
                this.$router.push("/eventi");
            } catch (err) {
                console.log(err)
            }
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
    border-radius: 100%;
    color: white;
    padding: 6px;
}
</style>
