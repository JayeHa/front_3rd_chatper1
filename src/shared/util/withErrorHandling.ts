export function withErrorHandling<T extends object>(component: T): T {
  const handler: ProxyHandler<T> = {
    get: (target, prop, receiver) => {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original === 'function') {
        return (...args: any[]) => {
          try {
            console.log(
              '이것은 프록시로 낚아채온 메소드 입니다: ' + original.name
            );

            return original.apply(target, args);
          } catch (error) {
            console.error(`프록시로 캐치햇지롱 😆 "${String(prop)}":`, error);
          }
        };
      }

      return original;
    },
  };

  return new Proxy(component, handler);
}
