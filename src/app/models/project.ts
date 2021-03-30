import { ProjectStatus } from "./project-status";

export class Project {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    projectStatus: ProjectStatus = new ProjectStatus(); 
}