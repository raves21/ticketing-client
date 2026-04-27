import { useMutation } from "@tanstack/vue-query";


export function useCreateTicket(){
    return useMutation({
        mutationFn: async (formData: FormData) => {
            await apiReq({
                method: "POST",
                url: "/tickets",
                payload: formData
            })
        }
    })
}