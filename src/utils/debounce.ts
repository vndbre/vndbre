export namespace Debounce {
  export const DEFAULT_DEBOUNCE_TIME_IN_MILLISECONDS = 300;

  /**
   * Decorator that applies delay to the execution of a function.
   * @param fn The source function to which delay will be applied.
   * @param delay Delay of the execution of the function in ms.
   */
  export function apply<TArgs extends unknown[]>(
    fn: (this: void, ...args: TArgs) => unknown,
    delay = DEFAULT_DEBOUNCE_TIME_IN_MILLISECONDS,
  ): (...args: TArgs) => void {
    let timeoutID: number | null = null;
    return (...args: TArgs) => {
      if (timeoutID != null) {
        window.clearTimeout(timeoutID);
      }

      timeoutID = window.setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
}
