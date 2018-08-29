export const StopEventPropogation = Symbol('StopPropogation');

type _HandlerReturn = void|Error|typeof StopEventPropogation;

/**
 * Return `Promise` to wait handler asynchronyasly.  
 * Return `Error` if handling failed.  
 * Return `StopEventPropogation` to stop event propogation.
 */
export type HandlerReturn = _HandlerReturn | Promise<_HandlerReturn>;

export type Event<EventType extends string, EventData = any> = {
    type: EventType,
    payload: EventData,
};

/** { eventType -> eventData } */
export type EventTypesData = { [eventType: string]: any };

export abstract class EventHandler<
    EventTypesData_,
    EventType extends keyof EventTypesData_,
    EventData = EventTypesData_[EventType]
> {
    abstract handle(payload: EventData): HandlerReturn;
    readonly type: EventType;

    constructor(type: EventType) {
        this.type = type;
    }
}

export type HandlersPool<
    EventTypesData_ extends { [eventType: string]: any },
> = EventHandler<EventTypesData_, keyof EventTypesData_>[];

export class EventHub {

}

type ExampleEventTypes = {
    newTasks: {
        tasks: {
            uuid: string,
            name: string,
        }[],
    },
    updateTasks: {
        tasks: {
            [uuid: string]: {
                name?: string,
            }
        }
    },
};

const exampleHub = new EventHub();

class ExampleHandler {
    handle(payload: number) {
        return;
    }
}