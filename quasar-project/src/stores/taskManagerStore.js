import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db, auth } from 'boot/firebase'
import { ref as dbRef, set, get, onChildAdded, remove, update, onChildChanged } from "firebase/database";
import { useQuasar, uid } from 'quasar';
import { useUserStore } from './userStore';

export const useTaskManagerStore = defineStore('taskMangerStore', () => {

  const $q = useQuasar()

  const userStore = useUserStore()

  const toggleForm = vueRef(false)


  const newTask = vueRef({
    title: "",
    description: "",
    deadline: "",
    action: '',
    taskId: ''
  });

  const getUserId = () => {
    return userStore.userDetails.id
  }

  const firebaseAddNewTask = () => {
    const userId = getUserId()
    const id = uid()

    set(dbRef(db, `users/${userId}/tasks/${id}`), {
      title: newTask.value.title,
      description: newTask.value.description,
      deadline: newTask.value.deadline,
      created: Date.now(),
    })

    newTask.value = {
      title: "",
      description: "",
      deadline: "",
      action: "",
    };
  }

  const tasks = vueRef({})
  const firebaseGetTasks = () => {
    const userId = getUserId()

    onChildAdded(dbRef(db, `users/${userId}/tasks`), snapshot => {
      tasks.value[snapshot.key] = snapshot.val()
    })

    onChildChanged(dbRef(db, `users/${userId}/tasks`), snapshot => {
      tasks.value[snapshot.key] = snapshot.val()
    })
  }

  const firebaseDeleteTask = (taskId) => {
    const userId = getUserId()

    remove(dbRef(db, `users/${userId}/tasks/${taskId}`))
  }

  const firebaseUpdateTask = (payLoad) => {
    const userId = getUserId()

    if (newTask.value.taskId) {
      update(dbRef(db, `users/${userId}/tasks/${newTask.value.taskId}`), {
        title: newTask.value.title,
        description: newTask.value.description,
        deadline: newTask.value.deadline
      })
    }

    newTask.value = {
      title: "",
      description: "",
      deadline: "",
      action: "",
    };
  }

  return {
    tasks,
    toggleForm,
    newTask,
    firebaseAddNewTask,
    firebaseGetTasks,
    firebaseDeleteTask,
    firebaseUpdateTask,
  }
});
