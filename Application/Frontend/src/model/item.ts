export interface Item { 
    item_set: string
    item_description: string
    item_type: string
    item_category: number
    serial_nr: string
    lent_from?: string
    return_date?: Date
    notes: string
}