<script>
export default {
    data() {
        return {
            tournament: null,

            team_name: '',
            teamates: ['', '', '', '', '', ''],

            selected_captain: '',

            common_users: [
                {
                    name: "Динозавриков А. А"
                },

                {
                    name: "Печенюшкин А. А"
                },

                {
                    name: "Чай А. А"
                },

                {
                    name: "Лугов А. А"
                },

                {
                    name: "Попов А. А"
                },

                {
                    name: "Умный А. А"
                },

                {
                    name: "Тестовый А. А"
                },

                {
                    name: "Тестовый А. Б"
                },

                {
                    name: "Тестовый А. В"
                },


                {
                    name: "Тестовый А. Г"
                },

                {
                    name: "Тестовый А. Е"
                },
            ]
        }
    },

    methods: {
        getTournamentTitle() {
            return JSON.parse(localStorage.getItem("tournaments"))[this.$route.params.id].title    
        },

        reset() {
            this.team_name = ''
            this.teamates = ['', '', '', '', '', '']
        },

        add_p() {
            if (this.team_name === '') {
                alert("Вы не заполнили название команды!")
                return
            }

            let dont_choose = []
            this.teamates.forEach((el, index) => {
                if (el === '') {
                    dont_choose.push(index)
                }
            })
            if (dont_choose.length > 0) {
                alert(`Не все игроки выбраны!`)
                return
            }
            if (this.selected_captain === '') {
                alert("Не выбран капитан!")
                return
            }
            let another_team = false;
            this.tournament.teams.forEach(el => {
                if (el.teamname === this.team_name) {
                    another_team = true;
                }
            })

            if (another_team) {
                alert("Уже существует команда с таким названием!")
                return
            }

            let team = {
                teamname: this.team_name,
                crew: this.teamates,
                captain: this.selected_captain
            }

            this.tournament.teams.push(team);
            
            let tournaments = JSON.parse(localStorage.getItem("tournaments"))
            tournaments[this.$route.params.id] = this.tournament
            localStorage.setItem("tournaments", JSON.stringify(tournaments))
            
            alert("Команда успешно добавлена!")
            this.$router.push("/")
        }
    },
    
    mounted() {
        this.tournament = JSON.parse(localStorage.getItem("tournaments"))[this.$route.params.id]
    }
}
</script>

<template>
    <main-header>
        <h2>Добавление участников</h2>
    </main-header>

    <div class="main-zone">

        <div class="title">
            <h2>Добавление участников</h2>
        </div>

        <div class="common-zone">
            <p class="name">Название турнира</p>

            <div class="input-zone">
                <input class="input-value" type="text" disabled :value="getTournamentTitle()"/>
            </div>
        </div>

        <div class="common-zone">
            <p class="name">Название команды</p>

            <div class="input-zone">
                <input class="input-value" type="text" v-model="team_name"/>
            </div>
        </div>

        <div class="prefix">
            <p>Состав</p>
            <p class="cap">Капитан</p>
        </div>

        <div class="crew">

            <div v-for="el in 6" class="common-fio-zone">
                <p class="name">ФИО</p>

                <div class="input-fio-zone">

                    <select v-model="teamates[el - 1]">
                        <option default disabled value="">Выберите ваших товарищей из списка</option>
                        <option class="select" v-for="user in common_users" :value="user.name" :key="user.name">
                            {{ user.name }}
                        </option>
                    </select>
                </div>
                <input type="radio" name="captain" :value="(el - 1)" v-model="selected_captain"/>
            </div>

            


        </div>


    </div>

    <div class="btn-zone">

        <button class="execute-btn" id="delete-btn" @click="reset">Сбросить</button>

        <button class="execute-btn" @click="add_p">Добавить</button>

    </div>

</template>

<style scoped>

.name{
    display: flex;
    align-items: flex-end;
}
.main-zone{
    width: 100%;
    height: 100%;

    display: flex;
    align-items: flex-start;
}

.title{
    margin-left: 10vw;
    margin-top: 3vh;
    font-size: 18px;
}

.common-zone{
    margin-left: 10vw;

    font-size: 18px;

    display: grid;
    grid-template-columns: repeat(2, 20vw);
}

.input-value{
    width: 100%;
    height: 4vh;
}


.input-fio-value{
    width: 100%;
}

.input-fio-zone{
    margin-right: 5vw;
}

.common-fio-zone{
    margin-left: 10vw;
    display: grid;
    grid-template-columns: 20vw 48vw 1vw;
    margin-top: 10px;
}

.prefix{
    margin-top: 5vh;

    margin-left: 10vw;
    display: flex;
    width: 70vw;
}

.cap{
    margin-left: auto;
}

.btn-zone{

    height: 30vh;
    width: 100%;

    display: flex;
    justify-content: space-around;
    align-items: flex-end;
}

.execute-btn{
    width: 5vw;
    height: 3vh;

    font-size: 18px;
}

#delete-btn{
    border-radius: 10px;
    border-width: 0px;
    background-color: red;
    color: white;
    width: 5vw;
    height: 4vh;
    font-size: 18px;
}

#delete-btn:hover{
    background-color: white;
    border-color: red;
    border-width: 1px;
    color: red;
}

</style>