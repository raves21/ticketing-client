import { useQuery } from "@tanstack/vue-query";
import type { PaginatedQueryParams } from "~/utils/sharedTypes";
import type { PaginatedTicketsResponse, Ticket } from "../types";
import axios from "axios";


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
            const res =
             await apiReq({
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

export function useTicketInfo(ticketId: string) {
    return useQuery({
        queryKey: ["tickets", ticketId],
        queryFn: async () => {
            const {data: ticket} = await apiReq({
                method: "GET",
                url: `/tickets/${ticketId}`,
            })

            return ticket as Ticket
        }
    })
}