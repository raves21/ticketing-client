import { useGlobalStore } from "~/store/useGlobalStore";

type Args = {
    isPending: boolean
    pendingMessage: string
}

export function usePendingOverlay({isPending, pendingMessage}: Args){
    const {setIsPending, setPendingMessage} = useGlobalStore()

    watchEffect(() => {
        setIsPending(isPending)
        setPendingMessage(pendingMessage)
    })
}