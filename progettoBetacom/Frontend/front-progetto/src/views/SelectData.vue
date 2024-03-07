<!-- eslint-disable -->

<template>
    <div class="data">
        <div class="container mb-10">
            <div class="d-flex justify-content-center my-5">
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
                        <div class="w-7 d-flex justify-content-center my-1" v-for="(day, index) in  daysInMonth(key)"
                            :key="index" @click="toggleDate(day, key)">
                            <div :class="{ 'selected': isSelected(day, key) }">{{ day }}</div>
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


export default {
    components: {
        NavBar
    },
    data() {
        return {
            months: {
                '06': {
                    'nome': 'Giugno',
                },
                '07': {
                    'nome': 'Luglio',
                },
            },
            selectedDate: [],
        }
    },
    methods: {
        daysInMonth(month) {
            let now = new Date()
            now.setMonth(+month - 1)
            return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        },
        toggleDate(day, month) {
            let selected = new Date(new Date().getFullYear(), month - 1, day).toISOString().substring(0, 10);
            const index = this.selectedDate.indexOf(selected);
            if (index === -1) {
                this.selectedDate.push(selected);
            } else {
                this.selectedDate.splice(index, 1);
            }
            console.table(this.selectedDate)
        },
        isSelected(day, month) {
            let selected = new Date(new Date().getFullYear(), month - 1, day).toISOString().substring(0, 10);
            return this.selectedDate.includes(selected);
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
    background-color: lightblue;
}
</style>
