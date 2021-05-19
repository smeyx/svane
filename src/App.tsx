import React, { useEffect, useState } from 'react';
import { Scoreboard } from './components/Scoreboard/Scoreboard';

const App: React.FC = () => { 
  const [ gameDate, setGameDate ] = useState<Date>(new Date());

  const today: Date = new Date();
  const yesterday: Date = new Date();
  yesterday.setDate(today.getDate() - 1);
  

  return (
    <>
      <Scoreboard gameDate = { yesterday }/>
    </> 
  )
}

export default App;
