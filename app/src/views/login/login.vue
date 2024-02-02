<template>
  <div class="container">
    <Loading v-if="loading.isLoadding" :message="'Logando...'"/>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
            <div class="card card-login col-12 col-sm-12 col-md-8 col-lg-5 shadow-lg p-4">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                        <img src="../../assets/logo1.png" class="logo-login"/>
                    </div>
                </div>
                <Form class="p-3" @submit="handleSubmit" :validation-schema="schema">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                <label for="email">E-mail</label>
                                <Field
                                  class="form-control"
                                  name="email"
                                  autocomplete="off"
                                  :disabled="loading.isLoadding"
                                />
                                <ErrorMessage name="email" class="text-danger" />
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                                <label for="password">Senha</label>
                                <Field
                                  type="password"
                                  class="form-control"
                                  name="password"
                                  autocomplete="off"
                                  :disabled="loading.isLoadding"
                                 
                                />
                                <ErrorMessage name="password" class="text-danger" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 d-grid">
                                <button 
                                    type="submit" 
                                    class="btn btn-danger"
                                    :disabled="loading.isLoadding"
                                >
                                    <font-awesome-icon :icon="faSignIn" />
                                    Acessar
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useLoadingStore } from '../../stores/loading';
import { useAuthStore } from '../../stores/auth';
import Loading from '../../components/Loading.vue';
const router = useRouter();
const loading = useLoadingStore();
const auth = useAuthStore();

// Defina o esquema de validação usando Yup
const schema = yup.object({
    email: yup.string()
           .required('Erro: O campo de E-mail é obrigatório')
           .email('Erro: O E-mail informado deve ser um email valido!!!'),
    password: yup.string()
            .required('Erro: O campo de Senha é obrigatório')
            .min(6,'A senha deve conter no minimo 6 caracteres'),
});
const handleSubmit = async(user) => {
  
    if(!user){return;}

    loading.setIsLoading(true);

    const payload  = {email: user.email, password: user.password}
    
   
    if(payload){
        const response = await auth.login(payload);
        if(response){           
            setTimeout(() => {             
                router.push({name: 'home' });                        
                loading.setIsLoading(false);
            }, 2000);
        } 
    }
    
}
</script>

<style scoped>
.card-login {
  margin-top: 10%;
  background-color: var(--bs-dark);
  color: var(--bs-light);
  border: 1px solid var(--bs-danger);
}

input {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}

/* Remover a borda padrão em foco do input */
input:focus {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
input:disabled {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
.logo-login{
    width: 300px;
}
</style>
