import { Company } from './company';

export class BuyOffer {

    id: number;
    company: Company;
    user: string;
    maxPrice: number;
    startAmount: number;
    amount: number;
    dateLimite: Date;
    actual: boolean;

}