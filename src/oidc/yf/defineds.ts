import { Configuration } from './types';

export default (config: Configuration) => {
    return {
        ...{
            client_id: '',
            client_secret: '',
            redirect_uri: '',
            wellKnown: '',
        },
        ...config,
    };
};
