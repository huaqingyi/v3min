import { AxiosRequestConfig } from 'axios';

export interface ConfigData {
    debug?: boolean;
    appId?: string;
    timestamp?: number;
    nonceStr?: string;
    signature?: string;
    jsApiList?: string[];
    success?: (res?: any) => void;
    fail?: (res?: any) => void;
    complete?: (res?: any) => void;
    cancel?: (res?: any) => void;
    trigger?: (res?: any) => void;
}

export interface Configuration {
    config: ConfigData;
    http?: AxiosRequestConfig;
    agentid?: string;
    type?: string;
    appName: string;
};
