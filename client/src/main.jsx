import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {persistor, store }from './Redux/store.js'
import ThemeProvider from './Pages/ThemeProvider.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Contexts } from './Context/stateContexts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Contexts>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </Contexts>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
