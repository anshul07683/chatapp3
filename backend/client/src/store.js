import { createStore,applyMiddleware,compose}  from 'redux';
import  createSagaMiddleware  from  'redux-saga';
import rootSaga from './sagas.js';
import rootReducer from './reducers/index'
const Saga = createSagaMiddleware();
const store = createStore(rootReducer,
                compose(applyMiddleware(Saga),
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));


Saga.run(rootSaga);

export default store;

