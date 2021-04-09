import { MediaEntry } from "../types";

export interface VaultItems {
    photos:MediaEntry[],
    videos:MediaEntry[],
    quotes:{
        quote:string,
        author:string,
    }[],
    audio:MediaEntry[],
}