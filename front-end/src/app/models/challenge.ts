import { StatusChallenge } from './status-challenge';
import { Candidate } from './candidate';

export class Challenge {
    constructor(
        public id: number,
        public comment: string,
        public dayOfSent: string,
        public dayOfExpected: string,
        public linkChallenge: string,
        public statusChallenge: StatusChallenge,
        public candidate: any,
        public taskId: string,
        public reviewer: string,
        public isfinishProcess: string
    ) {}
}
