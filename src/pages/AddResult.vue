<script>
export default { 
    data() {
        return {
            tournament: '',
            places: [],
            extra_plase: ''
        }
    },

    created() {
        this.tournament = JSON.parse(localStorage.getItem("tournaments"))[this.$route.params.id]
        this.places = Array(this.tournament.teams.length).fill('')
    },

    methods: {
        reset() {
            this.places.fill('')
        },

        add_result() {

            // let not_all_places = false
            // if (this.tournament.teams.length < 3) {
            //     this.places.forEach((el, index) => {
            //         if (el === '' && index < this.tournament.teams.length){
            //             not_all_places = true;
            //         }
            //     })

            // } else {
            //     this.places.forEach((el) => {
            //         if (el === ''){
            //             not_all_places = true;
            //         }
            //     })
            // }
            // if (not_all_places) {
            //     alert(`Указаны не все возможные призовые места!`)
            //     return
            // }

            // let usege_team = []
            // let repeat = false
            // this.places.forEach(el => {
            //     if (usege_team.includes(el)) {
            //         repeat = true
            //     } else {
            //         usege_team.push(el)
            //     }
            // })

            // if (repeat) {
            //     alert("Некоторые команды занимают несколько призовых мест сразу. Проверьте всё ещё раз")
            //     return
            // }

            
            if (this.places.find(el => el === '') === '') {
                alert("Не у всех команд указаны места!")
                return
            }
            
            let selected_team = []
            let repeat = false
            this.places.forEach((el) => {
                if (selected_team.includes(el.teamname)) {
                    repeat = true
                } else {
                    selected_team.push(el.teamname)
                }
            })
            
            if (repeat) {
                alert("Некоторые команды занимают несколько место сразу. Проверьте всё ещё раз")
                return
            }
            
            this.tournament.result = this.places

            let tournaments = JSON.parse(localStorage.getItem("tournaments"))
            tournaments[this.$route.params.id] = this.tournament
            localStorage.setItem("tournaments", JSON.stringify(tournaments))

            alert("Результаты успешно внесены!")
            this.$router.push(`/tournament/${this.$route.params.id}`)
        }
    }
}
</script>

<template>
    <main-header>
        <h2>Внесение результатов</h2>
    </main-header>

    <div class="main-zone">
        <div class="title">
            <h2>Внесение результатов</h2>
        </div>
    </div>

    <div class="info-zone">

        <table>
            <tr>
                <th>Занятое место</th>
                <th>Название команды</th>
            </tr>

            <tr v-for="i in this.tournament.teams.length">
                <td>
                    {{ i }}
                </td>

                <td>
                    <select v-model="places[i - 1]">
                        <option defeault disabled value="">Выберите команду</option>
                        <option v-for="team in this.tournament.teams" :value="team">{{ team.teamname }}</option>
                    </select>
                </td>
            </tr>
            
        </table>
        <!-- {{this.places}} -->
        
        <!-- <div class="common-block">
            <h1>Первое место</h1>

            <div class="grid">
                <p>Название команды</p>

                <select v-model="places[0]">
                    <option defeault disabled value="">Выберите команду из списка</option>
                    <option v-for="team in this.tournament.teams" :value="team.teamname">{{ team.teamname }}</option>
                </select>
            </div>
            
        </div>
        
        <div class="common-block">
            <h1>Второе место</h1>

            <div class="grid">
                <p>Название команды</p>

                <select v-model="places[1]">
                    <option defeault disabled value="">Выберите команду из списка</option>
                    <option v-for="team in this.tournament.teams" :value="team.teamname">{{ team.teamname }}</option>
                </select>
            </div>
            
        </div>

        <div class="common-block">
            <h1>Третье место</h1>

            <div class="grid">
                <p>Название команды</p>

                <select v-model="places[2]">
                    <option defeault disabled value="">Выберите команду из списка</option>
                    <option v-for="team in this.tournament.teams" :value="team.teamname">{{ team.teamname }}</option>
                </select>
            </div>
            
        </div>

        <div class="common-block">
            <h1>Результаты остальных команд</h1>

            <div class="textarea-zone">
                <textarea class="textarea" v-model="extra_plase">

                </textarea>
            </div> -->
            
        <!-- </div> -->
    </div>

    <div class="btn-zone">

        <button class="execute-btn" id="delete-btn" @click="reset">Сбросить</button>

        <button class="execute-btn" @click="add_result">Добавить</button>

    </div>

</template>

<style scoped>
.main-zone{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
}

.title{
    margin-left: 20vw;
    margin-top: 3vh;
    font-size: 20px;
}

.info-zone{
    margin-left: 20vw;
    margin-top: 3vh;
}

.grid{
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 10vw);
    font-size: 18px;
}

.textarea{
    width: 60vw;
    height: 20vh;
}

.btn-zone{
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.execute-btn{
    width: 5vw;
    height: 3vh;
    font-size: 18px;
}

#delete-btn{
    border-radius: 5px;
    border-width: 0px;
    background-color: red;
    color: white;
    width: 5vw;
    font-size: 18px;
}

#delete-btn:hover{
    background-color: white;
    border-color: red;
    border-width: 1px;
    color: red;
}

</style>