import { e as createAstro, f as createComponent, r as renderTemplate, n as renderSlot, k as renderComponent, o as renderHead, h as addAttribute } from './astro/server_ULqvgEQD.mjs';
import 'kleur/colors';
/* empty css                         */
import { $ as $$ThemeSwitcher, a as $$LanguageSwitcher } from './LanguageSwitcher_CajyQ0wb.mjs';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://club.bourgondier.wine");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate(_a || (_a = __template(['<html lang="ru"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><title>\u041A\u043B\u0443\u0431 \u0432\u0438\u043D\u043D\u044B\u0445 \u0432\u0441\u0442\u0440\u0435\u0447 "Bourgondier Weekly"</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Noto+Serif+Display&display=swap" rel="stylesheet"><script>\n            function updateTheme() {\n                const isDark = localStorage.getItem("theme") === "dark";\n\n                if (isDark) {\n                    document.documentElement.classList.add("dark");\n                    document.body.classList.remove("light-theme");\n                    document.body.classList.add("dark-theme");\n                } else {\n                    document.documentElement.classList.remove("dark");\n                    document.body.classList.remove("dark-theme");\n                    document.body.classList.add("light-theme");\n                }\n            }\n\n            // Apply theme immediately, defaulting to light if no preference set\n            if (!localStorage.getItem("theme")) {\n                localStorage.setItem("theme", "light");\n            }\n            updateTheme();\n\n            // Set language to Russian on load\n            localStorage.setItem("language", "ru");\n        <\/script>', '</head> <body class="min-h-screen"> <div class="absolute top-4 right-4 z-10 flex gap-2"> ', " ", " </div> ", " </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {}), renderComponent($$result, "ThemeSwitcher", $$ThemeSwitcher, {}), renderSlot($$result, $$slots["default"]));
}, "/Users/arseniykorobchenko/Projects/bm/club/puffy-pegasi/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
