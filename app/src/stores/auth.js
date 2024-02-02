import {defineStore} from 'pinia';
import api  from '../plugins/axios';
import cookies from '../services/cookies';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        user:null,
        settings:null
    }),
    actions:{
        async isLogged(){
           
            try {
                const response = await api.get('/auth/me');
               
                if (response.data.status === 201) {
                   
                  return response.data.user;
                }
            } catch (error) {
           
                if (error.response && error.response.status === 401) {
                    const errorMessage = error.response.data.message;
                    return null; // Exibe a mensagem de erro no console ou faça algo diferente com ela
                } else {
                    // Lidar com outros erros de rede ou servidor
                    console.error('Erro inesperado:', error);
                }
                this.logout();
            }
            return null;
        },
        async login(payload){

            const response = await api.post('/auth/login', payload);
           
            
            if(response.data && response.data.user.id){
               
                this.user = response.data.user;
                //this.settings = response.data.settings;
                cookies.setToken(response.data.accessToken);

                return true;
            }   
            return false;

        },
        async logout(){
        
            
            const response = await api.get('/auth/logout');
            console.log(response);
            if(response.data){
                
                this.user = null;
                this.settings = null;
                cookies.deleteToken();
                
                return true;
            }
            return false;
            
        },
       
    }


});