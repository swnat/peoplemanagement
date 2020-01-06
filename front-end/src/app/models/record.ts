import { User } from './user';

export class Record {
    constructor(
        public candidateName:string,
        public timeStampString: string,
        public userName: string,
        public process: string,
        public action: string,
        public details: Object,
        public collapse: boolean
        ){}
}