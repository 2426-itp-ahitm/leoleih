export interface Item {
    dev_id: number;
    dev_type: string;
    dev_category: number;
    dev_serial_nr: string;
    dev_asset_nr: string;
    lent_from: number;
    return_date: Date;
    notes: string;
    dev_set: string;
}