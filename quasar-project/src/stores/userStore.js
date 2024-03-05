import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db, auth } from 'boot/firebase'
import { ref as dbRef, set, get } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('userStore', () => {

  const router = useRouter()

  const userDetails = vueRef({
    name: '',
    id: ''
  })

  const $q = useQuasar()

  const firebaseRegisterUser = (payLoad) => {
    createUserWithEmailAndPassword(auth, payLoad.email, payLoad.password)
      .then((response) => {
        const userId = response.user.uid;

        set(dbRef(db, `users/${userId}`), {
          username: payLoad.name,
          email: payLoad.email,
        });

        userDetails.value.name = payLoad.name
        userDetails.value.id = userId

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

      });
  }

  const firebaeLoginUser = (payLoad) => {
    signInWithEmailAndPassword(auth, payLoad.email, payLoad.password)
      .then((userCredential) => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const firebaseLogout = () => {
    signOut(auth)
  }

  const firebaseAuthStateChanged = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        get(dbRef(db, `users/${userId}`)).then(snapshot => {
          if (snapshot.exists()) {
            userDetails.value.name = snapshot.val().username,
              userDetails.value.id = snapshot.key
          }
        })

        router.push('/task-manager')

      } else {

        userDetails.value.name = ''
        userDetails.value.id = ''
        router.push('/auth')
      }
    });
  }

  return {
    userDetails,
    firebaseRegisterUser,
    firebaeLoginUser,
    firebaseLogout,
    firebaseAuthStateChanged,
  }
});
