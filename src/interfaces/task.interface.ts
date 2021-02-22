import { Document } from 'mongoose';

export interface iTask extends Document{
    readonly id?: string;
    readonly title: string;
    readonly todo: string;
    readonly priority: string;
    readonly done: boolean;
}