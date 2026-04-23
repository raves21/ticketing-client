import type { PaginationProps } from "~/utils/sharedTypes";
import type { Office } from "../offices/types";
import type { User } from "../auth/types";

export type PaginatedTicketsResponse = {
    data: Ticket[]
} & PaginationProps

export type Ticket = {
    id: number
    code: string
    title: string
    description: string
    status: string
    priority_level: string
    creator: User
    sender_office: Office
    recipient_office: Office
}