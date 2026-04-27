import { useQuery } from "@tanstack/vue-query";
import type { Office } from "../types";


export function useOffices(){
    return useQuery({
        queryKey: ["offices"],
        queryFn: async () => {
            const {data} = await apiReq({
                method: 'GET',
                url: "/offices",
            })

            return data as Office[]
        }
    })
}