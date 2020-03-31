import { Interview } from './interview';
import { Action } from './interview-form';

export class InterviewWorkflow {
    constructor(public userAssignee: String,
        public candidateId: string,
        public interview: Interview,
        public action: Action) {}
}
