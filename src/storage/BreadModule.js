

export const BreadCumbs = {
    namespaced: true,

    state() {
        return {
            path: localStorage.getItem('bread') || []
        }
    },

    getters: {
        getPath: (state) => state.path
    },

    mutations: {
        pushPath(newNode) {
            if (state.path.indexOf(element => element.name === newNode.name)) {
                state.path = state.path
            }
            

            localStorage.setItem('bread', state.path)
        }
    },

    actions: {
        pushToPath({commit}, {newNode}) {
            commit('pushPath', newNode) 
        }
    }

}