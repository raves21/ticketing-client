import { defineStore } from "pinia";
import { markRaw } from "vue";
import type { Component } from "vue";

type State = {
    dialog: {
        isOpen: boolean,
        content: Component | null,
        props: Record<string, any> | null
    },
    pendingOverlay: {
        isPending: boolean,
        message: string
    }
}

const defaultState: State = {
    dialog: {
        isOpen: false,
        content: null,
        props: null
    },
    pendingOverlay: {
        isPending: false,
        message: "Loading"
    }
}

export const useGlobalStore = defineStore("globalStore", {
    state: () => defaultState,
    actions: {
        openDialog(component: Component, props = {}) {
            this.dialog.content = markRaw(component);
            this.dialog.props = props;
            this.dialog.isOpen = true;
        },
        closeDialog() {
            this.dialog.isOpen = false;
            setTimeout(() => {
                this.dialog.content = null;
                this.dialog.props = null;
            }, 150);
        },
        setIsPending(value: boolean){
            this.pendingOverlay.isPending = value
        },
        setPendingMessage(message: string){
            this.pendingOverlay.message = message
        }
    }
})
