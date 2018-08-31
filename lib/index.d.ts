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
export declare abstract class EventHandler<EventTypesData_, EventType extends keyof EventTypesData_> {
    constructor(handleEventTypes: EventType[], handleEvent: HandlerFunc<EventTypesData_, EventType>);
    readonly handleEventTypes: EventType[];
    readonly handleEvent: HandlerFunc<EventTypesData_, EventType>;
}
export declare type HandlersPool<EventTypesData_, ETypes extends keyof EventTypesData_> = EventHandler<EventTypesData_, ETypes>[];
export declare class EventHub<EventTypesData_ = EventTypesData, ETypes extends keyof EventTypesData_ = keyof EventTypesData_> {
    handlers: HandlersPool<EventTypesData_, any>;
    constructor(handlers: HandlersPool<EventTypesData_, any>);
    handlerFailed: (error: Error, handler: EventHandler<EventTypesData_, ETypes>) => void | typeof StopEventPropogation;
    emit: (event: Event<EventTypesData_, ETypes, EventTypesData_[ETypes]>) => Promise<void>;
}
export {};
