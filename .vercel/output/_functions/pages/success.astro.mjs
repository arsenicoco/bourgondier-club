/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_ULqvgEQD.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C-6qTS7y.mjs';
export { renderers } from '../renderers.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u0411\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-white to-pink-50 dark:from-black to-gray-900 flex items-center justify-center px-4"> <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"> <div class="mb-6"> <div class="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
Бронирование подтверждено!
</h1> <p class="text-gray-600 dark:text-gray-300">
Спасибо за оплату встречи.
</p> </div> <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6"> <h2 class="font-semibold text-gray-900 dark:text-white mb-2">
Детали
</h2> <div id="booking-details" class="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left"> <div>• Загружаем детали...</div> </div> </div> <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6"> <h2 class="font-semibold text-gray-900 dark:text-white mb-2">
Что дальше?
</h2> <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left"> <li>• Чек отправлен на указанную почту</li> <li>• Мы свяжемся с вами на неделе встречи по почте</li> <li>• Адрес и время будут в письме-подтверждении</li> </ul> </div> <div class="space-y-3"> <a href="/" class="block w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-red-700 dark:bg-dark-primary dark:hover:bg-red-500 transition-colors">
Вернуться на главную
</a> <p class="text-sm text-gray-500 dark:text-gray-400">
Остались вопросы? Напишите <a href="https://t.me/leshakostin">
нам в телеграм</a>.
</p> </div> </div> </main> ${renderScript($$result2, "/Users/arseniykorobchenko/Projects/bm/club/puffy-pegasi/src/pages/success.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/arseniykorobchenko/Projects/bm/club/puffy-pegasi/src/pages/success.astro", void 0);

const $$file = "/Users/arseniykorobchenko/Projects/bm/club/puffy-pegasi/src/pages/success.astro";
const $$url = "/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Success,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
