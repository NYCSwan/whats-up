import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './components/main-container.react';
import Increment from './increment.react.js';
import './normalize.scss';


ReactDOM.render(<MainContainer />, document.getElementById('root'));