import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './form.css';

const Form = (props) => {
  
  //Own Platform
  const [ownplatform, setOwnplatform] = useState([]);
  const [info, setInfo] = useState(0);
  const [btnStartInfo, setStartInfo] = useState(0);
  const [btnStopInfo, setStopInfo] = useState(0);
  const [statusData, setStatusData] = useState("Kosong");

  const [editFormStatus, setEditFormStatus] = useState("False");

  const [ownplatformData, setOwnData] = useState([]);
  const [ownplatformConfig, setConfig] = useState([]);
  const [id, setId] = useState(0);
  const [trackNumber, setTrackNumber] = useState(0);
  const [status, setStatus] = useState("-");
  const [lastSend, setLastSend] = useState("Not Send");
  const [trackMode, setTrackMode] = useState("");
  const [environment, setEnvironment] = useState("");
  const [humidity, setHumidity] = useState("");
  const [airTemperature, setAirTemperature] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [barometricPressure, setBarometricPressure] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [pitch, setPitch] = useState("");
  const [accelerationX, setAccelerationX] = useState("");
  const [velocityX, setVelocityX] = useState("");
  const [speed, setSpeed] = useState("");
  const [roll, setRoll] = useState("");
  const [accelerationY, setAccelerationY] = useState("");
  const [velocityY, setVelocityY] = useState("");
  const [heading, setHeading] = useState("");
  const [yaw, setYaw] = useState("");
  const [accelerationZ, setAccelerationZ] = useState("");
  const [velocityZ, setVeloityZ] = useState("");
  const [message, setMessage] = useState("");
  var selectedTmr = document.getElementById("tmr");
  var selectedEr = document.getElementById("er");


   

    //// REQUEST GET CONFIG OWNPLATFORM

    const getTrackMode = async () => {
      try{
      if(ownplatformConfig.trackMode == "Automathic"){
        document.getElementById("send").disabled = true;
      } else if (ownplatformConfig.trackMode == "Manual"){
        document.getElementById("btnstart").disabled = true;
        document.getElementById("btnstop").disabled = true;
      }
    } catch(e){
      console.log(e.message)
    }
    }


  
 

  



    //// REQUEST GET CONFIG OWNPLATFORM

    const getConfigOwnplatform = async () => {
      try{
        let response = await Axios.get('http://localhost:8080/ownplatform/config')
        setConfig(response.data)
        setStatusData("Ada")
      } catch(e){
        console.log(e.message)
      }
      // document.getElementById("tabelseting").style.display = "none";
    }
  
    // useEffect(() => {
    //   getConfigOwnplatform();
    // }, [])




    

        //// REQUEST GET DATA OWNPLATFORM

        const getDataOwnplatform = async () => {
          try{
            let response = await Axios.get('http://localhost:8080/ownplatform/data')
            setOwnData(response.data)
          } catch(e){
            console.log(e.message)
          }
        }
      
        // useEffect(() => {
        //   getDataOwnplatform();
        // }, [])




//// Save data OwnPlatform

  let handleSaveOnlyOwnPlatform = async (e) => {
    e.preventDefault();
    try {
      //Data
      let resData= await fetch("http://localhost:8080/ownplatform/savedata", {
        method: "POST",
        body: JSON.stringify({
          trackNumber: trackNumber,
          humidity: humidity,
          airTemperature: airTemperature,
          barometricPressure: barometricPressure,
          environment: selectedEr.value,
          windSpeed: windSpeed,
          windDirection: windDirection,
          latitude: latitude,
          longitude: longitude,
          altitude: altitude,
          pitch: pitch,
          accelerationX: accelerationX,
          velocityX: velocityX,
          accelerationY: accelerationY,
          velocityY: velocityY,
          heading: heading,
          yaw: yaw,
          accelerationZ: accelerationZ,
          velocityZ: velocityZ,
          speed: speed,
          roll: roll
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      //Config
      let resConfig= await fetch("http://localhost:8080/ownplatform/saveconfig", {
        method: "POST",
        body: JSON.stringify({
          trackNumber: trackNumber,
          trackMode: selectedTmr.value,
          startTime: startTime,
          endTime: endTime,
          status: status,
          lastSend: lastSend
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      //Disable form edit
      setEditFormStatus("False");


      if (resData.status === 201 || resData.status === 201 || resConfig.status === 201 || resConfig.status === 200) {
        setTrackMode("");
        setHumidity("");
        setAirTemperature("");
        setStartTime("");
        setEndTime("");
        setBarometricPressure("");
        setEnvironment("");
        setWindSpeed("");
        setWindDirection("");
        setLatitude("");
        setLongitude("");
        setAltitude("");
        setPitch("");
        setAccelerationX("");
        setVelocityX("");
        setSpeed("");
        setRoll("");
        setAccelerationY("");
        setVelocityY("");
        setHeading("");
        setYaw("");
        setAccelerationZ("");
        setVeloityZ("");
        setMessage("Track created successfully");
        
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  
  
  //// Save and Send data OwnPlatform
  
    let handleSaveAndSendPlatform = async (e) => {
      e.preventDefault();
      try {
        //Data
        let resData= await fetch("http://localhost:8080/ownplatform/savedata", {
          method: "POST",
          body: JSON.stringify({
            trackNumber: trackNumber,
            humidity: humidity,
            airTemperature: airTemperature,
            barometricPressure: barometricPressure,
            environment: selectedEr.value,
            windSpeed: windSpeed,
            windDirection: windDirection,
            latitude: latitude,
            longitude: longitude,
            altitude: altitude,
            pitch: pitch,
            accelerationX: accelerationX,
            velocityX: velocityX,
            accelerationY: accelerationY,
            velocityY: velocityY,
            heading: heading,
            yaw: yaw,
            accelerationZ: accelerationZ,
            velocityZ: velocityZ,
            speed: speed,
            roll: roll
            
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        //Config
        let resConfig= await fetch("http://localhost:8080/ownplatform/saveconfig", {
          method: "POST",
          body: JSON.stringify({
            trackNumber: trackNumber,
            trackMode: selectedTmr.value,
            startTime: startTime,
            endTime: endTime,
            status: status,
            lastSend: lastSend
            
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        let resSaveAndSend= await fetch("http://localhost:8080/ownplatform/saveandsend", {
          method: "POST",
          body: JSON.stringify({
            trackNumber: trackNumber,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

      //Disable form edit
      setEditFormStatus("False");
  
      } catch (err) {
        console.log(err);
      }
    };

  

  //// REQUEST Update OwnPlatform

  let handleUpdateOwnPlatform = async (e) => {
    e.preventDefault();
    try {

      setEditFormStatus("True");

      
      const $selectTrackMode = document.getElementById('tmr');
      $selectTrackMode.value = ownplatformConfig.trackMode;
      const $selectEnvironment = document.getElementById('er');
      $selectEnvironment.value = ownplatformData.environment;

      setId(ownplatformConfig.id)
      setHumidity(ownplatformData.humidity)
      setAirTemperature(ownplatformData.airTemperature)
      setStartTime(ownplatformConfig.startTime)
      setEndTime(ownplatformConfig.endTime)
      setBarometricPressure(ownplatformData.barometricPressure)
      setWindSpeed(ownplatformData.windSpeed)
      setWindDirection(ownplatformData.windDirection)
      setLatitude(ownplatformData.latitude)
      setLongitude(ownplatformData.longitude)
      setAltitude(ownplatformData.altitude)
      setPitch(ownplatformData.pitch)
      setAccelerationX(ownplatformData.accelerationX)
      setVelocityX(ownplatformData.velocityX)
      setSpeed(ownplatformData.speed)
      setRoll(ownplatformData.roll)
      setAccelerationY(ownplatformData.accelerationY)
      setVelocityY(ownplatformData.velocityY)
      setHeading(ownplatformData.heading)
      setYaw(ownplatformData.yaw)
      setAccelerationZ(ownplatformData.accelerationZ)
      setVeloityZ(ownplatformData.velocityZ)

    } catch (err) {
      console.log(err);
    }

   
  };

  //// Delete OwnPlatform
  let handleDeleteOwnPlatform = async (e) => {
    e.preventDefault();
    try {
      let res2 = await fetch(`http://localhost:9000/ownplatform/0`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      let resJson2 = await res2.json();
      if (res2.status === 201) {
        setMessage("Plot deleted successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };




  //// Send only OwnPlatform
  
  let handleSendOnlyPlatform = async (e) => {
    e.preventDefault();
    try {
      // Send Only

      let resSend= await fetch("http://localhost:8080/ownplatform/sendonly", {
        method: "POST",
        body: JSON.stringify({
          trackNumber: trackNumber,
          trackMode: selectedTmr.value,
          startTime: startTime,
          endTime: endTime,
          status: status,
          lastSend:lastSend,

        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        
      });

    } catch (err) {
      console.log(err);
    }
  };


    //// Send Start OwnPlatform
  
    let handleStartOwnPlatform = async (e) => {
      e.preventDefault();
      try {
        // Send Only
       
        let resStart= await fetch("http://localhost:8080/ownplatform/startstop", {
          method: "POST",
          body: JSON.stringify({
            status: "Start",
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          
        });
        
        setStartInfo(1);
    
      } catch (err) {
        console.log(err);
      }
    };

        //// Send Stop OwnPlatform
        let handleStopOwnPlatform = async (e) => {
          e.preventDefault();
          try {
            // Send Only
            let resStop= await fetch("http://localhost:8080/ownplatform/startstop", {
              method: "POST",
              body: JSON.stringify({
                status: "Stop",
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
              
            });

          } catch (err) {
            console.log(err);
          }
        };
  



  //// Delete OwnPlatform
  let handleDefaultOwnPlatform = async (e) => {
    e.preventDefault();
    try {

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    let interval = setInterval(() => {
      getTrackMode();
      getConfigOwnplatform();
      getDataOwnplatform();
    },1000)    
  }, [])





  return (
   
      <>
          <h2 className="title">Own Platform</h2>     
            <table className="table" >
              <tr>
                <td>Track Mode</td>  
                <td>: {ownplatformConfig.trackMode}</td>   
                <td>Pitch</td>
                <td>: {ownplatformData.pitch} deg</td>  
                <td>Acceleration X</td>
                <td>: {ownplatformData.accelerationX} m/s </td> 
                <td>Barometric Pressure</td>
                <td>: {ownplatformData.barometricPressure} Pascal</td>
              </tr>

              <tr >
                <td>Environment</td>
                <td>: {ownplatformData.environment}</td> 
                <td>Roll</td>
                <td>: {ownplatformData.roll} deg</td>
                <td>Acceleration Y</td>
                <td>: {ownplatformData.accelerationY} m/s</td>
                <td>Air Temperature</td>
                <td>: {ownplatformData.airTemperature} celcius</td>  
              </tr>        

              <tr>
                <td>Start Time</td>
                <td>: {ownplatformConfig.startTime}</td> 
                <td>Yaw</td>
                <td>: {ownplatformData.yaw} deg </td>
                <td>Acceleration Z</td>
                <td>: {ownplatformData.accelerationZ} m/s </td>
                <td>Humidity</td>
                <td>: {ownplatformData.humidity} %</td>
              </tr>

              <tr>
                <td>End Time</td>
                <td>: {ownplatformConfig.endTime} </td>
                <td>Latitude</td>
                <td>: {ownplatformData.latitude} feet</td>
                <td>Velocity X</td>
                <td>: {ownplatformData.velocityX} m/s</td>
                <td>Wind Speed</td>
                <td>: {ownplatformData.windSpeed} m/s</td>
              </tr>

              <tr>
                <td>Speed</td>
                <td>: {ownplatformData.speed} knot</td> 
                <td>Longitude</td>
                <td>: {ownplatformData.longitude} </td>
                <td>Velocity Y</td>
                <td>: {ownplatformData.velocityY} m/s</td>
                <td>Wind Direction</td>
                <td>: {ownplatformData.windDirection} deg</td>
              </tr>
    
              <tr>
                <td>Heading</td>
                <td>: {ownplatformData.heading} deg</td>
                <td>Altitude</td>
                <td>: {ownplatformData.altitude}</td>
                <td>Velocity Z</td>
                <td>: {ownplatformData.velocityZ} m/s </td>
                <td>Track Number</td>
                <td>: {ownplatformConfig.trackNumber}</td>
              </tr>           
            </table>

                <button type="submit" className="btn" onClick={handleUpdateOwnPlatform} disabled={((ownplatformConfig.trackNumber !== 0) || (ownplatformConfig.status === "Start")? true: false)}>EDIT</button>
                <button type="delete" className="btn" onClick={handleDeleteOwnPlatform} disabled={((ownplatformConfig.trackNumber !== 0)|| (ownplatformConfig.status === "Start")? true: false)}>DELETE</button>
                <button type="submit" className="btn" id="send" onClick={handleSendOnlyPlatform} disabled={((ownplatformConfig.trackMode === "Automatic") || (ownplatformConfig.trackNumber !== 0)? true: false)}>SEND</button>
                <button type="delete" className="btn" id="btnstart" onClick={handleStartOwnPlatform} disabled={((ownplatformConfig.trackMode === "Manual") || (ownplatformConfig.status === "Start") || (ownplatformConfig.trackNumber !== 0)? true: false)}>START</button>
                <button type="delete" className="btn" id="btnstop" onClick={handleStopOwnPlatform} disabled={((ownplatformConfig.trackMode === "Manual")|| (ownplatformConfig.status !== "Start") || (ownplatformConfig.trackNumber !== 0)? true: false)}>STOP</button>
                <hr></hr>
                {/* <label className="info"> Status : {ownplatformConfig.status}</label>
                <label className="info"> Last Send : {ownplatformConfig.lastSend}</label>
                <label className="info"> Status Data : {ownplatformConfig.trackNumber}</label>
                <label className="info"> Edit Form Statys : {editFormStatus}</label> */}
          <hr/>

          <div id="tabelseting">
          <h2 className="title">Data Setting</h2>
          <form className="formdatasetting">
            <table className="table" id="cobatabel">

              <tr>
                <td>Track Mode</td>
                <td>
                  <select 
                  name="track-mode-radio" id="tmr" onChange={(e) => setTrackMode(e.target.value)} disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                    <option value="land">-- Pilih --</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </td>
                <td>Environment</td>
                <td>             
                  <select name="environment-radio" id="er"  onChange={(e) => setEnvironment(e.target.value)} disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                    <option value="land">-- Pilih --</option>
                    <option value="air">Air</option>
                    <option value="surface">Surface</option>
                    <option value="subsurface">Subsurface</option>
                    <option value="land">land</option>
                  </select>
                </td>
                <td><label >Start Time</label></td>
                <td>
                  <input 
                  type="datetime-local" 
                  id="start-time-input" 
                  name="input-start" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>
                <td><label >End Time</label></td>
                <td>
                  <input 
                  type="datetime-local" 
                  id="end-time-input" 
                  name="input-end" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>     
              </tr>


              <tr>
                <td><label>Latitude</label></td>
                <td>
                  <input 
                  type="number" 
                  id="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>
                <td><label >Longitude</label></td>
                <td>
                  <input 
                  type="number" 
                  id="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                </input>
                </td>
                <td><label>Altitude</label></td>
                <td>
                  <input 
                  type="number" 
                  id="altitude"
                  name="altitude"
                  placeholder="Altitude"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                </input>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td><label>Speed</label></td>
                <td>
                  <input 
                  type="number" 
                  id="speed"
                  name="speed"
                  placeholder="Speed"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>
                <td><label>Heading</label></td>
                <td>
                  <input 
                  type="number" 
                  id="heading"
                  name="heading"
                  placeholder="Heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>
                <td><label >Wind Speed</label></td>
                <td>
                  <input 
                  type="number"
                  id="wind-speed" 
                  name="wind-speed"
                  placeholder="Wind Speed"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Wind Direction</label></td>
                <td>
                  <input 
                  type="number" 
                  id="wind-direction" 
                  name="wind-direction"
                  placeholder="Wind Direction"
                  value={windDirection}
                  onChange={(e) => setWindDirection(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
              </tr>

              <tr>
                <td><label >Pitch</label></td>
                <td>
                  <input 
                  type="number" 
                  id="pitch" 
                  name="pitch"
                  placeholder="Pitch"
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Acceleration X</label></td>
                <td>
                  <input 
                  type="number" 
                  id="acceleration-x"
                  name="acceleration-x"
                  placeholder="Acceleration X"
                  value={accelerationX}
                  onChange={(e) => setAccelerationX(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Velocity X</label></td>
                <td>
                  <input 
                  type="number" 
                  id="velocity-x"
                  name="velocity-x"
                  placeholder="Velocity X"
                  value={velocityX}
                  onChange={(e) => setVelocityX(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Barometric Pressure</label></td>
                <td>
                  <input 
                  type="number" 
                  id="barometric-pressure"
                  name="barometric-pressure"
                  placeholder="Barometric Pressure"
                  value={barometricPressure}
                  onChange={(e) => setBarometricPressure(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                </input>
                </td>
              </tr>


              <tr>
                <td><label >Roll</label></td>
                <td>
                  <input 
                  type="number" 
                  id="roll"
                  name="roll"
                  placeholder="Roll"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Acceleration Y</label></td>
                <td>
                  <input 
                  type="number" 
                  id="acceleration-y"
                  name="acceleration-y"
                  placeholder="Acceleration Y"
                  value={accelerationY}
                  onChange={(e) => setAccelerationY(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Velocity Y</label></td>
                <td>
                  <input 
                  type="number" 
                  id="velocity-y"
                  name="velocity-y"
                  placeholder="Velocity Y"
                  value={velocityY}
                  onChange={(e) => setVelocityY(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Humidity</label></td>
                <td>
                  <input 
                  type="number" 
                  id="humidity"
                  name="humidity" 
                  placeholder="Humidity" 
                  value={humidity} 
                  onChange={(e) => setHumidity(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input>
                </td>   
              </tr>

              <tr>
                <td><label >Yaw</label></td>
                <td>
                  <input 
                  type="number" 
                  id="yaw"
                  name="yaw"
                  placeholder="Yaw"
                  value={yaw}
                  onChange={(e) => setYaw(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Acceleration Z</label></td>
                <td>
                  <input 
                  type="number" 
                  id="acceleration-z"
                  name="acceleration-z"
                  placeholder="Acceleration Z"
                  value={accelerationZ}
                  onChange={(e) => setAccelerationZ(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Velocity Z</label></td>
                <td>
                  <input 
                  type="number" 
                  id="velocity-z"
                  name="velocity-z"
                  placeholder="Velocity Z"
                  value={velocityZ}
                  onChange={(e) => setVeloityZ(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}> 
                  </input>
                </td>
                <td><label >Air Temperature</label></td>
                <td>
                  <input 
                  type="number"
                  id="air-temperature" 
                  name="air-temperature" 
                  placeholder="Air Temperature" 
                  value={airTemperature} 
                  onChange={(e) => setAirTemperature(e.target.value)}
                  disabled={((editFormStatus === "False") && (ownplatformConfig.status === "-")? true: false)}>
                  </input> 
                </td>
              </tr>        
            </table>
              <button type="submit" className="btn" onClick={handleDefaultOwnPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) ? true: false)}>GET DEFAULT</button>
              <button type="submit" className="btn" onClick={handleSaveOnlyOwnPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) ? true: false)}>SAVE ONLY</button>
              <button type="submit" className="btn" onClick={handleSaveAndSendPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) || (trackMode === "Automatic") ? true: false)}>SAVE & SEND</button>
              {/* <button type="submit" className="btn" onClick={handleCancelOwnPlatform}>CANCEL</button> */}
              {/* <button type="submit" className="btn" onClick={() => window.location.reload()} >TAMBAH</button> */}
          </form>
          </div>
          </>
  );
}

export default Form; 