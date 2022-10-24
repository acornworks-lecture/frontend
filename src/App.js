import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import * as rrweb from 'rrweb';

function App() {
  const [ ratio, setRatio ] = useState(null);
  const [ quote, setQuote ] = useState(null);
  const [ events ] = useState([]);  
  let stopRecord;
  

  useEffect(() => {
    stopRecord = rrweb.record({
      emit(event) {
        events.push(event);
      }
    })
  });

  const saveIntoLocalStorage = (e) => {
    const date = new Date();

    const pad2 = (n) => {
      return (n < 10 ? '0' : '') + n
    };

    const saveKey = 'record-' + date.getFullYear() +
          pad2(date.getMonth() + 1) + 
          pad2(date.getDate()) +
          pad2(date.getHours()) +
          pad2(date.getMinutes()) +
          pad2(date.getSeconds());

    window.localStorage.setItem(saveKey, JSON.stringify(events));

    if (stopRecord != null) {
      stopRecord();
    }
  }

  const sendQuote = (e) => {    
    const ticker = document.getElementById('iptTicker').value;
    const isRatio = document.getElementById('iptChkRatio').checked;

    const callUrl = 'http://localhost:65080/quote/' + (isRatio ? 'ratio/' : '') + ticker;

    fetch(callUrl, {  method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      if (isRatio) {
        setQuote(null);
        setRatio(data['ratio']);
      } else {
        setRatio(null);
        setQuote(data);
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Check your currency rate</p>
        <table border={0}>
          <tr>
            <td rowSpan={2} style={{verticalAlign: 'top'}}>Ticker: </td>
            <td rowSpan={2} style={{verticalAlign: 'top'}}><input type="text" id="iptTicker" placeholder='Enter ticker for Yahoo!' style={{fontSize: '20px'}}/></td>
            <td><input type="button" value="Quote!" style={{fontSize: '20px'}} onClick={sendQuote}/></td>
          </tr>
          <tr>
            <td>
              <table border={0}>
                <tr>
                  <td>Ratio</td>
                  <td><input type="checkbox" id="iptChkRatio"/></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>            
            <td colSpan={3}><input type="button" value="Save into local storage" onClick={saveIntoLocalStorage}/></td>
          </tr>
        </table>

        {!ratio ? null : (
            <table border={0}>
              <tr>
                <td>Ratio: </td>
                <td>{ratio}</td>
              </tr>
            </table>
        )}
        {!quote ? null : (
            <table border={0}>
              <tr>
                <td>Price: {quote['price']}</td>
                <td>&nbsp;</td>
                <td>Time: {quote['timestamp']}</td>
              </tr>
            </table>
        )}
      </header>
    </div>
  );
}

export default App;
