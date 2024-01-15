import ErrorNotFound from 'pages/ErrorNotFound.vue'
import HomePage from 'pages/HomePage.vue'
import MainLayout from 'layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage,
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorNotFound',
    component: ErrorNotFound,
  }
]

export default routes
