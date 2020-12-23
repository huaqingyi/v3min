/*
 * @FilePath: /vue3-template/src/interceptors/router.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:03:33
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 18:21:51
 * @debugger: 
 */
import { router } from '@/rotuer';
import NProgress from 'nprogress';
import { Auth } from '../config/auth';

NProgress.configure({ showSpinner: false });

router.beforeEach((to, _, next) => {
    NProgress.start();
    
    const toDepth = to.path.split('/').length;
    const fromDepth = _.path.split('/').length;
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

    const auth = new Auth(to, _, next);
    auth.auth();
});

router.afterEach(() => {
    // Finish progress bar
    NProgress.done();
    // // set page title
    // document.title = getPageTitle(to.meta.title);
});
