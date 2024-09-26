import { withErrorHandling } from '../shared/util/withErrorHandling';

export default class TestComponent {
  constructor() {
    return withErrorHandling(this);
  }

  테스트_컴포넌트에서_에러_던지기() {
    throw new Error('테스트 컴포넌트에서 던진 에러');
  }

  렌더링() {
    this.테스트_컴포넌트에서_에러_던지기();
  }
}
