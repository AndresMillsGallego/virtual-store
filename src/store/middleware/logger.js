const logger = (store) => (next) => (action) => {
  console.log("__Action__", action);
  return next(action);
}

export default logger;