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
              <div @click="navigate('/cliente')">
                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
              </div>
              <h2>Detalhes do Cliente</h2>
            </div>
          </CCardHeader>
          <CCardBody>
              <CRow>
                <CCol md="12">
                  <CInput
                    label="Nome"
                    id="idNome"
                    v-model="Cliente.Nome"
                    type="text"
                    disabled
                    autocomplete="off"
                  />
                </CCol>
                <CCol md="4">
                  <CInput
                    label="Email"
                    id="idEmail"
                    v-model="Cliente.Email"
                    type="email"
                    autocomplete="off"
                    disabled
                  />
                </CCol>
                <CCol md="4">
                  <CInput
                    label="CPF"
                    id="idCPF"
                    v-model="Cliente.Cpf"
                    type="text"
                    autocomplete="off"
                    v-mask="[/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/, /\d/]"
                    placeholder="000.000.000-00"
                    disabled
                  />
                </CCol>
              </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md="1" class="btn-final-form-edit mt-3 mb-2">
                <CButton
                  color="info"
                  v-if="permission != 3 && permission != 2"
                  size="lg"
                  variant="outline"
                  type="button"
                  class="btn-left"
                  @click="navigate('/cliente/editar/' + $route.params.id)"
                >
                  Editar
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
import { GET_ITEM } from "../../store/actions.type";
import store from "../../store";
import { freeSet } from "@coreui/icons";

export default {
  data() {
    return {
      labelIcon: {
        labelOn: "\u2713",
        labelOff: "\u2715",
      },
      options: [
        { name: "Acre", UF: "AC" },
        { name: "Alagoas", UF: "AL" },
        { name: "Amapá", UF: "AP" },
        { name: "Amazonas", UF: "AM" },
        { name: "Distrito Federal", UF: "DF" },
        { name: "Espírito Santo", UF: "ES" },
        { name: "Goiás", UF: "GO" },
        { name: "Maranhão", UF: "MA" },
        { name: "Mato Grosso", UF: "MT" },
        { name: "Mato Grosso do Sul", UF: "MS" },
        { name: "Minas Gerais", UF: "MG" },
        { name: "Pará", UF: "PA" },
        { name: "Paraíba", UF: "PB" },
        { name: "Paraná", UF: "PR" },
        { name: "Pernambuco", UF: "PE" },
        { name: "Piauí", UF: "PI" },
        { name: "Rio de Janeiro", UF: "RJ" },
        { name: "Rio Grande do Norte", UF: "RN" },
        { name: "Rio Grande do Sul", UF: "RS" },
        { name: "Rondônia", UF: "RO" },
        { name: "Roraima", UF: "RR" },
        { name: "Santa Catarina", UF: "SC" },
        { name: "São Paulo", UF: "SP" },
        { name: "Sergipe", UF: "SE" },
        { name: "Tocantins", UF: "TO" },
      ],
      Cliente: Object,
      freeSet,
      loadPage: true,
    };
  },
  name: "DetalheCliente",
  methods: {
    async pegarDetalhe() {
      const id = this.$route.params.id;

      const method = `cliente/${id}`;
      const result = await store.dispatch(GET_ITEM, { method });
      if (!!result) {
        this.Cliente = result.Data;
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
    navigate(url) {
      this.$router.push(url);
    },
  },
  async mounted() {
    await this.pegarDetalhe();
    this.loadPage = false;
  },
  computed: {
    permission() {
      return this.$store.getters.permission;
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

.imagem-cliente {
  height: auto;
  border: 2px solid;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-top: 30px;
  padding: 5px;
  width: 100%;
}
</style>