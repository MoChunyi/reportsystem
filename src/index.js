import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import SiderDemo from './models/Navi'
import * as serviceWorker from './serviceWorker';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import store from './stores';
import './index.css';

const App = () => {
    return (
        <React.Fragment>
            <Provider store={store}>
                <SiderDemo />
            </Provider>
        </React.Fragment>
    )
}

//首先渲染SiderDemo组件
ReactDOM.render( <App/>, document.getElementById('root'));
serviceWorker.unregister();
