import { Interview } from './interview';
import { Challenge } from './challenge';

export class Candidate {
    constructor(
        public id:number,
        public name: string,
        public lastName: string,
        public idNumber:string,
        public dateOfBirth: Date,
        public resumeUrl: string,
        public filesUrl: string,
        public phoneNumber: string,
        public email: string,
        public age:number,
        public university:string,
        public interviewStatus: string,
        public process_challenge_status: string,
        public nameCandidate:string,
        public decision:string,
        public comments:string,
        public interviews: Array<Interview>,
        public challenge: Array<Challenge>
        ){}
}
