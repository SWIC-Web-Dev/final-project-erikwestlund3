const createStore = (() => {
  let state = {
    currentUser: null,
    products: [],
    users: [],
    cart: [],
    isAdmin: false,
  };
  let subscribers = [];

  const getState = () => JSON.parse(JSON.stringify(state));

  const setState = (newState) => {
    state = { ...state, ...newState };
    subscribers.forEach((subscriber) => subscriber(state));
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((sub) => sub !== callback);
    };
  };

  return { getState, setState, subscribe };
})();

export default createStore;
