import type { Office } from "../offices/types"

export type LoginResponse = {
    token: string
    user: User
}

export type User = {
    id: string
    first_name: string
    last_name: string
    email: string
    role: string
    office: Office
    permissions: string[] | undefined
}