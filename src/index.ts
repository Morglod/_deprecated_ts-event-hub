export const StopEventPropogation = Symbol('StopPropogation');

type _HandlerReturn = void|Error|typeof StopEventPropogation;

/**
 * Return `Promise` to wait handler asynchronyasly.  
 * Return `Error` if handling failed.  
 * Return `StopEventPropogation` to stop event propogation.
 */
export type HandlerReturn = _HandlerReturn | Promise<_HandlerReturn>;

export type HandlerFunc<EventTypesData_, EventType extends keyof EventTypesData_> = (event: Event<EventTypesData_, EventType>) => HandlerReturn;

export type Event<
    EventTypesData_,
    EventType extends keyof EventTypesData_,
    EventData = EventTypesData_[EventType]
> = {
    type: EventType,
    payload: EventData,
};

/** { eventType -> eventData } */
export type EventTypesData = { [eventType: string]: any };

export interface EventHandler<
    EventTypesData_,
    EventType extends keyof EventTypesData_,
> {
    handleEvent: HandlerFunc<EventTypesData_, EventType>;
    readonly handleEventTypes?: EventType[];
}

export type HandlersPool<EventTypesData_> = EventHandler<EventTypesData_, keyof EventTypesData_>[];

export class EventHub<EventTypesData_ = EventTypesData> {
    constructor(
        public handlers: HandlersPool<EventTypesData_>,
    ) {}

    handlerFailed = (error: Error, handler: EventHandler<EventTypesData_, keyof EventTypesData_>): void|(typeof StopEventPropogation) => {
        return;
    };

    emit = async (event: Event<EventTypesData_, keyof EventTypesData_>) => {
        handlerLoop:
        for (let i = 0; i < this.handlers.length; ++i) {
            const handler = this.handlers[i];
            if (handler.handleEventTypes !== undefined && !handler.handleEventTypes.includes(event.type)) {
                continue;
            }
            let r = handler.handleEvent(event);
            if (r instanceof Promise) r = await r;
            if (r instanceof Error) r = this.handlerFailed(r, handler);
            if (r === StopEventPropogation) break handlerLoop;
        }
    };
}
