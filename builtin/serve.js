const Koa = require('koa');
const fs = require('fs-extra');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const web = require('./webpack.config');
const path = require('path');
const component = require('./webpack.component');
const serve = require('koa-static');
const Router = require('@koa/router');
const cors = require('koa2-cors');

async function boostrap () {
    const app = new Koa();

    app.use(cors());

    fs.removeSync(path.resolve(__dirname, 'dist'));
    fs.mkdirSync(path.resolve(__dirname, 'dist'));

    const componentConfig = component(process.env);
    const componentCompiler = webpack(componentConfig);
    await componentCompiler.watch({
        poll: 1000,
        aggregeateTimeout: 500,
        ignored: /node_modules/,
    }, (err, stats) => {
        if (err) console.error(err);
        // console.log(stats);
    });

    const webConfig = web(process.env);
    const webCompiler = webpack(webConfig);
    const webMiddleware = await koaWebpack({ compiler: webCompiler });
    app.use(webMiddleware);

    // app.use(async (ctx) => {
    //     const filename = path.resolve(webConfig.output.path, 'index.html')
    //     ctx.response.type = 'html'
    //     ctx.response.body = webMiddleware.devMiddleware.fileSystem.createReadStream(filename)
    // });

    // app.use(serve(__dirname + '/test/fixtures'));

    const router = new Router();
    router.get('/', async (ctx) => {
        const filename = path.resolve(webConfig.output.path, 'index.html')
        ctx.response.type = 'html'
        ctx.response.body = webMiddleware.devMiddleware.fileSystem.createReadStream(filename)
    });
    router.get(/\/_oss_component\/.+\.js$/, async (ctx)=>{
        const filename = ctx.path.replace('/_oss_component','');
        const p = path.join(__dirname, 'packages', filename);
        const data = fs.readFileSync(p);
        ctx.response.type = 'application/javascript; charset=UTF-8';
        ctx.response.body = data;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(8082);
}

boostrap();
