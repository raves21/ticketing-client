import {useMutation} from '@tanstack/vue-query'
import type { LoginResponse } from '../types';
import { useAuthStore } from '~/store/useAuthStore';


export function useLogin(){
    return useMutation({
        mutationFn: async ({email, password}: {email: string, password: string}) => {
            const {setCurrentUser} = useAuthStore()
            const {token, user} = await apiReq({
                method: "POST",
                url: "/auth/login",
                payload: {email, password}
            }) as LoginResponse;
            localStorage.setItem('token', token);
            setCurrentUser(user);
        }
    })
}


export function useLogout(){
    return useMutation({
        mutationFn: async () => {
            await apiReq({
                method: "POST",
                url: '/auth/logout',
            })
        },
        onSuccess: () => {
            localStorage.clear();
            navigateTo("/login");
        }
    })
}