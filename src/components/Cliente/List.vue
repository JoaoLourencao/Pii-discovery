<template>
    <div>
        <CRow>
            <CCol md=12>
                <CCard>                    
                    <CCardHeader>
                        <h2>Lista de clientes</h2>
                    </CCardHeader>
                    
                    <CCardBody>
                        <CRow class="card-option-table">
                            <CCol md="12 mb-4" class="text-left">
                                <CButton size="" v-if="permission != 3 && permission != 2" class="btn-outline-primary" @click="navigate('/cliente/criar')">
                                    Adicionar novo <CIcon :content="freeSet.cilPlus" size="lg" style="margin:0!important" />
                                </CButton>
                            </CCol>
                            <CCol md="6" class="text-left form-inline">
                                <CInput
                                    label="Buscar : "
                                    :horizontal="true"
                                    placeholder="Digite a sua busca"
                                    v-model="Busca"
                                    type="text"
                                    autocomplete="off"
                                />
                            </CCol>
                            <CCol md="6" class="select-page-div form-inline justify-content-sm-end">
                                <CSelect
                                    label="Itens por página:"
                                    :value.sync="ItensPorPagina"
                                    :options="[10,20,50,100]"
                                />
                            </CCol>
                        </CRow>
                        <CDataTable
                            :items="items"
                            :fields="fields"
                            :loading="loadTime"
                            :noItemsView="{ noResults: 'Sem Resultado', noItems: ' ' }"
                            hover
                            sorter
                            :pagination="false"
                        >
                            <template #show_details="{item, index}">
                                <td class="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="toggleDetails(item, index)"
                                    >
                                        {{Boolean(item._toggled) ? 'Esconder' : 'Detalhes'}}
                                    </CButton>
                                </td>
                            </template>
                            <template #details="{item}">
                                <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                                    <CCardBody>
                                        <h4>
                                            {{item.Nome}}
                                        </h4>
                                        <p class="text-muted">Adicionado em: {{item.AdicionadoEm}}</p>
                                        <p class="text-muted" v-if="item.AlteradoEm != 'Invalid date'" >Alterado em: {{item.AlteradoEm}}</p>
                                        <CButton size="sm" color="info" class="" :id="item.Id" @click="navigate('/cliente/'+ item.Id)">
                                            Mais informações
                                        </CButton>
                                    </CCardBody>
                                </CCollapse>
                            </template>
                        </CDataTable>
                        <CPagination
                            :activePage.sync="paginaAtual"
                            :pages="TotalPaginas"
                            size=""
                            align="center"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_LIST_POST } from '../../store/actions.type';
import store from '../../store';
import moment from 'moment';
import { freeSet } from '@coreui/icons';

export default {
    data(){
        return{
            items: [],
            fields :[
                { key: 'Cpf', label: 'CPF', _style:'width:10%', },
                { key: 'Nome', label : 'Nome', },
                { key: 'Email', label : 'Email', },
                { 
                    key: 'show_details',
                    label: '',
                    _style: 'width:5%',
                    sorter: false,
                    filter: false
                }
            ],
            loadTime: true,
            collapseDuration: 0,
            ItensPorPagina: 10,
            freeSet,
            TotalPaginas:null,
            paginaAtual: 1,
            Busca: null

        }
    },
    name: 'listaClientes',
    methods:{
        navigate(route) {
            this.$router.push(route);
        },
        async popularTabela() {
            const method = 'cliente';
            const data = {
                Pagina : this.paginaAtual,
                Tamanho : this.ItensPorPagina,
                Busca: this.Busca
            };
            const result  = await store.dispatch(GET_LIST_POST, {method, data});

            result.Data.Registros.forEach((item, index, array) => {
                array[index].AdicionadoEm = moment(item.AdicionadoEm, 'YYYY-MM-DD HH:mm:ss.SSS').format('DD/MM/YYYY');
                array[index].AlteradoEm = moment(item.AlteradoEm, 'YYYY-MM-DD HH:mm:ss.SSS').format('DD/MM/YYYY');

            });
            
            this.items = result.Data.Registros.map((item, id) => { return {...item, id}});

            this.TotalPaginas = result.Data.TotalPaginas;

            this.loadTime = false;
        },
        toggleDetails (item) {
            this.$set(this.items[item.id], '_toggled', !item._toggled)
            this.collapseDuration = 350
            this.$nextTick(() => { this.collapseDuration = 0})
        }
    },
    watch:{
        async Busca(){
            this.loadTime = true;
            await this.popularTabela();
        },
        async ItensPorPagina(){
            this.loadTime = true;
            await this.popularTabela();
        },
        async paginaAtual(){
            this.loadTime = true;
            await this.popularTabela();
        }
    },
    async mounted(){
        await this.popularTabela();
    },
    computed: {
        permission () {
            return this.$store.getters.permission
        }
    }
}
</script>

<style>
    .justify-content-start{
        justify-content: center !important;
    }
</style>