import {defineStore} from "pinia";
import type { Ref } from 'vue'
import {ref} from 'vue'
import type { Location } from '../types/location'

export const useLocationStore = defineStore('location', () => {

    const veracruz: Ref<Location> = ref(<Location>{ x: 202, y: 953, name: 'Veracruz' })
    const mexicoCity: Ref<Location> = ref(<Location>{ x: 119, y: 947, name: 'Mexico City' })
    const portAuPrince: Ref<Location> = ref(<Location>{ x: 873, y: 975, name: 'Port-au-Prince' })
    const washington: Ref<Location> = ref(<Location>{ x: 740, y: 316, name: 'Washington, DC' })
    const colon: Ref<Location> = ref(<Location>{ x: 660, y: 1239, name: 'Colón' })
    const losAngeles: Ref<Location> = ref(<Location>{ x: 47, y: 487, name: 'Los Angeles' })
    const tampico: Ref<Location> = ref(<Location>{ x: 153, y: 859, name: 'Tampico' })

    return {veracruz, mexicoCity, portAuPrince, washington, colon, losAngeles, tampico}
})
