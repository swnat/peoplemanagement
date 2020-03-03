import { StatusChallenge } from './status-challenge';

export class ChallengeForm {
    constructor(
        public comment: string,
        public dayOfSent: string,
        public dayOfExpected: string,
        public statusChallenge: StatusChallenge,
        public linkChallenge: string,
        public taskId: string,
        public reviewer: string,
        public userAssignee: String,
        public candidateId: number,
        public action: Action) {}
}

export enum Action {ADD, EDIT}
