import LoginPage from './pages/login';
import TestComponent from './pages/test';

export default class App {
  constructor(selector: string) {
    console.log(new LoginPage(selector)); // Proxy(LoginPage) {$root: div#root}
    console.log(new TestComponent()); // Proxy(TestComponent) {}

    // new TestComponent().테스트_컴포넌트에서_에러_던지기(); // 이것은 프록시로 낚아채온 메소드 입니다: 테스트_컴포넌트에서_에러_던지기
    // new LoginPage(selector).로그인_페이지에서_에러_던지기(); // 이것은 프록시로 낚아채온 메소드 입니다: 로그인_페이지에서_에러_던지기

    // router.init({
    //   '/': () => new HomePage(selector),
    //   '/login': () => new LoginPage(selector),
    //   '/profile': () => new ProfilePage(selector),
    //   '/404': () => new ErrorPage(selector),
    // });
  }
}
