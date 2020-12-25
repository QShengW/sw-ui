/* eslint-disable no-undefined,no-param-reassign,no-shadow */
/**
 * 限制函数的执行。特别适用于速率限制
 * 对诸如resize和scroll之类的事件执行处理程序。
 * @param  {number}    delay -          以毫秒为单位的零或更大的延迟。对于事件回调，大约100或250（甚至更高）的值最有用。
 * @param  {boolean}   [noTrailing] -   可选，默认为false。如果noTrailing为true，则在调用节流函数时，回调将仅每隔“delay”毫秒执行一次。如果最后一次调用未指*  定，则将在最后一次未指定的时间后执行railing或not throttled函数。（在“delay”毫秒内未调用throttled函数后，内部计数器将重置）。
 * @param  {Function}  callback -       延迟毫秒后要执行的函数。“this”上下文和所有参数都按原样传递，执行节流函数时返回“callback”。
 * @param  {boolean}   [debounceMode] - 如果“debounceMode”为true（在begin），则调度“clear”在“delay”毫秒之后执行。如果“debounceMode”为false（在结束
 * 时）， 安排“callback”在“delay”之后执行。
 * @returns {Function} 一个新的，节流的，功能。
 */
export default function (delay, noTrailing, callback, debounceMode) {
	/*
	 * After wrapper has stopped being called, this timeout ensures that
	 * `callback` is executed at the proper times in `throttle` and `end`
	 * debounce modes.
	 */
	let timeoutID;
	let cancelled = false;

	// Keep track of the last time `callback` was executed.
	let lastExec = 0;

	// Function to clear existing timeout
	function clearExistingTimeout() {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
	}

	// Function to cancel next exec
	function cancel() {
		clearExistingTimeout();
		cancelled = true;
	}

	// `noTrailing` defaults to falsy.
	if (typeof noTrailing !== 'boolean') {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	/*
	 * The `wrapper` function encapsulates all of the throttling / debouncing
	 * functionality and when executed will limit the rate at which `callback`
	 * is executed.
	 */
	function wrapper(...arguments_) {
		let self = this;
		let elapsed = Date.now() - lastExec;

		if (cancelled) {
			return;
		}

		// Execute `callback` and update the `lastExec` timestamp.
		function exec() {
			lastExec = Date.now();
			callback.apply(self, arguments_);
		}

		/*
		 * If `debounceMode` is true (at begin) this is used to clear the flag
		 * to allow future `callback` executions.
		 */
		function clear() {
			timeoutID = undefined;
		}

		if (debounceMode && !timeoutID) {
			/*
			 * Since `wrapper` is being called for the first time and
			 * `debounceMode` is true (at begin), execute `callback`.
			 */
			exec();
		}

		clearExistingTimeout();

		if (debounceMode === undefined && elapsed > delay) {
			/*
			 * In throttle mode, if `delay` time has been exceeded, execute
			 * `callback`.
			 */
			exec();
		} else if (noTrailing !== true) {
			/*
			 * In trailing throttle mode, since `delay` time has not been
			 * exceeded, schedule `callback` to execute `delay` ms after most
			 * recent execution.
			 *
			 * If `debounceMode` is true (at begin), schedule `clear` to execute
			 * after `delay` ms.
			 *
			 * If `debounceMode` is false (at end), schedule `callback` to
			 * execute after `delay` ms.
			 */
			timeoutID = setTimeout(
				debounceMode ? clear : exec,
				debounceMode === undefined ? delay - elapsed : delay
			);
		}
	}

	wrapper.cancel = cancel;

	// Return the wrapper function.
	return wrapper;
}
