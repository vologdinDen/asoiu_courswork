<script>
export default {
    name: "login-page",
    
    data() {
        return{
            login: "",
            password: "",
            try_count: 0,
            failed_login: false,
            tip: false
        }
    },
    methods: {
        onSubmit() {
            let response = this.$store.dispatch('auth/onLogin', {
                login: this.login,
                password: this.password
            })
            if (localStorage.getItem('token') !== 'null'){
                this.try_count = 0
                this.$router.push({ name: 'home' })
            } else {
                this.failed_login = true
                this.try_count ++
            }

            if (this.try_count >= 5){
                this.tip = true
            }

            this.login = ""
            this.password = ""

        }
    }
}
</script>

<template>
    <main-header></main-header>
    <div class="main-zone">
        <div class="welcome">
            <!-- <img></img> -->
            <h1>Волейбольные соревнования</h1>
            <h1>Добро пожаловать!</h1>
        </div>
        <div class="input-zone">
            <form type="submit" @submit.prevent @submit="onSubmit">
                    <h4>Логин</h4>
                    <input type="text" class="input" v-model="login"/>
                    <h4>Пароль</h4>
                    <input type="password" class="input" v-model="password" />
                
                    <div class="error" v-if="this.failed_login">
                        <p>Неправильный логин или пароль</p>
                    </div>

                    <div class="tip" v-if="this.tip">
                        <p>Слишком много попыток авторизоваться, обратитесь в поддержку для сброса пароля</p>
                    </div>
                
                    <button class="btn">Войти</button>
            </form>
        </div>
    </div>
</template>

<style>

.main-zone{
    display: flex;
    justify-content: center;
    height: 80vh;
    align-items: center;
    flex-direction: column;
}

.welcome{
    margin-top: 10px;
}

.input-zone{
    display: flex;
    justify-content: center;
    width: 50vw;
    margin-top: 10px;

}

.input{
    width: 100%;
    padding: 10px 15px;
}

form{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.btn {
    margin-top: 10px;
    align-self: flex-start;
    padding: 10px 15px;
}

.error{
    color: red;
    margin-top: 10px;
}

.tip{
    color: blue;
}


</style>