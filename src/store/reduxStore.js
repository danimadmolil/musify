import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import rootReducer from "./reducers/root.reducer";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer(),
  compose(
    applyMiddleware(sagaMiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);
sagaMiddleWare.run(rootSaga);
export default store;
