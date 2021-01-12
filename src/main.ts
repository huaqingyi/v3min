import { map } from 'lodash';
import { app } from '@/core';
import * as middlewares from '@/core/middlewares';
import * as interceptors from '@/interceptors';
import router from '@/router';

export async function bootstrap() {
    await Promise.all<any>([
        router.isReady(),
        ...map(middlewares, use => use(app)),
        ...map(interceptors, its => its(app)),
    ]);
    return app.mount('#app');
}

bootstrap();
