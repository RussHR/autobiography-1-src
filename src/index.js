if (module.hot) {
    module.hot.accept();
}

import React from 'react';
import { render } from 'react-dom';
import Autobiography1 from './components/Autobiography1';
import 'normalize.css';
import './main.scss';

render(<Autobiography1 />, document.getElementById('autobiography-1'));
