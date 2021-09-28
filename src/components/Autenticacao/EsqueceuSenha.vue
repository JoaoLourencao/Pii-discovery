<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CRow>
            <CSpinner
                class="loader-page-all"
                v-if="loadTime == true"
                color="success"
                grow
            />
            <CCol :class="loadTime == true ? 'backgroud-load' : ''">
                <CCardGroup>
                    <CCard class="p-4 card-login login-card-color">
                        <CCardBody>
                            <CForm>
                                <span class="login-txt">Recuperar a senha</span>
                                <CInput
                                type="email"
                                placeholder="E-mail"
                                autocomplete="username email"
                                v-model="email"
                                >
                                <template #prepend-content><CIcon name="cil-user"/></template>
                                </CInput>
                                <CRow>
                                    <CCol col="12" class="text-left">
                                        <CButton color="primary" block class="px-4 login-btn-color" @click="esqueceuSenha()">Redefinir</CButton>
                                    </CCol>
                                    <CCol col="12" class="text-left">
                                        <CButton class="px-0 login-txt-color" @click="navigate('/autenticacao/login')">Voltar para o login</CButton>
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
                        <span class="login-txt-sub2">Entre com seus dados de acesso para logar no sistema.</span>
                    </CCard>
                </CCardGroup>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>
import { mapState } from "vuex";
import { CHANGE_PASSWORD } from '../../store/actions.type';
import store from '../../store';

export default {
    data(){
        return{
            email: null,
            loadTime: false,
            confirmEmail: null
        }
    },
    name: 'LoginComponent',
    computed: {
        ...mapState({
            errors: state => state.auth.errors
        })
    },
    methods: {
        navigate(route){
            this.$router.push(route);
        },
        async esqueceuSenha(){
            this.loadTime = true;

            const data = {
                username : this.email
            }

            if (this.email != null) {
                const result = await store.dispatch(CHANGE_PASSWORD, data);

                if(result.error == "Não é possível recuperar a senha do usuário informado, pois esta bloqueado, não existe ou não possui e-mail cadastrado."){
                    store.commit("addToaster", {
                        text: result.error,
                        type: "Error"
                    });
                }else{
                    store.commit("addToaster", {
                        title: "Sucesso",
                        text: "Uma nova senha foi enviada para seu e-mail",
                        type: "Success",
                        confirm: false,
                        cancel: false,
                        textConfirm: null,
                        textCancel: null,
                    });
                    this.$router.push('/');
                }        
                this.loadTime = false;

            } else {
                store.commit("addToaster", {
                    title: "Tente novamente",
                    text: "E-mails não correspondem ou não preenchidos",
                    type: "Error",
                    confirm: false,
                    cancel: false,
                    textConfirm: null,
                    textCancel: null,
                });
                this.loadTime = false;

            }
        },        
    }
}
</script>

<style lang="css" scoped>
    .login-img{
        max-width: 85%;
        margin-bottom: 30px;
        margin-top: 3vh;
    }
    .login-card-color{
        background-color: #fff;
    }
    .card-login{
        color: rgba(224, 159, 18,1);
        min-width: 380px;
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
        font-weight: 300;
        font-size: 13px;
        line-height: 15px;
        display: flex;
        align-items: center;
        color: #000;
        margin-bottom: 18px;
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
    .card-login:last-child .card-body{
        display: none;
    }
</style>