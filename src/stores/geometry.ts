import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const mw: number = 1564
export const mh: number = 1604
export const useGeometryStore = defineStore('geometry', () => {

    const mapWidth = ref(mw)
    const mapHeight = ref(mh)

    const xScale = computed(() => {
        const xs = mapWidth.value / mw;
        console.log('computing xScale = %o', xs)
        return mapWidth.value / mw;
    })
    const yScale = computed(() => {
        const ys = mapHeight.value / mh;
        console.log('computing yScale = %o', ys)
        return ys;
    })

    return { mapWidth, mapHeight, xScale, yScale }
})
