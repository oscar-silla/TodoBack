import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Interfaces
import { iTask } from '../interfaces/task.interface';
import { iReturn } from '../assets/return.interface';

// DTO
import { TaskDTO } from '../DTO/task.dto';


@Injectable()
export class TasksService {

    constructor(@Inject('TASK_MODEL') private readonly taskModel: Model<iTask>) { }

    /***
     * @FindAll (GET)
     * return Promise<iReturn>
    ********************************/
    async findAll(): Promise<iReturn> {
        const promise = new Promise<iReturn>((res) => {
            this.taskModel.find().sort({date: -1}).exec().then(r => {
                res({
                    msg: "All Tasks",
                    status: 200,
                    data: r,
                    validRequest: true
                });
            });
        });
        return promise;
    }

    /***
     * @FindById (GET)
     * return Promise<iReturn>
    ********************************/
    async findOne(id: string): Promise<iReturn> {
        const exist = await this.taskModel.exists({ _id: id });
        console.log(exist);
        const promise = new Promise<iReturn>((res, rej) => {
            if (!exist) {
                res({
                    msg: "Can't find task!",
                    status: 404,
                    data: undefined,
                    validRequest: false
                });
            } else {
                this.taskModel.findOne({ _id: id }).exec().then(r => {
                    res({
                        msg: `Task ${id}`,
                        status: 200,
                        data: r,
                        validRequest: true
                    });
                });
            }
        });
        return promise;
    }

    /***
     * @CreateTask (POST)
     * return Promise<iReturn>
    ********************************/
    async createNew(taskDetail: TaskDTO): Promise<iReturn> {
        const promise = new Promise<iReturn>((res) => {
            const task = new this.taskModel(taskDetail);
            task.save().then(r => {
                res({
                    msg: `Task has been created!`,
                    status: 200,
                    data: r,
                    validRequest: true
                });
            });
        });
        return promise;
    }

    /***
     * @UpdateTask (PUT)
     * return Promise<iReturn>
    ********************************/
    async update(id: string, taskDetail: TaskDTO): Promise<iReturn> {
        const exist = await this.taskModel.exists({ _id: id });
        const promise = new Promise<iReturn>((res) => {
            if (!exist) {
                res({
                    msg: `Can't find task!`,
                    status: 404,
                    data: undefined,
                    validRequest: true
                });
            } else {
                this.taskModel.findByIdAndUpdate(id, taskDetail, { new: true }).exec().then(r => {
                    res({
                        msg: `Task has been updated!`,
                        status: 200,
                        data: r,
                        validRequest: true
                    });
                });
            }
        });
        return promise;
    }

    /***
     * @DeleteTask (Delete)
     * return Promise<iReturn>
    ********************************/
    async delete(id: string): Promise<iReturn> {
        const exist = await this.taskModel.exists({_id : id});
        const promise = new Promise<iReturn>((res) => {
            if (!exist) {
                res({
                    msg: `Can't find task!`,
                    status: 404,
                    data: undefined,
                    validRequest: true
                });
            } else {
                this.taskModel.findByIdAndDelete(id).exec().then(() => {
                    res({
                        msg: `Task has been deleted!`,
                        status: 200,
                        data: id,
                        validRequest: true
                    });
                });
            }
        });
        return promise;
    }
}
