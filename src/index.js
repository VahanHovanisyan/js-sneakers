import '/src/css/style.scss'; // style
import { getFetchAll } from '/src/fetch';
import getHeader from './components/header';
import { renderPages } from './router';
export const app = document.getElementById('app');

(async () => {
    getHeader()
    await getFetchAll();
    renderPages();
})();