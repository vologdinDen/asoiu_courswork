<script>
import html2pdf from 'html2pdf.js'

export default {
    data() {
        return {
            tournament: {}
        }
    },

    created() {
        this.tournament = JSON.parse(localStorage.getItem("tournaments"))[this.$route.params.id]
    },

    methods: {
        download() {
            const element = document.getElementById("main")
            html2pdf().set({filename: `tournament-${this.$route.params.id}.pdf`}).from(element).save()
        }
    }
}
</script>

<template>
    <main-header>
        <h2>Результаты</h2>
    </main-header>

    <div class="main-zone" id="main" v-if="this.tournament.result">

        <div class="title">
            <h1>{{ 'Реузультаты турнира "' + this.tournament.title + '"' }}</h1>
        </div>

        <div class="common-block">
            <h2>Первое место</h2>

            <div class="grid">
                <p>Название команды</p>

                <p>{{ this.tournament.result[0].teamname }}</p>

                <p>Состав</p>

                <div class="crew">
                    <p v-for="(user, index) in this.tournament.result[0].crew">{{ (index == this.tournament.result[0].captain) ? user  + " - Капитан" : user }}</p>
                </div>

            </div>
        </div>

        <div class="common-block">
            <h2>Второе место</h2>

            <div class="grid" v-if="this.tournament.result[1]">
                <p>Название команды</p>

                <p>{{ this.tournament.result[1].teamname }}</p>

                <p>Состав</p>

                <div class="crew">
                    <p v-for="(user, index) in this.tournament.result[1].crew">{{ (index == this.tournament.result[1].captain) ? user  + " - Капитан" : user }}</p>
                </div>

            </div>

            <div class="not-defined" v-else>
                <p>Не определенно</p>
            </div>
        </div>

        <div class="common-block">
            <h2>Третье место</h2>

            <div class="grid" v-if="this.tournament.result[2]">
                <p>Название команды</p>

                <p>{{ this.tournament.result[2].teamname }}</p>

                <p>Состав</p>

                <div class="crew">
                    <p v-for="(user, index) in this.tournament.result[2].crew">{{ (index == this.tournament.result[2].captain) ? user  + " - Капитан" : user }}</p>
                </div>

            </div>

            <div class="not-defined" v-else>
                <p>Не определенно</p>
            </div>
        </div>

        <div class="extra-block">
            <h2>Расрпеление остальных мест</h2>

            <div class="extra" v-if="this.tournament.result.length > 3">
                <table class="table">
                
                    <tr>
                        <th>Название команды</th>
                        <th>Занятое место</th>
                    </tr>

                    <tr v-for="team, index in this.tournament.result.slice(3)">
                        <td>{{index + 4}}</td>

                        <td>{{team.teamname}}</td>
                    </tr>
                
                </table>
            </div>

            <div class="extra-not-defined" v-else>
                <p>Не определенно</p>
            </div>
        </div>

    </div>

    <div class="btn-zone" v-if="this.tournament.result">

        <button class="btn" @click="download">Загрузить в PDF</button>

    </div>

    <div class="not-result" v-else>
        <h1>Результат ещё не добавлен организатором турнира</h1>
        <button class="exit-btn" @click="this.$router.push('/')">Назад</button>
    </div>
</template>

<style scoped>
.main-zone{
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
}

.title{
    margin-top: 1.5vh;
    font-size: 15px;
}

.grid{
    display: grid;
    grid-template-columns: repeat(2, 15vw);
    font-size: 18px;
}

.extra{
    width: 30vw;
    text-align: center;
    word-wrap: break-word;
    margin-top: 1vh;
}

.extra-block{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
}
.extra-not-defined{
    font-size: 18px;
}

.btn-zone{
    margin-top: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15vh;
}

.btn{
    width: 9vw;
    height: 5vh;
    font-size: 18px;
}

.not-result{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
}

.exit-btn{
    margin-top: 2vh;
    width: 5vw;
    height: 3vh;
    font-size: 18px;
}

.not-defined{
    width: 30vw;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 18px;
}

table, td, th{
    font-size: 18px;
    border: 1px solid;
}

table{
    width: 100%;
}

</style>