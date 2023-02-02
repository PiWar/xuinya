function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data = null) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { subscribe, unsubscribe, publish };
