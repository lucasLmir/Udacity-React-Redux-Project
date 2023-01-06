const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("A ação: ", action);
  const returnValue = next(action);
  console.log("Novo estado: ", store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
