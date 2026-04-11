let listeners = [];

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

function notify(type, args) {
  listeners.forEach(l =>
    l({
      type,
      message: args.map(a =>
        typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
      ).join(' ')
    })
  );
}

['log', 'warn', 'error'].forEach(type => {
  const original = console[type];
  console[type] = (...args) => {
    notify(type, args);
    original.apply(console, args);
  };
});