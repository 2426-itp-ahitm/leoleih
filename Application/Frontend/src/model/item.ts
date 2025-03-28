import {IconType} from "../model/icon";

export interface Item {
    readonly dev_id: number;
    readonly dev_type: string;
    readonly dev_category: IconType;
    readonly dev_serial_nr: string;
    readonly dev_asset_nr: string;
    readonly lent_from: number;
    readonly return_date: Date;
    readonly notes: string;
    readonly dev_set: string;
}