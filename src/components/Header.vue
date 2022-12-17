<script>
export default{
    name: "main-header",

    data() {
        return {
            usernames: {
                "admin" : "Иванов И. И",
                "user_creator": "Петров П. П",
                'user_common': "Сидоров П. П"
            }
        }
    },


    methods: {
        toHome() {
            this.$router.push({name: "home"})
        },

        toLogin() {
            this.$store.dispatch('auth/onLogout');
            this.$router.push("/login");
        },

        isAuthorized() { 
            return localStorage.getItem("token");
        },

        getUserRole() {
            return localStorage.getItem("userRole")
        }
    },

}
</script>

<template>
    <div class="header">
        <div>
            <img class="ball-img" src="./../assets/ball.png"/>
        </div>
        
        <div class="text-zone">
            <h1 @click="toHome">Волейбольные соревнования</h1>
            <slot></slot>
            <!-- <span class="chips" v-for="item in this.$route.matched" @click="this.$router.push({name: item.name})">
                {{item.name}}
                 / 
            </span> -->
            <!-- {{ this.$router.options.history }} -->
        </div>

        <div class="authorize-zone" v-if="isAuthorized()">

            <div class="username">
                {{ this.usernames[getUserRole()] }}
            </div>

            <button @click="toLogin" class="logout-btn">Выход</button>
        </div>

        <div>
        </div>
    </div>
</template>

<style scoped>

.text-zone{
    margin-left: 10px;
}

h1:hover{
    cursor: pointer;
}

.header{
    display: flex;
    background-color: rgb(214, 214, 214);
    height: 15vh;
}
.ball-img{
    height: 15vh;
    object-fit: fill;
}

.authorize-zone{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* padding-top: 2vh; */
    margin-left: auto;
    margin-right: 10vw;

    font-size: 3vh;
}

.logout-btn{
    width: 5vw;
}
</style>