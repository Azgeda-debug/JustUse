import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db, auth } from 'boot/firebase'
import { ref as dbRef, set, get } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
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

        sendEmailVerification(auth.currentUser).then(() => {
          $q.notify({
            type: 'positive',
            message: 'Verify email address before logging in.'
          })
        })

        set(dbRef(db, `users/${userId}`), {
          username: payLoad.name,
          email: payLoad.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode == 'auth/weak-password') {
          $q.notify({
            type: 'negative',
            message: 'Weak password.'
          })
        }

        if (errorCode == 'auth/email-already-in-use') {
          $q.notify({
            type: 'negative',
            message: 'Email alreasy in use.'
          })
        }

        if (errorCode == 'auth/invalid-email') {
          $q.notify({
            type: 'negative',
            message: 'Invalid email.'
          })
        }

      });
  }

  const firebaseLoginUser = (payLoad) => {
    signInWithEmailAndPassword(auth, payLoad.email, payLoad.password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          $q.notify({
            type: 'negative',
            message: 'Verify your email address.'
          })
        } else {
          userDetails.value.id = userCredential.user.uid
          router.push('/task-manager')
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode == 'auth/invalid-credential') {
          $q.notify({
            type: 'negative',
            message: 'Wrong email or password.'
          })
        }

        if (errorCode == 'auth/invalid-email') {
          $q.notify({
            type: 'negative',
            message: 'Invalid email.'
          })
        }
      });
  }

  const firebaseLogout = () => {
    signOut(auth)
  }

  const firebaseAuthStateChanged = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        if (user.emailVerified || user.providerData[0].providerId == 'google.com') {
          get(dbRef(db, `users/${userId}`)).then(snapshot => {
            if (snapshot.exists()) {
              userDetails.value.name = snapshot.val().username,
                userDetails.value.id = snapshot.key
            } else {
              set(dbRef(db, `users/${userId}`), {
                username: user.providerData[0].displayName,
                email: user.providerData[0].email
              });

              userDetails.value.name = user.displayName
              userDetails.value.id = userId
            }
          })

          router.push('/task-manager')
        }

      } else {
        userDetails.value.name = ''
        userDetails.value.id = ''
        router.push('/auth')
      }
    });
  }

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    signInWithRedirect(auth, provider)
  }

  const forgotPasswordDialog = vueRef(false)
  const openForgotPasswordDialog = () => {
    forgotPasswordDialog.value = true
  }

  const emailAddress = vueRef('')
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, emailAddress.value).then(() => {
      $q.notify({
        type: 'positive',
        message: 'Password reset link sent.'
      })

      emailAddress.value = ''
    }).catch((error) => {
      const errorCode = error.code

      if (errorCode == 'auth/invalid-email') {
        $q.notify({
          type: 'negative',
          message: 'Invalid email'
        })
      }
    })
  }

  return {
    userDetails,
    firebaseRegisterUser,
    firebaseLoginUser,
    firebaseLogout,
    firebaseAuthStateChanged,
    loginWithGoogle,
    forgotPasswordDialog,
    openForgotPasswordDialog,
    emailAddress,
    handleForgotPassword,
  }
});
