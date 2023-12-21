import type {Location} from './Location'

type ArchiveDoc = {
    id: string,
    src: string,
    location: Location,
    date: Date,
    description: string,
    srcUrl: string,
    citation: string,
    viewUrl: string
}

export type {ArchiveDoc}
