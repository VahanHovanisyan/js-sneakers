// router pages 
import Navigo from "navigo";
import getPageContainer from "/src/components/pageContainer";

export const router = new Navigo('/js-sneakers', { hash: true });

const main = getPageContainer();

export function renderPages() {

  // router main page
  router.on('/', async () => {
    main.innerHTML = '';
    const mainModule = await import('./pages/main');
    const mainPage = mainModule.getMainPage();
    main.append(mainPage);
  });

  // router Favorite page
  router.on('/favorite', async () => {
    main.innerHTML = '';
    const favoriteModule = await import('./pages/favorite');
    const favoritePage = favoriteModule.getFavoritePage();
    main.append(favoritePage);
  });

  // router Profile page
  router.on('/profile', async () => {
    main.innerHTML = '';
    const profileModule = await import('./pages/profile');
    const profilePage = profileModule.getProfilePage();
    main.append(profilePage);
  });

  // router notFound page
  router.notFound(async () => {
    main.innerHTML = '';
    const notFoundModule = await import('./pages/404');
    const notFoundPage = notFoundModule.getNotFoundPage();
    main.append(notFoundPage);
  })

  // router pages
  router.resolve();
}
