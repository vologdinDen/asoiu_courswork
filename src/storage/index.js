import { createStore } from "vuex";
import { AuthModule } from "./AuthModule";

export default createStore({
    modules:{
        auth: AuthModule
    }
})