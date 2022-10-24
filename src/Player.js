import { useEffect, useState } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function Player() {
    const [ playKeys, updatePlayKeys ] = useState([]);
    const [ display, setDisplay ] = useState(false);

    useEffect(() => {
        let keyIdx = 0;
        let keyStr;
        const keyList = [];

        while((keyStr = window.localStorage.key(keyIdx)) != null) {
            if (keyStr.startsWith('record-')) {
                keyList.push(keyStr);
            }

            keyIdx++;
        }

        updatePlayKeys(keyList);
    }, []);

    const startReplay = (e) => {
        const keyName = document.getElementById('selectData').value;

        const events = JSON.parse(window.localStorage.getItem(keyName));

        if (!display) {
            setDisplay(true);

            new rrwebPlayer({
                target: document.getElementById('divPlayer'),
                props: {
                    width: 800,
                    height: 600,
                    events: events
                }
            });    
        }

    }

    return (
        <>
            <div id="divPlayer"></div>
            <table border={0}>
                <tr>
                    <td>
                        <select id="selectData" key="selectData">
                        {
                            playKeys.map((keyName) => (<option key={keyName} value={keyName}>{keyName}</option>))
                        }
                        </select>                    
                    </td>
                    <td>
                        <input type="button" value="Play!" onClick={startReplay} />
                    </td>
                </tr>
            </table>
        </>
    );
}

export default Player;
