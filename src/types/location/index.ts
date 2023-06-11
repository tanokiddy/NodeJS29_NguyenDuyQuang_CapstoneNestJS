export type LocationDetail = {
    id?: number
    location_name: string
    city?: string
    nation?: string
    image?: string
    user_id?: number
}

export type SearchLocationQueries = {
    pageSize?: number
    pageIndex?: number
    keyword?: string
    orderBy?: 'asc' | 'desc'
}
