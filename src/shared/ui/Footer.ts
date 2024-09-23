import { BaseComponent } from './BaseComponent';

export class Footer extends BaseComponent {
  template() {
    return `<footer class="bg-gray-200 p-4 text-center">
                <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>`;
  }
}
