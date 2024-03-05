<!-- <template>
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
                        <div class="col w-7" v-for="(day, index) in month.giorni" :key="index">
                            {{ day }}
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
                    'giorni': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                },
                '07': {
                    'nome': 'Luglio',
                    'giorni': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                },
            }
        }
    },
};

</script>


<style scoped>
.w-7 {
    width: 22%;
}

.container-2:last-of-type {
    margin-bottom: 10rem;
}

.mb-10 {
    margin-bottom: 10rem;
}
</style> -->
<template>
  <!-- eslint-disable -->
    <div class="calendar">
        <div class="header">
            <button @click="previousMonth">&lt;</button>
            <h2>{{ currentMonth }}</h2>
            <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days">
            <div v-for="(day, index) in daysInMonth" :key="index" class="day">{{ day }}</div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    data() {
        return {
            currentDate: new Date(),
            currentMonth: '',
            daysInMonth: []
        };
    },
    created() {
        this.updateCalendar();
    },
    methods: {
        updateCalendar() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = this.currentDate.getMonth();
            const year = this.currentDate.getFullYear();
            if (month === 5 || month === 6) { 
                this.currentMonth = monthNames[month];
                this.daysInMonth = [];
                const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
                for (let i = 1; i <= daysInCurrentMonth; i++) {
                    this.daysInMonth.push(i);
                }
            } else {
                this.currentMonth = '';
                this.daysInMonth = [];
            }
        },
        previousMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateCalendar();
        },
        nextMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateCalendar();
        }
    }
};
</script>

<style scoped>
.calendar {
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.header button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
}

.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.day {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border: 1px solid #ccc;
}
</style>
