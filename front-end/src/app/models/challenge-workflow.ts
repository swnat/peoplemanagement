import { Challenge } from './challenge';
import { Action } from './challenge-form';

export class ChallengeWorkflow {
    constructor(public userAssignee:String, 
        public candidateId:number,
        public challenge:Challenge,
        public action: Action){}
}