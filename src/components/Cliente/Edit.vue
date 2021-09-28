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
              <div @click="$router.back()">
                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
              </div>
              <h2>Editar Cliente</h2>
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
              <CCol md="6" class="btn-final-form-edit mt-3 mb-2">
                <CButton
                  :disabled="loadPage"
                  color="success"
                  size="lg"
                  variant="outline"
                  type="button"
                  class="btn-left"
                  @click="salvarCliente"
                >
                  Salvar
                </CButton>
              </CCol>
              <CCol md="6" class="btn-final-form-edit mt-3 mb-2">
                <CButton
                  :disabled="loadPage"
                  color="danger"
                  size="lg"
                  variant="outline"
                  type="button"
                  class="btn-right"
                  @click="excluirCliente"
                >
                  Excluir
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
import { freeSet } from "@coreui/icons";
import {
  GET_ITEM,
  CREATE_OBJECT,
  DELETE_OBJECT,
} from "../../store/actions.type";
import store from "../../store";

export default {
  data() {
    return {
      labelIcon: {
        labelOn: "\u2713",
        labelOff: "\u2715",
      },
      loadPage: true,
      cpf: null,
      email: null,
      nome: null,
      freeSet,
    };
  },
  name: "EditarCliente",
  methods: {
    navigateList() {
      this.$router.push("/cliente");
    },
    async pegarCliente() {
      let id = this.$route.params.id;
      const method = `cliente/${id}`;
      const result = await store.dispatch(GET_ITEM, { method });

      if (!!result.Data.Id) {
        this.nome = result.Data.Nome;
        this.cpf = result.Data.Cpf;
        this.email = result.Data.Email;
      } else {
        store.commit("addToaster", {
          title: "Erro",
          text: "Um erro ocorreu ao recuperar o cliente",
          type: "error",
          confirm: false,
          cancel: false,
          textConfirm: null,
          textCancel: null,
        });
      }
    },
    async salvarCliente() {
      this.loadPage = true;
      let id = this.$route.params.id;

      if (
        this.nome == "" ||
        this.nome == null ||
        this.email == null ||
        this.email == "" ||
        this.cpf == null ||
        this.cpf == ""
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

        const data = {
          Nome: this.nome,
          Email : this.email,
          Cpf: this.cpf
        };

        const method = `cliente/criar/${id}`;
        const result = await store.dispatch(CREATE_OBJECT, { method, data });

        if (!!result.Data.Id) {
          store.commit("addToaster", {
            title: "Sucesso!",
            text: "Cliente editado com sucesso!",
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
    async excluirCliente() {
      this.loadPage = true;
      let id = this.$route.params.id;
      const method = `cliente/excluir/${id}`;
      const result = await store.dispatch(DELETE_OBJECT, { method });

      if (!!result.Data) {
        store.commit("addToaster", {
            title: "Sucesso!",
            text: "Cliente cadastrado com sucesso!",
            type: "success",
            confirm: false,
            cancel: false,
            textConfirm: null,
            textCancel: null,
          });
        this.navigate("/cliente");
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
      this.loadPage = false;
    },
    navigate(url) {
      this.$router.push(url);
    },
  },
  async mounted() {
    await this.pegarCliente();
    this.loadPage = false;
  },
};
</script>

<style>
#idDescricaoCliente {
  resize: none !important;
}
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
#newField .form-group {
  margin-bottom: 3px !important;
}
#newFieldForm .form-group {
  margin-bottom: 3px !important;
}
.btn-final-form-edit .btn-left {
  float: left;
}
.btn-final-form-edit .btn-right {
  float: right;
}
</style>