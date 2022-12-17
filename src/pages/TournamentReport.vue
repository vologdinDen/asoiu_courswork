<script>
import html2pdf from 'html2pdf.js'

export default {
    data() {
        return {
            date_start: null,
            date_end: null,
            created_report: false,
            tournaments: '',
            selected_tournaments: ''
        }
    },

    created() {
        this.tournaments = JSON.parse(localStorage.getItem('tournaments'))
    },

    methods: {
        create_report() {
            if (this.date_start === null || this.date_end === null) {
                alert("Не все даты выбранны")
                return
            }

            let start_date = new Date(this.date_start)
            let end_date = new Date(this.date_end)

            if (end_date <= start_date) {
                alert("Дата окончания отчёта не может быть меньше или равна дате начала")
                return
            }

            this.selected_tournaments = this.tournaments.filter(el => {
                let tournament_date = new Date(el.date)
                if (tournament_date >= start_date && tournament_date <= end_date) {
                    return true
                } 
                return false
            })

            this.created_report = true

        },

        reset_created() {
            this.created_report = false;
        },

        download() {
            const element = document.getElementById("main")
            html2pdf().set({filename: `tournament-${this.$route.params.id}.pdf`}).from(element).save()
        }
    }

}
</script>

<template>
    <main-header>
        <h2>Отчёт за определённый период времени</h2>
    </main-header>

    <div class="main-zone">

        <div class="create-zone">
            <h1>Выберите даты начала и конца отчёта</h1>
            
            <div class="input-zone">
                <div>
                    <p>Дата начала</p>
                    <input v-model="date_start" type="date" @change="reset_created"/>
                </div>
        
                <div>

                    <p>Дата окончания</p>
                    <input v-model="date_end" type="date" @change="reset_created"/>
                </div>
            </div>
    
            <button @click="create_report">Создать отчёт</button>

        </div>

        <div class="report-zone" v-if="this.created_report">

            <div id="main">
                <h1 class="title">{{'Проведённые турниры в период с ' + this.date_start + ' по ' + this.date_end}}</h1>
    
                <table>
                    <tr>
                        <th>Название турнира</th>
                        <th>Формат турнира</th>
                        <th>Место проведения</th>
                        <th>Победители</th>
                    </tr>
    
                    <tr v-for="team in this.selected_tournaments">
                        <td>{{team.title}}</td>
                        <td>{{team.tournament_format}}</td>
                        <td>{{team.place}}</td>
                        <td v-if="team.result">{{team.result[0].teamname}}</td>
                        <td v-else>Не определны</td>
                    </tr>
                </table>
            </div>

            <button @click="download">Сохранить в PDF</button>
        </div>


    </div>
</template>

<style scoped>
.main-zone{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.create-zone{
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-zone{
    display: flex;
    justify-content: space-around;
    width: 20vw;
    
}

button{
    margin-top: 3vh;
    height: 3vh;
    font-size: 18px;
}

.report-zone{
    margin-top: 3vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

table, td, th{
    font-size: 18px;
    border: 1px solid;
}

table{
    width: 100%;
    border-collapse: collapse;
    padding: 8px;
}

th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
}

td{
    padding-right: 10px;
}

.title{
    margin-bottom: 20px;
}
</style>