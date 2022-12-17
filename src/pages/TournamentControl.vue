<script>
export default {
    name: "tournament-control",

    data() {
        return {
            tournaments: []
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
        let tournaments = JSON.parse(localStorage.getItem("tournaments"));
        tournaments.map(el => {
            if (el.organizer === localStorage.getItem("userRole")) {
                this.tournaments.push(el)
            }
        })
    }
}
</script>

<template>
    <main-header>
        <h2>
            Управление турнирами
        </h2>
    </main-header>
    <div class="main-zone">
        <div class="prefix">
            <h1>Главная страница</h1>  
        </div>
        
        <div class="tournament-zone">
            <div class="tournament" v-for="tournament in this.tournaments">
                <div class="img-zone">
                    {{ tournament.img }}
                </div>
                
                <div class="text-zone">
                    <h2 @click="tournamentDetail(tournament)" class="tournament-name">
                        {{ "Турнир " + '"' + tournament.title + '"' }}
                    </h2>
                
                    <p class="tournament-about">
                        {{ tournament.about }}
                    </p>
                </div>
    
                <button class="btn" @click="tournamentDetail(tournament)">Подробнее</button>
                
            </div>
        </div>

        <div class="btn-zone">

            <button class="execute-btn" v-if="!isDefaultUser()" @click="this.$router.push('/tournament/add')">Добавить турнир</button>

        </div>
    </div>
</template>

<style scoped>

.prefix{
    display: flex;
    width: 75vw;
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
    background-color: red;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-zone{
    width: 75vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    justify-self: flex-end;

    margin-bottom: auto;
}

.execute-btn{
    height: 40%;
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
</style>