export class Approval {
    constructor(
        public taskId: string,
        public userAssignee: String,
        public candidateId: string, public description: string) {}
}
