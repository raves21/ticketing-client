import { useQuery } from "@tanstack/vue-query";
import type { Office } from "../types";

export function useOffices(payload: Record<string, any> = {}){
    return useQuery({
        queryKey: ["offices", payload],
        queryFn: async () => {
            const {data} = await apiReq({
                method: 'GET',
                url: "/offices",
                payload
            })

            return data as Office[]
        }
    })
}