import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db } from 'boot/firebase'
import { ref as dbRef, set, onChildAdded } from "firebase/database";
import { useUserStore } from './userStore';
import { uid, useQuasar } from 'quasar';

export const useBmiStore = defineStore('bmiStore', () => {

    const $q = useQuasar()

    const userStore = useUserStore()

    const calculatedBmi = vueRef(0);

    const getuserId = () => {
        return userStore.userDetails.id
    }

    const firebaseAddToHistory = (payload) => {
        const userId = getuserId()
        const bmiId = uid()

        set(dbRef(db, `users/${userId}/bmi/history/${bmiId}`), {
            date: Date.now(),
            value: payload,
        }).then(() => {
            $q.notify({
                type: 'positive',
            })
        }).catch(() => {
            $q.notify({
                type: 'negative',
                message: 'Error, try again.'
            })
        })
    };

    const chartHistory = vueRef({})
    const showBmiHistory = vueRef(false)
    const firebaseCheckHistory = () => {
        const userId = getuserId()

        onChildAdded(dbRef(db, `users/${userId}/bmi/history`), snapshot => {
            const d = new Date(snapshot.val().date)

            const day = d.getDate().toString().padStart(2, 0)
            const month = (d.getMonth() + 1).toString().padStart(2, 0)
            const year = d.getFullYear()

            const key = `${year}-${month}-${day}`
            chartHistory.value[key] = snapshot.val().value
        })
    };

    return {
        calculatedBmi,
        chartHistory,
        showBmiHistory,
        firebaseAddToHistory,
        firebaseCheckHistory,
    }
});
