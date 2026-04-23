

export function matchesRoute({routeName, fuzzy = false} : {routeName: string, fuzzy: boolean}){
    const route = useRoute();
    
    if(fuzzy){
        return route.path.includes(routeName)
    }

    return route.path === routeName;
}