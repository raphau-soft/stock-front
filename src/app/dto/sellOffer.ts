import { Company } from './company';
import { User } from './user';

export class SellOffer{

    id: number;
    user: User;
    company: Company;
    amount: number;
    dateLimit: Date;

}