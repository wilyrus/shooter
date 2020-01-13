const EventEmitter = class {
    subs: any[] = []

    emit(eventName: string, context: any) {
        this.subs.forEach(event => event.eventName === eventName && event.handler(context));
    }

    on(eventName: string, handler: any) {
        this.subs.push({ eventName, handler });
    }
}

export { EventEmitter };