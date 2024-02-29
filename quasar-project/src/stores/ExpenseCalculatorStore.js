import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db } from 'boot/firebase'
import { ref as dbRef, set, get, onChildAdded } from "firebase/database";
import { useUserStore } from './userStore';
import { uid, useQuasar } from 'quasar';

export const useExpenseCalculatorStore = defineStore('expenseCalculatorStore', () => {

    const userStore = useUserStore()

    const formData = vueRef({
        selectedOption: "",
        weekOfMonth: "",
        month: "",
        year: "",
        expense: "",

    })

    const getUserId = () => {
        return userStore.userDetails.id
    }

    const firebaseSetData = () => {
        const userId = getUserId()
        const expenseId = uid()

        if (formData.value.year && !formData.value.month) {
            set(dbRef(db, `users/${userId}/expenses/yearly/${expenseId}`), {
                expense: formData.value.expense,
                date: formData.value.year
            })
        }

        if (formData.value.month && formData.value.year && !formData.value.weekOfMonth) {
            const date = `${formData.value.month} ${formData.value.year}`

            set(dbRef(db, `users/${userId}/expenses/monthly/${expenseId}`), {
                expense: formData.value.expense,
                date: date
            })
        }

        if (formData.value.weekOfMonth && formData.value.month && formData.value.year) {
            const getSuffix = (weekOfMonth) => {

                switch (parseInt(weekOfMonth)) {
                    case 1:
                        return '1st week of';
                    case 2:
                        return '2nd week of';
                    case 3:
                        return '3rd week of';
                    case 4:
                        return '4th week of';
                    case 5:
                        return '5th week of';
                }
            };

            const date = `${getSuffix(formData.value.weekOfMonth)} ${formData.value.month} ${formData.value.year}`;

            set(dbRef(db, `users/${userId}/expenses/weekly/${expenseId}`), {
                expense: formData.value.expense,
                date: date
            });
        }

        formData.value = {
            selectedOption: "",
            weekOfMonth: "",
            month: "",
            year: "",
            expense: "",

        }
    }

    const weeklyExpenses = vueRef({})
    const monthlyExpenses = vueRef({})
    const yearlyExpenses = vueRef({})

    const showExpensesCharts = vueRef(false)
    const firebaseCheckCharts = () => {
        showExpensesCharts.value = true
        const userId = getUserId()

        const getChartsData = (variable, peroid) => {
            onChildAdded(dbRef(db, `users/${userId}/expenses/${peroid}`), snapshot => {
                let expenses = {}

                expenses[snapshot.key] = snapshot.val()

                Object.keys(expenses).forEach(key => {
                    const chartKey = expenses[key].date
                    const chartData = expenses[key].expense

                    variable[chartKey] = chartData
                })

            })
        }

        getChartsData(weeklyExpenses.value, 'weekly')

        getChartsData(monthlyExpenses.value, 'monthly')

        getChartsData(yearlyExpenses.value, 'yearly')

    }

    return {
        formData,
        showExpensesCharts,
        weeklyExpenses,
        monthlyExpenses,
        yearlyExpenses,
        firebaseSetData,
        firebaseCheckCharts
    }
});
