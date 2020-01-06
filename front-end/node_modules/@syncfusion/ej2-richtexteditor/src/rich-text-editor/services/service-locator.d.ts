/**
 * ServiceLocator
 * @hidden
 * @deprecated
 */
export declare class ServiceLocator {
    private services;
    /**
     * register method
     * @hidden
     * @deprecated
     */
    register<T>(name: string, type: T): void;
    /**
     * getService method
     * @hidden
     * @deprecated
     */
    getService<T>(name: string): T;
}
