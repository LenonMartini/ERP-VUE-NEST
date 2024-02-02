import {defineStore} from 'pinia';


export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoadding:false
    }),
    actions:{
        setIsLoading(payload){
            this.isLoadding = payload
        }
    }
});