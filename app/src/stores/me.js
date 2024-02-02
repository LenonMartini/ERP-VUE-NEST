import { defineStore } from "pinia";
import api from '../plugins/axios';
import { useAuthStore as auth, useAuthStore} from "./auth";

export const useMeStore = defineStore('me', {
    state: () => {
      return {
        
      }
        
    },

    actions:{
        async getMe(){
         
          const auth = useAuthStore();   
              
          await api.get('auth/me').then((r) => {                  
             auth.user = r.data.user;
             //auth.settings = r.data.settings;  
            //this.user = r.data.data          
          })    
          
        },
               
    },
    
});