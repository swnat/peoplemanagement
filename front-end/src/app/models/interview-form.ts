import { StatusCandidate } from './status-candidate';

export class InterviewForm {
    constructor(
        public comment: string,
        public dayOfInterview: string,
        public statusCandidate: StatusCandidate,
        public taskId: string,
        public participants: string[],
        public userAssignee:String, 
        public candidateId:string,
        public action:Action){}
}

export enum Action {ADD, EDIT}