import { StatusCandidate } from './status-candidate';
import { Candidate } from './candidate';

export class Interview {
    constructor(
        public id: number,
        public comment: string,
        public dayOfInterview: string,
        public statusCandidate: StatusCandidate,
        public candidate: any,
        public taskId: string,
        public participants: string[],
        public isFinishProcess: boolean
    ) {}
}
