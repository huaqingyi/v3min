import { AxiosRequestConfig } from 'axios';

export interface Configuration {
    http?: AxiosRequestConfig;
    wellKnown: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
}

