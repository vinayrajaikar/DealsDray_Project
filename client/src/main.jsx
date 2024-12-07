import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import store from './Redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
