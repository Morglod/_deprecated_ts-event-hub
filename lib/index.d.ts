export declare const StopEventPropogation: unique symbol;
declare type _HandlerReturn = void | Error | typeof StopEventPropogation;
/**
 * Return `Promise` to wait handler asynchronyasly.
 * Return `Error` if handling failed.
 * Return `StopEventPropogation` to stop event propogation.
 */
export declare type HandlerReturn = _HandlerReturn | Promise<_HandlerReturn>;
export declare type HandlerFunc<EventTypesData_, EventType extends keyof EventTypesData_> = (event: Event<EventTypesData_, EventType>) => HandlerReturn;
export declare type Event<EventTypesData_, EventType extends keyof EventTypesData_, EventData = EventTypesData_[EventType]> = {
    type: EventType;
    payload: EventData;
};
/** { eventType -> eventData } */
export declare type EventTypesData = {
    [eventType: string]: any;
};
export interface EventHandler<EventTypesData_, EventType extends keyof EventTypesData_> {
    handleEvent: HandlerFunc<EventTypesData_, EventType>;
    readonly handleEventTypes?: EventType[];
}
export declare type HandlersPool<EventTypesData_> = EventHandler<EventTypesData_, keyof EventTypesData_>[];
export declare class EventHub<EventTypesData_ = EventTypesData> {
    handlers: HandlersPool<EventTypesData_>;
    constructor(handlers: HandlersPool<EventTypesData_>);
    handlerFailed: (error: Error, handler: EventHandler<EventTypesData_, keyof EventTypesData_>) => void | typeof StopEventPropogation;
    emit: (event: Event<EventTypesData_, keyof EventTypesData_, EventTypesData_[keyof EventTypesData_]>) => Promise<void>;
}
export {};
