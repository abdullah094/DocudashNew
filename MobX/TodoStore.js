// counter.store.js
import React from "react";
import { makeObservable, action, observable } from "mobx";

class CounterStore {
  count = 0; // count is now persistent.
  access_token = "acces token";
  step = 0;
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action.bound,
      decrement: action.bound,
      access_token: observable,
      step: observable,
    });
  }
  incrementStep() {}
  addAccessToekn(action) {}
  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

// Instantiate the counter store.
const counterStore = new CounterStore();
// Create a React Context with the counter store instance.
export const CounterStoreContext = React.createContext(counterStore);
export const useCounterStore = () => React.useContext(CounterStoreContext);
