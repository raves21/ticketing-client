import { defineStore } from "pinia";
import type {Component} from "vue"

type State = {
    isOpen: boolean,
    component: Component | null,
    props: Record<string, any> | null
}

const defaultState: State = {
    isOpen: false,
    component: null,
    props: null
}

export const useStore = defineStore("store", {
    state: () => defaultState,
    actions: {
        open(component: Component, props = {}) {
            this.isOpen = true;
            this.component = component;
            this.props = props;
        },
        close() {
            this.isOpen = false;
            this.component = null;
            this.props = null;
        }
    }
})
