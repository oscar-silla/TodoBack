import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop()
    title: String;
    @Prop()
    todo: String;
    @Prop()
    priority: String;
    @Prop()
    done: Boolean;
    @Prop({ default: new Date() })
    date: String;
};

export const TaskSchema = SchemaFactory.createForClass(Task);