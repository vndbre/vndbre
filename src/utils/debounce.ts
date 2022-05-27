export namespace Debounce {
  export const DEFAULT_DEBOUNCE_TIME_IN_MILLISECONDS = 300;

  /**
   * Decorator that applies delay to the execution of a function.
   * @param fn The source function to which delay will be applied.
   * @param delayTime Delay of the execution of the function in milliseconds.
   */
  export function apply<TArgs extends unknown[]>(
    fn: (this: void, ...args: TArgs) => unknown,
    delayTime = DEFAULT_DEBOUNCE_TIME_IN_MILLISECONDS,
  ): (...args: TArgs) => void {
    let timeoutId: number | null = null;
    return (...args: TArgs) => {
      if (timeoutId != null) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        fn(...args);
      }, delayTime);
    };
  }
}
