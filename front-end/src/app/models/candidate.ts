import { Interview } from './interview';
import { Challenge } from './challenge';

export class Candidate {
    constructor(
        public id:number,
        public name: string,
        public lastName: string,
        public idNumber:string,
        public dateOfBirth: Date,
        public resumeDrive: string,
        public resumeDriveElumen: string,
        public phoneNumber: string,
        public email: string,
        public age:number,
        public university:string,
        public interviewStatus: string,
        public process_challenge_status: string,
        public nameCandidate:string,
        public statusCandidateByElumen:string,
        public commentByElumen:string,
        public interviews: Array<Interview>,
        public challenge: Array<Challenge>
        ){}
}