<script>
export default {
    name: "detail-tournament",

    data() {
        return {
            tournament: {},
            ogranizers: {
                "admin" : "Иванов И. И",
                "user_creator": "Петров П. П",
            },
            url: null
        }
    },

    created() {
        this.tournament = JSON.parse(localStorage.getItem('tournaments'))[this.$route.params.id]
    },

    methods: {
        isCommonUser() {
            return localStorage.getItem("userRole") === "user_common"
        },

        isCreator() {
            return this.tournament.organizer === localStorage.getItem("userRole") || localStorage.getItem("userRole") === "admin" 
        },

        isDone() {
            let date = new Date(this.tournament.date)
            let today = new Date(Date.now())

            return date < today
        },
    }
}
</script>

<template>
    <main-header>
        <h2>
            {{ this.tournament.title }}
        </h2>
    </main-header>

    <div class="main-zone">
        
        <div class="img-zone">
            <img v-if="this.tournament.img !== ''" class="image" :src="`../../src/images/${this.tournament.img}`"/>
            <img v-else src="@/images/no_image.png"/>
        </div>

        <div class="text-zone">
            <div class="title">
                <h1>{{ this.tournament.title }}</h1>
            </div>

            <div class="info-zone">
                <div class="tournament">
                    <p>Призовой фонд</p>

                    <div class="info-state">
                        {{ this.tournament.prize }}
                    </div>
                </div>

                <div class="tournament">
                    <p>Формат турнира</p>

                    <div class="info-state">
                        {{ this.tournament.tournament_format }}
                    </div>
                </div>

                <div class="tournament">
                    <p>Организатор</p>

                    <div class="info-state">
                        {{ this.ogranizers[this.tournament.organizer]}}
                    </div>
                </div>

                <div class="tournament">
                    <p>Место проведения турнира</p>

                    <div class="info-state">
                        {{ this.tournament.place}}
                    </div>
                </div>


                <div class="tournament">
                    <p> Дата проведения турнира</p>

                    <div class="info-state">
                        {{ this.tournament.date }}
                    </div>
                </div>


                <div class="tournament">
                    <p> Судейский состав</p>

                    <div class="info-state">
                        {{ this.tournament.judges }}
                    </div>
                </div>


                <div class="tournament">
                    <p> Краткое описание турнира</p>

                    <div class="info-state">
                        {{ this.tournament.about }}
                    </div>
                </div>


            </div>
        </div>

        
    </div>
    <div class="btn-zone">

        <button class="execute-btn" v-if="!isCreator() && !isDone()" @click="this.$router.push(`/tournament/part/add/${this.$route.params.id}`)">Стать участником</button>

        <button class="execute-btn" v-if="!isCreator()" @click="this.$router.push(`/tournament/result/view/${this.$route.params.id}`)">Узнать результат</button>

        <button class="execute-btn" v-if="isCreator()" @click="this.$router.push(`/tournament/update/${this.$route.params.id}`)">Изменить</button>

        <button class="execute-btn" v-if="isCreator()" @click="this.$router.push(`/tournament/result/add/${this.$route.params.id}`)">Записать результат</button>

    </div>

</template>

<style scoped>

.main-zone{
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    height: 75vh;
}

.img-zone{
    /* background-color: black; */
    color: white;
    height: 100%;
    width: 15vw;
    height: 20vh;
    margin-top: 5vh;
    margin-bottom: auto;

    margin-right: auto;
    margin-left: 10vw;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    
}

.text-zone{
    height: 100%;
    width: 100%;
    margin-left: 3vw;

    display: flex;
    flex-direction: column;
}

.title{
    margin-top: 5vh;
}

.info-zone{
    margin-top: 2vh;
    white-space: pre-line;

}

.tournament{
    display: grid;
    grid-template-columns: repeat(2, 20vw);
    margin-bottom: 10px;
}

.info-state{
    overflow-wrap: break-word;
}

.btn-zone{
    height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.execute-btn{
    width: 10vw;
    height: 4vh;
    font-size: 18px;
}

.image{
    object-fit: fill;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}


</style>