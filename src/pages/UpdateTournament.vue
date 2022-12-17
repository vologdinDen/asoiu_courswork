<script>
export default {
    data() {
        return {
            selected_place: '',
            selected_date: null,
            selected_format: '',
            selected_judgments: '',

            tournament_name: null,
            prize: null,
            about: null,

            selected_tournament: null,

            places: [
                {
                    address: "ул. Пушкниа, д. 31"
                },
                {
                    address: "ул. Лермонтова, д. 73"
                },
                {
                    address: 'Спортивный комплекс "Спорт", корпус Б'
                },
                {
                    address: "ул. Ленина, д. 2"
                },
            ],

            judgest: [
                {
                    name: "Коромыслов К. К"
                },

                {
                    name: "Лавочкин К. К"
                },

                {
                    name: "Стулов К. К"
                },
            ],

            unselected_judgest: this.judgest,

            formats: [
                {
                    value: "Классический"
                },

                {
                    value: "Пляжный"
                },

                {
                    value: "Плей-офф"
                },

                {
                    value: "Круговой"
                }

            ]

        }
    },

    methods: {
        minDate() {
            let today = new Date();
            let day = String(today.getDate()).padStart(2, '0');
            let month = String(today.getMonth() + 1).padStart(2, '0');
            let year = today.getFullYear();
            return year + '-' + month + '-' + day
        },

        delete_tournament() {
            
            let tournaments = JSON.parse(localStorage.getItem("tournaments"))

            tournaments = tournaments.filter(el => {
                return el.id !== this.selected_tournament.id;
            })

            tournaments.forEach((el, index) => {
                el.id = index;
            })

            localStorage.setItem("tournaments", JSON.stringify(tournaments))

            alert("Турнир удалён!")
            this.$router.push("/")

        },

        update_tournament() {
            if (this.tournament_name === '') {
                alert("Вы не указали название турнира")
                return
            }
            if (this.prize === null) {
                alert("Вы не указали призовой фонд")
                return
            }
            if (this.about === null) {
                alert("Вы не указали краткое описание")
                return
            }
            if (this.selected_place === '') {
                alert("Вы не указали место проведения")
                return
            }
            if (this.selected_date === null) {
                alert("Вы не указали дату проведения")
                return
            }
            if (this.selected_format === '') {
                alert("Вы не указали формат")
                return
            }
            if (this.selected_judgments === '') {
                alert("Вы не указали судейский состав")
                return
            }

            let tournaments = JSON.parse(localStorage.getItem('tournaments'))
            
            let updateed_tournaments = {
                id: this.selected_tournament.id,
                title: this.tournament_name,
                about: this.about,
                img: this.selected_tournament.img,
                prize: this.prize,
                tournament_format: this.selected_format,
                judges: this.selected_judgments,
                date: this.selected_date,
                place: this.selected_place,
                organizer: this.selected_tournament.organizer,

                teams: tournaments[this.$route.params.id].teams,
                result: tournaments[this.$route.params.id].result
            }

            tournaments[this.$route.params.id] = updateed_tournaments

            localStorage.setItem('tournaments', JSON.stringify(tournaments))
            alert("Турнир успешно изменён!")

            this.$router.push(`/tournament/${this.$route.params.id}`)
        }
    },

    mounted() {

        this.selected_tournament = JSON.parse(localStorage.getItem("tournaments"))[this.$route.params.id]
    
        this.selected_place = this.selected_tournament.place
        this.selected_date = this.selected_tournament.date
        this.selected_format = this.selected_tournament.tournament_format
        this.selected_judgments = this.selected_tournament.judges

        this.tournament_name = this.selected_tournament.title
        this.prize = this.selected_tournament.prize
        this.about = this.selected_tournament.about
    }
}
</script>

<template>
    <main-header>
        <h2>Изменение турнира</h2>
    </main-header>
    <div class="main-zone">
        <div class="title">
            <h2 >Изменение турнира</h2>
        </div>
        
        <div class="input-zone">
            
            <div class="input-row">
                <p>Название турнира</p>

                <div class="input-field">
                    <input class="input-form" type="text" v-model="tournament_name"/>
                </div>
            </div>


            <div class="input-row">
                <p>Место проведения турнира</p>

                <div class="input-field">
                    <select v-model="selected_place">
                        <option disabled value="">Выберите что-нибудь из списка</option>
                        <option v-for="place in this.places" :key="place.address" :value="place.address">{{ place.address }}</option>
                    </select>
                </div>
            </div>

            <div class="input-row">
                <p>Дата проведения</p>

                <div class="input-date">
                    <input type="date" :min="minDate()" v-model="selected_date"/>
                </div>
            </div>

            <div class="input-row">
                <p>Призовой фонд</p>

                <div class="input-field">
                    <textarea class="input-textarea" v-model="prize"></textarea>
                </div>
            </div>

            <div class="input-row">
                <p>Формат турнира</p>

                <div class="input-field">
                    <select v-model="selected_format">
                        <option disabled value="">Выберите что-нибудь из списка</option>
                        <option v-for="format in this.formats" :key="format.value" :value="format.value">{{ format.value }}</option>
                    </select>
                </div>
            </div>

            <div class="input-row">
                <p>Судейский состав</p>

                <div class="input-field">
                    <select v-model="selected_judgments">
                        <option disabled value="">Выберите кого-нибудь из списка</option>
                        <option v-for="judgment in this.judgest" :key="judgment.name" :value="judgment.name">{{ judgment.name }}</option>
                    </select>
                </div>
            </div>

            <div class="input-row">
                <p>Краткое описание турнира</p>

                <div class="input-field">
                    <textarea class="input-textarea" v-model="about"></textarea>
                </div>
            </div>

        </div>

        <div class="btn-zone">

            <button class="delete-btn" @click="delete_tournament">Удалить</button>
            
            <button class="control-btn" @click="update_tournament">Изменить</button>

        </div>
    </div>
</template>

<style scoped>
.main-zone{
    height: 100%;

    display: flex;
}

.title{
    display: flex;
    width: 75vw;
    margin-top: 2vh;
    justify-content: center;
    font-size: 3vh;
}

.input-zone{
    width: 75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.input-row {
    display: grid; 
    grid-template-columns: repeat(2, 30vw);

    font-size: 18px;

    margin-top: 15px;
}

.input-form{
    width: 100%;
}

.input-textarea{
    width: 100%;
    height: 15vh;
}

.btn-zone{
    height: 15vh;
    width: 100%;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.control-btn{
    width: 5vw;
    height: 4vh;
    font-size: 18px;
}

.delete-btn{
    border-radius: 10px;
    border-width: 0px;
    background-color: red;
    color: white;
    width: 5vw;
    height: 4vh;
    font-size: 18px;
}

.delete-btn:hover{
    background-color: white;
    border-color: red;
    border-width: 1px;
    color: red;
}
</style>