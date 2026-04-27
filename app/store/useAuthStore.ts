

import { defineStore } from "pinia";
import type { User } from "~/domains/auth/types";

type State = {
    currentUser: User | null
}

const defaultState: State = {
    currentUser: null
}

export const useAuthStore = defineStore("authStore", {
    state: () => defaultState,
    actions: {
        setCurrentUser(user: User | null){
            if(user){
                localStorage.setItem("currentUser", JSON.stringify(user))
            }
        },
    }
})
