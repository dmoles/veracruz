import {useLocationStore} from './locations'

import type {ArchiveDoc} from '../types/ArchiveDoc'

import butler129Src from '../assets/images/butler-129-covering-letter.jpg';
import butler133Src from '../assets/images/butler-133-butler-to-navy.jpg';
import butler91Src from '../assets/images/butler-91-orders.jpg';
import marinesSrc from '../assets/images/marines-marching-to-station.jpg';
import ussDolphinSrc from '../assets/images/uss-dolphin-1915.jpg';
import locZevonSrc from '../assets/images/loc-zevon.jpg';
import wilsonTelegramSrc from '../assets/images/wilson-telgram.jpg';
import {defineStore, storeToRefs} from "pinia";
import {computed, ref} from "vue";

import formatInTimeZone from 'date-fns-tz/formatInTimeZone'

type DocSelection = { [k: string]: boolean }

export const useDocumentStore = defineStore('document', () => {

    const selectedLocations = ref(<DocSelection>{})

    const docSelected = (doc: ArchiveDoc) => computed({
        get() {
            return selectedLocations.value[doc.id]
        },
        set(v: boolean) {
            console.log('docSelected(%o) = %o', doc.id, v)
            selectedLocations.value[doc.id] = v
        }
    })

    const shortDesc = (doc: ArchiveDoc) => computed(() => {
        const formattedDate = formatInTimeZone(doc.date, 'UTC', 'd MMM yyyy')
        return `${doc.location.name}, ${formattedDate}`
    })

    const nextDocAfter = (doc: ArchiveDoc) => computed(() => {
        const docs = documents.value
        const index = docs.indexOf(doc)
        const nextIndex = index + 1;
        return (nextIndex < docs.length) ? docs[nextIndex] : null
    })

    const prevDocBefore = (doc: ArchiveDoc) => computed(() => {
        const docs = documents.value
        const index = docs.indexOf(doc)
        const prevIndex = index - 1;
        return (prevIndex >= 0) ? docs[prevIndex] : null
    })

    const documents = computed(() => {
        const {veracruz, mexicoCity, portAuPrince, washington, colon, losAngeles, tampico} = storeToRefs(useLocationStore())

        const docs: Array<ArchiveDoc> = [
            {
                id: 'butler129', src: butler129Src, location: washington.value,
                date: new Date('1916-02-04'),
                description: 'In 1916 Smedley Butler was awarded the Congressional Medal of Honor for his actions at Veracruz on 22 April 1914.',
                srcUrl: 'https://catalog.archives.gov/id/57279637',
                viewUrl: 'https://catalog.archives.gov/OpaAPI/media/57279637/content/st-louis/military/rg-127/299715/300_Butler_Smedley_01_Page_129.jpg',
                citation: 'Col. John A. Lejeune to Maj. Smedley D. Butler, 4 Feb. 1916. Official Military Personnel File for Smedley D. Butler, image 129 of 2814; Official Military Personnel Files, 1905-1998; Records of the US Marine Corps, 1775-, Record Group 127. National Archives and Records Administration.'
            },
            {
                id: 'butler133', src: butler133Src, location: portAuPrince.value,
                date: new Date('1916-02-23'),
                description: 'Butler, then stationed at Port-au-Prince, Haiti, wrote to the Secretary of the Navy, attempting to decline the Medal of Honor, writing: “the undersigned feels that no service rendered by him at Vera Cruz, deserves such recognition.”',
                srcUrl: 'https://catalog.archives.gov/id/57279637',
                viewUrl: 'https://catalog.archives.gov/OpaAPI/media/57279637/content/st-louis/military/rg-127/299715/300_Butler_Smedley_01_Page_133.jpg',
                citation: 'Maj. Smedley D. Butler to Secretary of the Navy, 23 Feb. 1916. Official Military Personnel File for Smedley D. Butler, image 133 of 2814; Official Military Personnel Files, 1905-1998; Records of the US Marine Corps, 1775-, Record Group 127. National Archives and Records Administration.'
            },
            {
                id: 'butler91', src: butler91Src, location: colon.value,
                date: new Date('1914-01-08'),
                description: 'In January 1914 Maj. Smedley Butler and his battalion of Marines received orders to leave Panama and report to Rear Admiral Fletcher at Veracruz.',
                srcUrl: 'https://catalog.archives.gov/id/57279637',
                viewUrl: 'https://catalog.archives.gov/OpaAPI/media/57279637/content/st-louis/military/rg-127/299715/300_Butler_Smedley_01_Page_091.jpg',
                citation: 'Orders for Maj. Smedley D. Butler to depart Panama for Veracruz, Mexico, 8 Jan. 1914. Official Military Personnel File for Smedley D. Butler, image 91 of 2814; Official Military Personnel Files, 1905-1998; Records of the US Marine Corps, 1775-, Record Group 127. National Archives and Records Administration.'
            },
            {
                id: 'marines', src: marinesSrc, location: veracruz.value,
                date: new Date('1914-05-16'),
                description: 'US Marines and Army troops continued to occupy the city until late November 1914.',
                srcUrl: 'https://www.loc.gov/item/2010651723/',
                viewUrl: 'https://www.loc.gov/item/2010651723/',
                citation: 'Marines Marching to Station - Mexican War. 16 May 1914. Photograph. Retrieved from the Library of Congress.'
            },
            {
                id: 'ussDolphin', src: ussDolphinSrc, location: tampico.value,
                date: new Date('1914-04-09'),
                description: 'In April 1914, sailors from the gunboat USS _Dolphin_ were detained by Mexican soldiers. Though the sailors were quickly released and the officer who had ordered their detention arrested, escalating US demands for symbolic reparations and their subsequent refusal by the Huerta government led to President Wilson asking the US Congress for permission to occupy Veracruz and remove Huerta from power.',
                srcUrl: 'https://www.loc.gov/item/2004673121/',
                viewUrl: 'https://www.loc.gov/item/2004673121/',
                citation: 'U.S.S. DOLPHIN, 1913-1921: Starboard side view, at pier, Aug. 1915. Photograph. Retrieved from the Library of Congress.'
            },
            {
                id: 'locZevon', src: locZevonSrc, location: losAngeles.value,
                date: new Date('1978-01-08'),
                description: 'In 1977 Warren Zevon and Jorge Calderón recorded the song “Veracruz”, a ballad dramatizing the US occupation. It was released on the album _Excitable Boy_, which also included the songs “Roland the Headless Thompson Gunner” and “Lawyers, Guns, and Money”—satirical takes on Cold War adventurism in Africa and Latin America, respectively.',
                srcUrl: 'https://lccn.loc.gov/99568272',
                viewUrl: 'https://lccn.loc.gov/99568272',
                citation: 'Library of Congress. Catalog record for Zevon, Warren, _Excitable Boy._ LC Catalog, 1978.'
            },
            {
                id: 'wilsonTelegram', src: wilsonTelegramSrc, location: mexicoCity.value,
                date: new Date('1913-02-18'),
                description: 'In February 1913, US Ambassador to Mexico Harold Lane Wilson met with rival Mexican generals Victoriano Huerta and Porfirio Díaz in the US Embassy, a meeting which was widely seen as indicating tacit US support for their coup against elected president Francisco Madero.',
                srcUrl: 'https://history.state.gov/historicaldocuments/frus1913/d836',
                viewUrl: 'https://history.state.gov/historicaldocuments/frus1913/d836',
                citation: 'Henry Lane Wilson to Secretary of State, 18 Feb. 1913. _Papers Relating to the Foreign Relations of the United States, With the Address of the President to Congress December 2, 1913,_ edited by Joseph V. Fuller and Tyler Dennett, Washington: United States Government Printing Office, 1920, Document 836.'
            }
        ];
        docs.sort(compareDocuments)
        return docs
    })

    const tsMin = computed(() => {
        const docs = documents.value;
        if (!docs) {
            return 0
        }
        const firstDoc = docs[0]
        return firstDoc.date.valueOf()
    })

    const tsMax = computed(() => {
        const docs = documents.value;
        if (!docs) {
            return 0
        }
        const lastDoc = docs[docs.length - 1]
        return lastDoc.date.valueOf()
    })

    return {documents, tsMin, tsMax, docSelected, shortDesc, nextDocAfter, prevDocBefore}
})


function compareDocuments(doc1: ArchiveDoc, doc2: ArchiveDoc) {
    const order = doc1.date.valueOf() - doc2.date.valueOf()
    if (order != 0) {
        return order
    }

    return doc1.id.localeCompare(doc2.id)
}
