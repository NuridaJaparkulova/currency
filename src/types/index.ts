export interface ICurrencyData {
    Date: string;
    PreviousDate: string;
    PreviousUrl: string;
    Timestamp: string;
    Valute: {
        [key: string]: ICurrency
    }
}

export interface ICurrency {
    ID: string;
    NumCode: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}
export interface IRates {
	value: number;
    base: string,
    rates: {
        [key: string] : number
    }
}