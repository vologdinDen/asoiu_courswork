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

        reset() {
            this.selected_place = ''
            this.selected_date = null
            this.selected_format = ''
            this.selected_judgments = ''

            this.tournament_name = null
            this.prize = null
            this.about = null

        },

        add_tournament() {
            if (this.tournament_name === null) {
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
            
            tournaments.forEach(el => {
                el.id = el.id + 1
            })
            
            tournaments.unshift({
                id: 0,
                title: this.tournament_name,
                about: this.about,
                img: "Изображение",
                prize: this.prize,
                tournament_format: this.selected_format,
                judges: this.selected_judgments,
                date: this.selected_date,
                place: this.selected_place,
                organizer: localStorage.getItem('userRole')
            })

            localStorage.setItem('tournaments', JSON.stringify(tournaments))
            alert("Турнир успешно добавлен!")

            this.$router.push("/")
        }
    }
}
</script>

<template>
    <main-header>
        <h2>Добавление турнира</h2>
    </main-header>
    <div class="main-zone">
        <div class="title">
            <h2 >Добавление нового турнира</h2>
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

            <button class="control-btn" @click="reset">Сбросить</button>
            
            <button class="control-btn" @click="add_tournament">Добавить</button>

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

</style>