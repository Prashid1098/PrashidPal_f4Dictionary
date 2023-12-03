import React from 'react';
import { handleApiData } from './index.js';
import { ReactDOM } from 'react-dom';
import './style.css';


function App({handleApiData})
{
    return(
        <div>
            <div>{handleApiData[0].word}</div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('records'));