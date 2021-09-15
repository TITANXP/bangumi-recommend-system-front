import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App'

ReactDOM.render(
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
        <App/>,
    </BrowserRouter>,
    // </ThemeProvider>,
    document.getElementById('root')
);