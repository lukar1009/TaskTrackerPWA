import { TaskStatus } from "./task-status";

export class Task {
    id: number;
    title: string;
    description: string;
    estimatedTime: number;
    timeSpent: number;
    taskStatus: TaskStatus = new TaskStatus();
}