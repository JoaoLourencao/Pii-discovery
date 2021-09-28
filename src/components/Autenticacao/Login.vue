<template>
        <CContainer class="d-flex content-center min-vh-100">
            <CSpinner
                class="loader-page-all"
                v-if="isLogin == true"
                color="success"
                grow
            />
            <CRow :class="isLogin == true ? 'backgroud-load' : ''">
                <CCol>
                    <CCardGroup style="border-radius: 10px;-webkit-box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 75%);-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);box-shadow: 0px 0px 19px 0px rgb(0 0 0 / 30%);">
                        <CCard style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;" class="p-4 card-login login-card-color">
                            <CCardBody>
                                <CForm>
                                    <span class="login-txt">Login</span>
                                    <span class="login-txt-sub">Logue com sua conta</span>
                                    <CInput
                                        placeholder="Usuário"
                                        autocomplete="username email"
                                        v-model="email"
                                        v-on:keydown.13="keyValidade"
                                    >
                                        <template #prepend-content><CIcon name="cil-user"/></template>
                                    </CInput>
                                    <CInput
                                        placeholder="Senha"
                                        type="password"
                                        autocomplete="curent-password"
                                        v-model="password"
                                        v-on:keydown.13="keyValidade"
                                    >
                                        <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton :disabled='isLogin' class="px-4 login-btn-color" @click="Login()">Login</CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton class="px-0 login-txt-color" @click="navigate('/autenticacao/esqueceu-senha')">Esqueceu a senha?</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                        <CCard 
                            style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;"                           
                            text-color="white"
                            class="text-center py-5 d-sm-down-none"
                            body-wrapper
                            
                        >
                                <img src="../../assets/img/logo.png" alt="logo" class="login-img" /><br/>
                                <span class="login-txt-sub2">Entre com seus dados de acesso para logar no sistema.</span>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
</template>

<script>
import { mapState } from "vuex";
import store from '../../store';
import firebase from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data(){
        return{
            email: null,
            password: null,
            isLogin: false,
            Usuario: Object
        }
    },
    name: 'LoginComponent',
    methods: {        
        async Login(){
            try{
                this.isLogin = true;
                if(this.email == "" || this.password == "" || this.email == null || this.password == null)
                    store.commit("addToaster", {
                        text: "E-mail ou senha não preenchidos",
                        type: "Warning"
                    });
                else{    
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        console.log(user)
                        this.navigate('/');                     
                        // ...
                    })
                    .catch((error) => {
                        store.commit("addToaster", {
                            text: error.message,
                            type: "Error"
                        });
                    });                
                }
            }
            catch(e){
                console.log(e)
                store.commit("addToaster", {
                    text: "Um erro ocorreu ao logar",
                    type: "Error"
                });
            }
            finally{
                this.isLogin = false;
            }           
        },
        keyValidade(){
            let user = this.email;
            let pass = this.password;

            if(user != null && user != "" && pass != null && pass != ""){
                this.Login();
            }
        },
        navigate(route){
            this.$router.push(route);
        }
    },
    computed: {
        ...mapState({
            errors: state => state.auth.errors
        })
    },
}
</script>

<style lang="css" scoped>
    .login-card-color{
        background-color: #fff;
    }
    .card-login{
        color: #00DD50;
        min-width: 600px;
    }
    .login-txt-color{
        color: #000;
    }
    .login-txt{
        line-height: 45px;
        display: flex;
        align-items: center;
        color: #2e3d4f;
        margin-bottom: 12px;
        font-size: 2rem;
        font-weight: bold;
        text-transform: uppercase;
    }
    .login-txt-sub{
        line-height: 15px;
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        color: #00DD50;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .login-txt-sub2{
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: #2e3d4f;
    }
    .login-btn-color{
        color: #fff;
        background-color: #00DD50;
        border-color: #00DD50;
    }
    .login-img{
        max-width: 85%;
        margin-bottom: 30px;
        margin-top: 3vh;
    }
    .card-login:last-child .card-body{
        display: none;
    }
    .backgroud-load{
        opacity: 0.3;
    }
    .loader-page-all{
        opacity: 0.6 !important;
        position: absolute;
        left: 51%;
        top: 30%;
        z-index: 99999;
    }
</style>