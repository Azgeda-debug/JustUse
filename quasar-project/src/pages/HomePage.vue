<template>
  <q-page class="row q-pt-xl q-gutter-lg">
    <div class="col-12 q-pa-sm" style="border: 1px solid gray; max-height: 270px; max-width: 400px; margin: 0 auto;">
      <span class="text-h6"> My Specialists</span>
      <q-card>
        <q-scroll-area style="height: 210px; max-width: 400px;">
          <q-card v-for="specialist in  store.mySpecialists" :key="specialist.id">
            <q-card-section>
              {{ specialist.fullname }}
            </q-card-section>

            <q-card-section>
              Age: {{ specialist.age }}
            </q-card-section>

            <q-card-section>
              specialization: {{ specialist.specialization }}
            </q-card-section>

            <q-card-section>
              My Rating: {{ specialist.rating }}
            </q-card-section>

            <q-card-section>
              Total Rating: {{ totalRating(specialist.totalRating) }}
            </q-card-section>

            <q-card-section>
              <q-icon @click="store.addToFavorite(specialist.id)"
                :name="specialist.favorite ? 'favorite' : 'favorite_border'" :color="specialist.favorite ? 'red' : 'gray'"
                size="md" class="cursor-pointer" />
            </q-card-section>

          </q-card>
        </q-scroll-area>

      </q-card>
    </div>

    <div class="col-12 q-pa-sm" style="border: 1px solid gray; max-height: 270px; max-width: 400px; margin: 0 auto;">

      <q-input label="Search" rounded outlined dense v-model="searchInput" />

      <q-scroll-area style="height: 210px; max-width: 400px;">
        <q-card v-for="specialist in (searchInput ? store.filteredSpecialists : store.specialists)" :key="specialist.id">
          <q-card-section>
            {{ specialist.fullname }}
          </q-card-section>

          <q-card-section>
            Age: {{ specialist.age }}
          </q-card-section>

          <q-card-section>
            specialization: {{ specialist.specialization }}
          </q-card-section>

          <q-card-section>
            <q-rating @click="updateRating(specialist.rating, specialist.id)" v-model="specialist.rating" :max="5"
              size="32px" />
          </q-card-section>

          <q-card-section>
            <q-icon @click="store.addToFavorite(specialist.id)"
              :name="specialist.favorite ? 'favorite' : 'favorite_border'" :color="specialist.favorite ? 'red' : 'gray'"
              size="md" class="cursor-pointer" />
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useSpecialistsStore } from 'src/stores/example-store'

const store = useSpecialistsStore()

const searchInput = ref('')

watch(searchInput, (newVal) => {
  if (newVal) {
    store.filteredSpecialists = []

    for (let index in store.specialists) {
      if (store.specialists[index].fullname.toLowerCase().includes(newVal.toLowerCase().trim())) {
        store.filteredSpecialists.push(store.specialists[index])
      }
    }
  }
})

const lastRating = ref(0)
const updateRating = (rating, id) => {
  lastRating.value = rating

  let helpVariable = 0

  if (rating) {
    for (let index of store.specialists[id].totalRating) {
      if (index.id != 'userId') {
        helpVariable = 1

      } else {
        alert('u already voted')
        return

      }
    }

    if (helpVariable) {
      store.specialists[id].totalRating.push({
        stars: rating,
        id: 'userId'
      })
    } 
  }

  if (!store.specialists[id].rating) {
    let indexToDelete = store.specialists[id].totalRating.findIndex(el => el.id == 'userId')

    if (indexToDelete !== -1) {
      store.specialists[id].totalRating.splice(indexToDelete, 1)
    }
  }
}

const totalRating = (totalRating) => {
  let rating = 0

  for (let i = 0; i < totalRating.length; i++) {
    rating += parseFloat(totalRating[i].stars)
  }

  rating = rating / totalRating.length

  return rating
}

onMounted(() => {
  store.createSpecialists();
})
</script>
