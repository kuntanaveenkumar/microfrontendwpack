import { Subject } from "rxjs";

const eventBus = new Subject(); 
export const sendMessage = (eventType, payload) => {
  eventBus.next({ eventType, payload }); 
};

export const listenMessage = (eventType, callback) => {
  return eventBus.subscribe(({ eventType: receivedType, payload }) => {
    if (receivedType === eventType) {
      callback(payload);
    }
  });
};

export default eventBus;
