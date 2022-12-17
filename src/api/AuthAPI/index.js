export const Auth = {

    login(login, password) {

        let auth_info = {
            token: null,
            userRole: null
        }

        if ((login === "admin" || login === "user_common" || login === "user_creator") && password === "admin123"){
            auth_info.token = "hdfnbidjfbhsdkfh950gj;"
            auth_info.userRole = login
        
        }
        return auth_info 
    },

    logout() {
        return true
    }
}