import { useQuery } from "@tanstack/vue-query";
import type { PaginatedQueryParams } from "~/utils/sharedTypes";
import type { PaginatedTicketsResponse } from "../types";


export function useTicketsAssignedToMyOffice({
    page = 1,
    searchQuery = undefined,
}: PaginatedQueryParams){
    return useQuery({
        queryKey: ["tickets", "assignedToMyOffice", page, searchQuery],
        queryFn: async () => {
            const res = await apiReq({
                method: "GET",
                url: "/tickets/assigned-to-my-office",
                payload: {
                    page,
                    searchQuery
                }
            })

            return res as PaginatedTicketsResponse
        }
    })
}


export function useTicketsSentByMyOffice({
    page = 1,
    searchQuery = undefined,
}: PaginatedQueryParams){
    return useQuery({
        queryKey: ["tickets", "sentByMyOffice", page, searchQuery],
        queryFn: async () => {
            const res = await apiReq({
                method: "GET",
                url: "/tickets/sent-by-my-office",
                payload: {
                    page,
                    searchQuery
                }
            })

            return res as PaginatedTicketsResponse
        }
    })
}