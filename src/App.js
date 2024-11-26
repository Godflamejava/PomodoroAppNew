import React, { useState, useEffect } from "react";
import "./App.css";
import Countdown from "./components/Countdown";
import Button from "./components/Button";

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  let [time, setTime] = useState(1500);

 const handleTimerStateChange = ()=>{
    setIsRunning(!isRunning);
    setTime(1500);
  }


  return <div class="main-body"> 
    <Countdown seconds={time} isRunning={isRunning}/>
    <Button funtionToBeCalled={handleTimerStateChange} shouldChange={isRunning} changeNameTo={"Reset"}/>
  </div>;
};
export default App;
