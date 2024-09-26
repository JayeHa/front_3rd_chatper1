import { isLoggedIn, login } from '../shared/util/auth';
import { router } from '../shared/util/Router';
import { withErrorHandling } from '../shared/util/withErrorHandling';

const ID = {
  LOGIN_FORM: 'login-form',
  USER_NAME: 'username',
};

export default class LoginPage {
  protected $root: Element | null;

  constructor(selector: string) {
    this.$root = this.getRootElement(selector);
    if (this.$root) this.render();

    return withErrorHandling(this);
  }

  로그인_페이지에서_에러_던지기() {
    throw new Error('로그인 페이지에서 던진 에러');
  }

  private getRootElement(selector: string): Element | null {
    const $root = document.querySelector(selector);
    if (!$root) {
      console.error(
        `Selector "${selector}"에 해당하는 요소를 찾을 수 없습니다.`
      );
    }
    return $root;
  }

  render() {
    if (!this.$root) return;

    this.$root.innerHTML = this.template();
    this.afterRender();
  }

  afterRender() {
    this.checkAccess();
    this.bindLoginEvent();
  }

  private checkAccess() {
    if (isLoggedIn()) {
      router.navigateTo('/');
    }
  }

  private bindLoginEvent() {
    console.log(this); // LoginPage {$root: div#root}

    const $loginForm = this.getElement<HTMLFormElement>(`#${ID.LOGIN_FORM}`);
    if (!$loginForm) return;

    $loginForm.addEventListener('submit', this.handleLogin.bind(this));
  }

  private handleLogin(e: SubmitEvent) {
    e.preventDefault();

    const $nameInput = this.getElement<HTMLInputElement>(`#${ID.USER_NAME}`)!;
    const username = $nameInput.value.trim();

    login({ name: username });
  }

  protected getElement<T extends HTMLElement>(selector: string) {
    const $element = this.$root?.querySelector(selector) as T | undefined;
    if (!$element) {
      console.error(
        `Selector "${selector}"에 해당하는 요소를 찾을 수 없습니다.`
      );
    }
    return $element;
  }

  template() {
    return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>

        <form id="${ID.LOGIN_FORM}">
          <div class="mb-4">
            <input id="${ID.USER_NAME}" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>

        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
    `;
  }
}
