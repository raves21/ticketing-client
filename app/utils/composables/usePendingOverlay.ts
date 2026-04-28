import { type MaybeRefOrGetter, toValue } from "vue";
import { useGlobalStore } from "~/store/useGlobalStore";

type Args = {
    isPending: MaybeRefOrGetter<boolean>
    pendingMessage: string
}

export function usePendingOverlay({isPending, pendingMessage}: Args){
    const {setIsPending, setPendingMessage} = useGlobalStore()

    watchEffect(() => {
        setIsPending(toValue(isPending))
        setPendingMessage(pendingMessage)
    })
}