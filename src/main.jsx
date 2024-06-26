import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.scss'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
)
