import {useQuery} from "@tanstack/vue-query"
import type { User } from "../types"

export function useCurrentUser(){
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await apiReq({
                method: "GET",
                url: "/auth/me",
            });
            const user = res.data as User;
            localStorage.setItem("currentUser", JSON.stringify(user))
            return user;
        }
    })
}