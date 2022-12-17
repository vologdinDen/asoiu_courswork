<script>
export default {
    name: "home-page",

    data() {
        return {
            tournaments: [
            {
                "id": 0,
                "title": "Первый",
                "about": "",
                "img": "first_tournament.jpeg",
                "prize": "1 место - Золотые медали\n2 место - Серебрянные медали\n3 место - Бронзовые медали",
                "tournament_format": "Классический",
                "judges": "Стулов К. К",
                "date": "2012-07-07",
                "place": "ул. Свитерочная, д. 31",
                "organizer": "admin",
                "teams": [
                    {
                        "teamname": "zxc",
                        "crew": [
                            "Динозавриков А. А",
                            "Печенюшкин А. А",
                            "Чай А. А",
                            "Лугов А. А",
                            "Попов А. А",
                            "Умный А. А"
                        ],
                        "captain": 0
                    },
                    {
                        "teamname": "asd",
                        "crew": [
                            "Тестовый А. А",
                            "Тестовый А. Б",
                            "Тестовый А. В",
                            "Тестовый А. Г",
                            "Тестовый А. Е",
                            "Динозавриков А. А"
                        ],
                        "captain": 4
                    },
                    {
                        "teamname": "Beer Lover",
                        "crew": [
                            "Тестовый А. Е",
                            "Тестовый А. А",
                            "Попов А. А",
                            "Динозавриков А. А",
                            "Тестовый А. Б",
                            "Тестовый А. А"
                        ],
                        "captain": 1
                    },
                    {
                        "teamname": "Пацаны",
                        "crew": [
                            "Печенюшкин А. А",
                            "Тестовый А. А",
                            "Чай А. А",
                            "Тестовый А. Б",
                            "Тестовый А. В",
                            "Лугов А. А"
                        ],
                        "captain": 4
                    },
                    {
                        "teamname": "Барселона",
                        "crew": [
                            "Печенюшкин А. А",
                            "Чай А. А",
                            "Тестовый А. Г",
                            "Попов А. А",
                            "Динозавриков А. А",
                            "Тестовый А. Г"
                        ],
                        "captain": 1
                    }
                ],
                "result": [
                    {
                        "teamname": "Beer Lover",
                        "crew": [
                            "Тестовый А. Е",
                            "Тестовый А. А",
                            "Попов А. А",
                            "Динозавриков А. А",
                            "Тестовый А. Б",
                            "Тестовый А. А"
                        ],
                        "captain": 1
                    },
                    {
                        "teamname": "Пацаны",
                        "crew": [
                            "Печенюшкин А. А",
                            "Тестовый А. А",
                            "Чай А. А",
                            "Тестовый А. Б",
                            "Тестовый А. В",
                            "Лугов А. А"
                        ],
                        "captain": 4
                    },
                    {
                        "teamname": "Барселона",
                        "crew": [
                            "Печенюшкин А. А",
                            "Чай А. А",
                            "Тестовый А. Г",
                            "Попов А. А",
                            "Динозавриков А. А",
                            "Тестовый А. Г"
                        ],
                        "captain": 1
                    },
                    {
                        "teamname": "zxc",
                        "crew": [
                            "Динозавриков А. А",
                            "Печенюшкин А. А",
                            "Чай А. А",
                            "Лугов А. А",
                            "Попов А. А",
                            "Умный А. А"
                        ],
                        "captain": 0
                    },
                    {
                        "teamname": "asd",
                        "crew": [
                            "Тестовый А. А",
                            "Тестовый А. Б",
                            "Тестовый А. В",
                            "Тестовый А. Г",
                            "Тестовый А. Е",
                            "Динозавриков А. А"
                        ],
                        "captain": 4
                    }
                ]
            },
            {
                "id": 1,
                "title": "Второй",
                "about": "Краткое описание не нужно",
                "img": "",
                "prize": "1500$ всем",
                "tournament_format": "Пляжный",
                "judges": "Лавочкин К. К",
                "date": "2022-12-15",
                "place": "ул. Карандашкина, д. 73",
                "organizer": "admin",
                "teams": []
            },
            {
                "id": 2,
                "title": "Новогодний",
                "about": "Для тех, кому нечего делать на Новый год",
                "img": "third_tournament.jpg",
                "prize": "Манадарины",
                "tournament_format": "Классический",
                "judges": "Коромыслов К. К",
                "date": "2022-12-31",
                "place": "Спортивный комплекс \"Динозаврик\", корпус Б",
                "organizer": "admin",
                "teams": []
            },
            ]
        }
    },

    methods: {
        tournamentDetail(tournament) {
            this.$router.push(`/tournament/${tournament.id}`)
        },

        isDefaultUser() {
            return localStorage.getItem("userRole") === "user_common";
        }
    },

    mounted() {
        if (localStorage.hasOwnProperty("tournaments")) { 
            this.tournaments = JSON.parse(localStorage.getItem("tournaments"));
        } else {
            localStorage.setItem("tournaments", JSON.stringify(this.tournaments))
        }
    }
}
</script>

<template>
    <main-header>
        <h2>
            Главная
        </h2>
    </main-header>
    <div class="main-zone">
        <div class="prefix">
            <h1>Главная страница</h1>
            
            <div class="btn-zone">

                <button class="execute-btn" v-if="!isDefaultUser()" @click="this.$router.push('/tournament/add')">Добавить турнир</button>
                <button class="execute-btn" v-if="!isDefaultUser()" @click="this.$router.push('/tournament/report')">Отчёт по турнирам за определённый период</button>
                <button class="execute-btn" v-if="!isDefaultUser()" @click="this.$router.push('/tournament/control')">Управление турнирами</button>

            </div>
        </div>
        
        <div class="tournament-zone">
            <div class="tournament" v-for="tournament in this.tournaments">
                <div class="img-zone">
                    <img v-if="tournament.img !== ''" class="image" :src="`./src/images/${tournament.img}`"/>
                    <img v-else src="@/images/no_image.png"/>
                </div>
                
                <div class="text-zone">
                    <h2 @click="tournamentDetail(tournament)" class="tournament-name">
                        {{ tournament.title }}
                    </h2>
                
                    <p class="tournament-about">
                        {{ tournament.about }}
                    </p>
                </div>
    
                <button class="btn" @click="tournamentDetail(tournament)">Подробнее</button>
                
            </div>
        </div>

    </div>
</template>

<style scoped>

.prefix{
    display: flex;
    width: 75vw;

    align-items: center;
}

h1{
    justify-self: flex-start;
    margin-bottom: 30px;
    margin-top: 30px;
    font-size: 5vh;
}
.main-zone{
    display: flex;
    height: 100%;
}

.tournament{
    width: 75vw;
    height: 20vh;
    background-color: rgb(214, 214, 214);
    margin-bottom: 3vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
}

.tournament-name{
    margin-bottom: 10px;
    margin-top: 10px;
}
.tournament-name:hover{
    cursor: pointer;
}

.tournament-zone{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: 60vh;
    /* margin-bottom: 3vh; */
}

.tournament-about{

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: justify;
    text-overflow: ellipsis;
}

.img-zone{
    width: 15%;
    /* background-color: black; */
    color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-zone{
    width: 45vw;
    height: 20vh;
    margin-left: 2vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    justify-self: flex-end;

    /* margin-bottom: auto; */
}

.execute-btn{
    height: 3.5vh;
    width: fit-content;
    font-size: 18px;
}

.btn{
    margin-left: auto;
    margin-right: 1vw;
    align-self: center;
    width: 9vw;
    font-size: 18px;
}

.text-zone{
    margin-left: 10px;
    padding-right: 10px;
    width: 75%;
}

.image{
    object-fit: fill;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
</style>