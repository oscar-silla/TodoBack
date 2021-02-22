import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { iReturn } from 'src/assets/return.interface';

// DTO
import { TaskDTO } from 'src/DTO/task.dto';


// Interfaces
import { iTask } from '../interfaces/task.interface';

// Service
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    findAll(): Promise<iReturn> {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<iReturn> {
        return this.taskService.findOne(id);
    }

    @Post('/create')
    create(@Body() task: TaskDTO): Promise<iReturn> {
        return this.taskService.createNew(task);
    }

    @Put('/update/:id') 
    update(@Param('id') id: string, @Body() task: TaskDTO): Promise<iReturn> {
        return this.taskService.update(id, task);
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: string): Promise<iReturn> {
        return this.taskService.delete(id);
    }
}
