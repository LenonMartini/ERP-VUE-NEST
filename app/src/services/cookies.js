const TOKEN_NAME = '_gm_token';

export default{
    setToken(token){
        localStorage.setItem(TOKEN_NAME, token);

    },

    getToken(){
        return localStorage.getItem(TOKEN_NAME);
    },

    deleteToken(){
         localStorage.removeItem(TOKEN_NAME);
    }

};