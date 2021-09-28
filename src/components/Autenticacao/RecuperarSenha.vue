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
                    <CCardGroup>
                        <CCard class="p-4 card-login login-card-color">
                            <CCardBody>
                                <CForm>
                                    <span class="login-txt">Recuperar Senha</span>
                                    <span class="login-txt-sub">Recupere sua senha</span>
                                    <CInput
                                        placeholder="Digite sua nova Senha"
                                        type="password"
                                        autocomplete="curent-password"
                                        v-model="Senha"
                                        v-on:keydown.13="keyValidade"
                                    >
                                        <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                    </CInput>
                                    <CInput
                                        placeholder="Confirme sua Senha"
                                        type="password"
                                        autocomplete="curent-password"
                                        v-model="ConfirmacaoSenha"
                                        v-on:keydown.13="keyValidade"
                                    >
                                        <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton :disabled='isLogin' class="px-4 login-btn-color" @click="recuperarSenha()">Recuperar</CButton>
                                        </CCol>                                        
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                        <CCard
                            text-color="white"
                            class="text-center py-5 d-sm-down-none"
                            body-wrapper
                            
                        >
                                <img src="../../assets/img/logo.png" alt="logo" class="login-img" /><br/>
                                <span class="login-txt-sub2">Altere sua senha para ter acesso a sua conta.</span>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
</template>

<script>
import { mapState } from "vuex";
import { ATUALIZA_OBJECT, LOGOUT } from '../../store/actions.type';
import store from '../../store';

export default {
    data(){
        return{
            Senha: null,
            ConfirmacaoSenha:null,
            isLogin: false,
            Usuario: Object
        }
    },
    name: 'RecuperarSenha',
    methods: {  
        validarSenhas() {
            this.senhaInvalida = false;
            if(this.Senha != this.ConfirmacaoSenha)
            {
                this.senhaInvalida = true;
                store.commit("addToaster", {
                text: "As senhas não correspondem.",
                type: "Error"
                });
            }

            if(this.Senha == null || this.ConfirmacaoSenha == null)
            {
                this.senhaInvalida = true;
                store.commit("addToaster", {
                text: "Nova Senha e Confirmação de Senha são obrigatórias.",
                type: "Error"
                });
            }

            return this.senhaInvalida;
        },
        async recuperarSenha(){
            try{
                this.isLogin = true;
                if(this.Senha == "" || this.Senha == null || this.ConfirmacaoSenha == "" || this.ConfirmacaoSenha == null)
                    store.commit("addToaster", {
                        text: "Senha ou confirmação não preenchidos",
                        type: "Warning"
                    });
                else{
                    if(!this.validarSenhas()) {
                        const method = `authentication/alter-password`;
                        const data = {
                            password: this.Senha,
                            confirmation: this.ConfirmacaoSenha
                        };

                        const result = await store.dispatch(ATUALIZA_OBJECT, {
                            method,
                            data
                        });
                        
                        if (result.message == "Senha alterada com sucesso") {
                            store.commit("addToaster", {
                            text: "Senha alterada com sucesso.",
                            type: "Success",
                        });

                            this.Senha = null;
                            this.ConfirmacaoSenha = null;

                            await store.dispatch(LOGOUT);

                            this.navigate('login');

                        } else {
                            store.commit("addToaster", {
                            text: "Um erro ocorreu ao alterar a senha.",
                            type: "Error",
                            });
                        }
                    }
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
    }
}
</script>

<style lang="css" scoped>
    .login-card-color{
        background-color: #fff;
    }
    .card-login{
        color: #00B240;
        min-width: 600px!important;
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
        color: #00B240;
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
        background-color: #00B240;
        border-color: #00B240;
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