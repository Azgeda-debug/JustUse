import ErrorNotFound from 'pages/ErrorNotFound.vue'
import MainLayout from 'layouts/MainLayout.vue'
import HomePage from 'pages/HomePage.vue'
import AuthPage from 'pages/AuthPage.vue'
import TaskManagerPage from 'pages/TaskManagerPage.vue'
import ExpenseCalculatorPage from 'pages/ExpenseCalculatorPage.vue'
import WeatherPage from 'pages/WeatherPage.vue'
import BMICalculatorPage from 'pages/BMICalculatorPage.vue'
import CurrencyCalculatorPage from 'pages/CurrencyCalculatorPage.vue'
import ShoppingListPage from 'pages/ShoppingListPage.vue'
import PasswordGeneratorPage from 'pages/PasswordGeneratorPage.vue'

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
      },
      {
        path: '/auth',
        name: 'AuthPage',
        component: AuthPage,
      },
      {
        path: '/task-manager',
        name: 'TaskManagerPage',
        component: TaskManagerPage,
      },
      {
        path: '/expense-calculator',
        name: 'ExpenseCalculatorPage',
        component: ExpenseCalculatorPage,
      },
      {
        path: '/bmi-calculator',
        name: 'BMICalculatorPage',
        component: BMICalculatorPage,
      },
      {
        path: '/shopping-list',
        name: 'ShoppingListPage',
        component: ShoppingListPage,
      },
      {
        path: '/currency-calculator',
        name: 'CurrencyCalculatorPage',
        component: CurrencyCalculatorPage,
      },
      {
        path: '/password-generator',
        name: 'PasswordGeneratorPage',
        component: PasswordGeneratorPage,
      },
      {
        path: '/weather',
        name: 'WeatherPage',
        component: WeatherPage,
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
