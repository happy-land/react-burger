import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
} from './actions/feed';
import { ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_CLOSED, ORDERS_CONNECTION_ERROR, ORDERS_CONNECTION_INIT, ORDERS_CONNECTION_SUCCESS, ORDERS_GET_MESSAGE } from './actions/orders';
import { socketMiddleware } from './middleware/socket-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const ordersWsActions = {
  wsInit: ORDERS_CONNECTION_INIT,
  wsClose: ORDERS_CONNECTION_CLOSE,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onClose: ORDERS_CONNECTION_CLOSED,
  onError: ORDERS_CONNECTION_ERROR,
  onMessage: ORDERS_GET_MESSAGE,
};

const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  wsClose: FEED_CONNECTION_CLOSE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE,
};

// const store = createStore(rootReducer, enhancer);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(ordersWsActions),
      socketMiddleware(feedWsActions),
    )
  )
);

export default store;
