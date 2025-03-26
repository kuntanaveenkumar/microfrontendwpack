// import { Subject } from "rxjs";
// const eventBus = new Subject(); 
// export const sendMessage = (eventType, payload) => {
//   eventBus.next({ eventType, payload }); 
// };
// export const listenMessage = (eventType, callback) => {
//   return eventBus.subscribe(({ eventType: receivedType, payload }) => {
//     if (receivedType === eventType) {
//       callback(payload);
//     }
//   });
// };
// export default eventBus;
// mainApp/src/eventBus.js
class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  emit(event, data) {    
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

window.eventBus = window.eventBus || new EventBus();
export default window.eventBus;
