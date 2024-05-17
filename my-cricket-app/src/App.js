import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useState } from 'react';
const socket = io('http://localhost:5000'); // Replace with your server URL

function App() {
  const [player,setPlayer]=useState({})
 

  const getData = data=>setPlayer(data)
  useEffect(() => {
    // Socket.io event listeners go here


    socket.emit('getscore')
    socket.on("get_scoredata", getData);
    return () => {
      // Clean up the socket connection when the component unmounts
     // socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {/* Your React components */}
      <table border={1}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Score</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <th>{player.name}</th>
          <th>{player.country}</th>
          <th>{player.score}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;