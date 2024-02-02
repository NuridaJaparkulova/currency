import axios from "axios";
import { makeAutoObservable } from "mobx";

export class RootStore {
    data = [];
    isLoading = false;
    error = null;

    
    constructor() {
        makeAutoObservable(this);
    }


    

    fetchData = async () => {
        this.isLoading = true;
        try {
            const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
            this.data = response.data.Valute;
        } catch (error: any) {
            this.error = error.message || 'Произошла ошибка';
        } finally {
            this.isLoading = false;
        }
    };
    fetchDate = async () => {
        this.isLoading = true;
        try {
            const response = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
            this.data = response.data.date
        } catch (error: any) {
            this.error = error.message || 'Произошла ошибка';
        } finally {
            this.isLoading = false;
        }
    }
    fetchRates = async () => {
        this.isLoading = true;
        try {
            const response = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
            this.data = response.data.rates
        } catch (error: any) {
            this.error = error.message || 'Произошла ошибка';
        } finally {
            this.isLoading = false;
        }
    }



}