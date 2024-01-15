import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useSpecialistsStore = defineStore('specialistsStore', () => {

  const specialists = ref([])
  const filteredSpecialists = ref([])
  const mySpecialists = ref([])

  const createSpecialists = () => {
    for (let i = 0; i < 10; i++) {

      const nameArr = ['Adam', 'Kamil', 'Piotr', 'Jakub', 'Kacper', 'Mateusz', 'Robert']
      const lastNameArr = ['Kowalski', 'Nowak', 'Dąb', 'Wąsik', 'Szurgot']
      const specializationArr = ['Chirurg', 'Kardiolog', 'Okulista']

      const name = nameArr[Math.round(Math.random() * 6)]
      const lastName = lastNameArr[Math.round(Math.random() * 4)]
      const specialization = specializationArr[Math.round(Math.random() * 2)]

      specialists.value.push({
        fullname: `${name} ${lastName}`,
        age: Math.round(Math.random() * 72 + 18),
        specialization: specialization,
        rating: 0,
        totalRating: [{
          id: 'firstRating',
          stars: 3,
        }],
        favorite: false,
        id: i,
      })

    }

    localStorage.setItem('specialists', specialists.value)
  }

  const addToFavorite = (id) => {
    specialists.value[id].favorite = !specialists.value[id].favorite
    const indexToDelete = mySpecialists.value.findIndex(el => el.id == specialists.value[id].id)

    if (specialists.value[id].favorite) {
      mySpecialists.value.push(specialists.value[id])
    }
    else {
      if (indexToDelete !== -1) {
        mySpecialists.value.splice(indexToDelete, 1);
      }
    }
  }


  return {
    specialists,
    filteredSpecialists,
    mySpecialists,
    createSpecialists,
    addToFavorite,
  }
});
