import Vue from 'vue'
import Router from 'vue-router'
import 'regenerator-runtime/runtime'
import store from '@/store';

// Containers
const Layout = () => import('@/layout/TheContainer')

//404
const Error404 = () => import('@/layout/Page404')

// Páginas Auth
//Autenticação
const Login = () => import('@/components/Autenticacao/Login')
const EsqueceuSenha = () => import('@/components/Autenticacao/EsqueceuSenha')
const RecuperarSenha = () => import('@/components/Autenticacao/RecuperarSenha')
// Dashboard
const Dashboard = () => import('@/components/Dashboard/Dashboard')


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes:  [{
      path: '/',
      name: 'Home',
      meta: {
        requiresAuth: true
      },
      component: Layout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },   
      ]
    },

  {
      path: '/autenticacao',
      redirect: '/autenticacao/login',
      name: 'Autenticacao',
      component: {
          render(c) { return c('router-view') }
      },
      children: [
          {
            path: 'login',
            name: 'Login',
            component: Login
          },
          {
            path: 'esqueceu-senha',
            name: 'Esqueceu Senha',
            component: EsqueceuSenha
          }, 
          {
            path: 'recuperar-senha',
            name: 'Recuperar Senha',
            component: RecuperarSenha
          }
      ]
  },
  
  {
    path: '/erro',
    redirect: '/erro/404',
    name: 'Erro',
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '404',
            name: 'Erro 404',
            component: Error404
        },
    ]
  },
  ]
})

export default router;