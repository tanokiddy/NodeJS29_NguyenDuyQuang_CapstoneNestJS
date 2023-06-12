export type LocationDetail = {
    id?: number
    location_name: string
    city?: string
    nation?: string
    image?: string
    user_id?: number
}

export type SearchQueries = {
    pageSize?: number
    pageIndex?: number
    keyword?: string
    orderBy?: 'asc' | 'desc'
}
