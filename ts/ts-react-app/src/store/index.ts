import { configureStore } from '@reduxjs/toolkit'
// import { ThunkAction } from 'redux-thunk'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const middlewares = [
  thunk,
];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger').createLogger;
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares
})

// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
  // @ts-ignore
  module.hot.accept('./reducer/index.ts', () => {
    const newRootReducer = require('./reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store