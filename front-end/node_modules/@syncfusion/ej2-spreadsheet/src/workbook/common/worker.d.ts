/**
 * Worker task.
 */
export declare function executeTaskAsync(context: Object, taskFn: Function | {
    [key: string]: Function | string[];
}, callbackFn: Function, data?: Object[], preventCallback?: boolean): WorkerHelper;
/**
 * @hidden
 * The `WorkerHelper` module is used to perform multiple actions using Web Worker asynchronously.
 */
declare class WorkerHelper {
    private context;
    private worker;
    private workerTask;
    private defaultListener;
    private workerData;
    private preventCallback;
    private workerUrl;
    /**
     * Constructor for WorkerHelper module in Workbook library.
     * @private
     */
    constructor(context: Object, task: Function | {
        [key: string]: Function | string[];
    }, defaultListener: Function, taskData?: Object[], preventCallback?: boolean);
    /**
     * To terminate the worker task.
     * @private
     */
    terminate(): void;
    /**
     * To initiate the worker.
     * @private
     */
    private initWorker;
    /**
     * Method for getting response from worker.
     * @private
     */
    private messageFromWorker;
    /**
     * Method for getting error message from worker if failed.
     * @private
     */
    private onError;
    /**
     * Construct function code for worker.
     * @private
     */
    private getFnCode;
    /**
     * Get default worker task with callback.
     * @private
     */
    private getCallbackMessageFn;
    /**
     * Get default worker task without callback.
     * @private
     */
    private getMessageFn;
}
export {};
