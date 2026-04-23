
type Args = {
    url: string
    method: "POST" | "GET" | "PUT" | "DELETE"
    payload?: any
}

export async function apiReq({method, url, payload}: Args): Promise<any>{

    const token = localStorage.getItem("token");

    if(!token && url !== "/auth/login"){
        localStorage.clear();
        navigateTo("/");
        return;
    }

    const rtc = useRuntimeConfig()
    let config: Record<string, any> = {
        baseURL: rtc.public.API_BASE_URL,
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    }
    
    if(method === "GET"){
        config = {
            ...config,
            query: payload
        }
    }
    else{
        config = {
            ...config,
            body: payload
        }
    }

    try {
        return await $fetch(url, config);
    } catch (error: any) {
        console.log(error);
        switch(error.response.status){
            case 401:
                localStorage.clear();
                navigateTo("/");
                break;

            case 403: 
                navigateTo("/");
                break;

            default: 
                throw error;
        }
    }
}