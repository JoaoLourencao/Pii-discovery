<template>
  <div>
    <CRow>
      <CSpinner
        class="loader-page-all"
        v-if="loadPage == true"
        style="width: 8rem; height: 8rem"
        color="primary"
        grow
      />
      <CCol md="12" :class="loadPage == true ? 'backgroud-load' : ''">
        <CCard>
          <CCardHeader>
            <div class="title-edit-page">
              <div @click="navigate('/Cliente')">
                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
              </div>
              <h2>Adicionar Cliente</h2>
            </div>
          </CCardHeader>
          <CCardBody>
            <CForm id="createClienteID" method="POST">
              <CRow>
                <CCol md="12">
                  <CInput
                    label="Nome"
                    id="idNome"
                    v-model="nome"
                    type="text"
                    autocomplete="off"
                  />
                </CCol>
                <CCol md="4">
                  <CInput
                    label="Email"
                    id="idEmail"
                    v-model="email"
                    type="email"
                    autocomplete="off"
                  />
                </CCol>
                <CCol md="4">
                  <CInput
                    label="CPF"
                    id="idCPF"
                    v-model="cpf"
                    type="text"
                    autocomplete="off"
                    v-mask="[/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/, /\d/]"
                    placeholder="000.000.000-00"
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md="1" class="btn-final-form-edit mt-3 mb-2">
                  <CButton
                    :disabled="loadPage"
                    color="success"
                    size="lg"
                    variant="outline"
                    type="button"
                    @click="addCliente"
                  >
                    Salvar
                  </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_OBJECT, GET_ITEM } from "../../store/actions.type";
import store from "../../store";
import { freeSet } from "@coreui/icons";

export default {
  data() {
    return {
      labelIcon: {
        labelOn: "\u2713",
        labelOff: "\u2715",
      },
      loadPage: false,
      cpf: null,
      email: null,
      nome: null,
      freeSet,
    };
  },
  name: "AddCliente",
  methods: {
    async addCliente() {
      this.loadPage = true;
      if (
        this.cpf == null ||
        this.cpf == "" ||
        this.email == null ||
        this.email == "" ||
        this.nome == null ||
        this.nome == ""
      ) {
        store.commit("addToaster", {
          title: "Cuidado!",
          text: "Há campos em branco",
          type: "warning",
          confirm: false,
          cancel: false,
          textConfirm: null,
          textCancel: null,
        });
      } else {
        if (this.cpf.length < 11) {
          store.commit("addToaster", {
            title: "Cuidado!",
            text: "CPF não é válido",
            type: "warning",
            confirm: false,
            cancel: false,
            textConfirm: null,
            textCancel: null,
          });
        }
        
        const data = {
          Nome: this.nome,
          Email : this.email,
          Cpf: this.cpf
        };

        const method = `cliente/criar`;
        const result = await store.dispatch(CREATE_OBJECT, { method, data });

        if (!!result.Data.Id) {
          store.commit("addToaster", {
            title: "Sucesso!",
            text: "Cliente cadastrado com sucesso!",
            type: "success",
            confirm: false,
            cancel: false,
            textConfirm: null,
            textCancel: null,
          });
          this.navigate(`/cliente/${result.Data.Id}`);
        } else
          store.commit("addToaster", {
            title: "Erro",
            text: "Um erro ocorreu ao salvar o cliente",
            type: "error",
            confirm: false,
            cancel: false,
            textConfirm: null,
            textCancel: null,
          });
      }
      this.loadPage = false;
    },
    navigate(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style>
.title-edit-page h2 {
  padding-left: 6px;
  margin-bottom: 0;
}
.title-edit-page svg {
  cursor: pointer;
}
.title-edit-page {
  display: inline-flex;
  align-items: center;
}
</style>