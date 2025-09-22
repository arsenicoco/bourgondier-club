import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_vjTeAQNd.mjs';
import { manifest } from './manifest_BXTnJBo4.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/create-checkout.astro.mjs');
const _page3 = () => import('./pages/api/create-checkout-en.astro.mjs');
const _page4 = () => import('./pages/api/session.astro.mjs');
const _page5 = () => import('./pages/api/webhook.astro.mjs');
const _page6 = () => import('./pages/en/admin.astro.mjs');
const _page7 = () => import('./pages/en/success.astro.mjs');
const _page8 = () => import('./pages/en.astro.mjs');
const _page9 = () => import('./pages/success.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/create-checkout.ts", _page2],
    ["src/pages/api/create-checkout-en.ts", _page3],
    ["src/pages/api/session.ts", _page4],
    ["src/pages/api/webhook.ts", _page5],
    ["src/pages/en/admin.astro", _page6],
    ["src/pages/en/success.astro", _page7],
    ["src/pages/en/index.astro", _page8],
    ["src/pages/success.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "714e85a6-2777-455e-bfb2-78c80bccba3a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
