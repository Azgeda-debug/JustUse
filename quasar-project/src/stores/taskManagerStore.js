import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db, auth } from 'boot/firebase'
import { ref as dbRef, set, get, onChildAdded, remove, update, onChildChanged, orderByChild, query } from "firebase/database";
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
    taskId: '',
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
      completed: false,
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

    const sortedTasks = query(dbRef(db, `users/${userId}/tasks`), orderByChild('deadline'));

    onChildAdded(sortedTasks, snapshot => {
      if (!snapshot.val().completed) {
        tasks.value[snapshot.key] = snapshot.val()
      }
    })

    onChildChanged(sortedTasks, snapshot => {
      if (!snapshot.val().completed) {
        tasks.value[snapshot.key] = snapshot.val()
      }
    })
  }

  const completedTasks = vueRef({})
  const showCompletedTasks = vueRef(false)
  const firebaseGetCompletedTasks = () => {
    const userId = getUserId()

    const sortedTasks = query(dbRef(db, `users/${userId}/tasks`), orderByChild('deadline'));

    onChildAdded(sortedTasks, snapshot => {
      if (snapshot.val().completed) {
        completedTasks.value[snapshot.key] = snapshot.val()
      }
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

  const filterTaskContent = vueRef('')
  const filteredTasks = vueRef({})
  const filterTasks = () => {
    const filtered = Object.keys(tasks.value).reduce((filteredTasks, taskId) => {
      const task = tasks.value[taskId]

      if (task.title.toLowerCase().includes(filterTaskContent.value.toLowerCase())) {
        filteredTasks[taskId] = task
      }

      return filteredTasks
    }, {})

    filteredTasks.value = filtered
  }

  const firebaseTaskDone = (taskId) => {
    const userId = getUserId()

    update(dbRef(db, `users/${userId}/tasks/${taskId}`), {
      completed: true
    })
  }

  return {
    tasks,
    completedTasks,
    toggleForm,
    showCompletedTasks,
    newTask,
    filterTaskContent,
    filteredTasks,
    filterTasks,
    firebaseAddNewTask,
    firebaseGetTasks,
    firebaseGetCompletedTasks,
    firebaseDeleteTask,
    firebaseUpdateTask,
    firebaseTaskDone,
  }
});
