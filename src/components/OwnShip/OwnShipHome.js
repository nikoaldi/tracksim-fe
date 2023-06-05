import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './OwnShipHome.css';

const OwnShipHome = (props) => {
  
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
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");
  const [barometricPressure, setBarometricPressure] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [pitch, setPitch] = useState("");
  const [accelerationX, setAccelerationX] = useState("");
  const [velocityX, setVelocityX] = useState("");
  const [roll, setRoll] = useState("");
  const [accelerationY, setAccelerationY] = useState("");
  const [velocityY, setVelocityY] = useState("");
  const [heading, setHeading] = useState("");
  const [yaw, setYaw] = useState("");
  const [accelerationZ, setAccelerationZ] = useState("");
  const [velocityZ, setVelocityZ] = useState("");
  var selectedTmr = document.getElementById("tmr");
  var selectedEr = document.getElementById("er");

  const [RadarData, setRadarData] = useState([]);
  const [RadarDataClone, setRadarDataClone] = useState([]);
  const [RadarUpdate, setRadarUpdate] = useState([]);
  const [statusRadio, setStatusRadio] = useState(1);
  const [time, setTime] = useState("Time");

  const [course, setCourse] = useState();
  const [speed, setSpeed] = useState();
  const [courseRangeMin, setCourseRangeMin] = useState();
  const [courseRangeMax, setCourseRangeMax] = useState();
  const [courseIncrement, setCourseIncrement] = useState();

  const [bearing, setBearing] = useState(null);
  const [mode1code, setMode1Code] = useState(null);
  const [mode2code, setMode2Code] = useState(null);
  const [trackInput, setTrackInput] = useState("");

  const [speedRangeMin, setSpeedRangeMin] = useState(null);
  const [speedRangeMax, setSpeedRangeMax] = useState(null);
  const [speedIncrement, setSpeedIncrement] = useState(null);

  const [distance, setDistance] = useState(null);
  const [mode3code, setMode3Code] = useState(null);
  const [mode4code, setMode4Code] = useState(null);
  const [count, setCount] = useState(null);

  const [altitudeRangeMin, setAltitudeRangeMin] = useState(null);
  const [altitudeRangeMax, setAltitudeRangeMax] = useState(null);
  const [altitudeIncrement, setAltitudeIncrement] = useState(null);

  const [mode5code, setMode5Code] = useState(null);
  const checkIdSend=[];
  const checkIdDelete=[];
  const checkIdStop=[];
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState("");


    //// REQUEST GET DATA OWNPLATFORM

    const getDataOwnShip = async () => {
            try{
              let response = await Axios.get('http://localhost:8080/ownship')
              if(response.data.length > 0){
                setOwnplatform(response.data[0])
              } 
              
            } catch(e){
              console.log(e.message)
            }
          }
        
    useEffect(() => {
        getDataOwnShip();
    }, [])


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




//// Save data OwnPlatform --

  let handleSaveOnlyOwnPlatform = async (e) => {
    e.preventDefault();
    try {
      //Data
      let resData= await fetch("http://localhost:8080/ownship", {
        method: "POST",
        body: JSON.stringify({
            trackNumber: trackNumber,
            trackMode:trackMode,
            environment:environment,
            startTime:startTime,
            status:"saved",
            endTime:endTime,
            time:"time",
            latitude: latitude,
            longitude: longitude,

            course:course,
            courseRangeMin:courseRangeMin,
            courseRangeMax:courseRangeMax,
            courseIncrement:courseIncrement,
            heading:heading,
            humidity:humidity,
            windSpeed:windSpeed,
            windDirection:windDirection,

            speed:speed,
            speedRangeMin:speedRangeMin,
            speedRangeMax:speedRangeMax,
            speedIncrement:speedIncrement,
            pitch:pitch,
            roll:roll,
            yaw:yaw,
            airTemperature:airTemperature,

            altitude:altitude,
            altitudeRangeMin:altitudeRangeMin,
            altitudeRangeMax:altitudeRangeMax,
            altitudeIncrement:altitudeIncrement,
            accelerationX:accelerationX,
            accelerationY:accelerationY,
            accelerationZ:accelerationZ,
            barometricPressure:barometricPressure,

            velocityX:velocityX,
            velocityY:velocityY,
            velocityZ:velocityZ
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });



      //Disable form edit
      setEditFormStatus("False");


      if (resData.status === 201) {
        setTrackMode("");
        setEnvironment("");
        setStartTime("-");
        setEndTime("-");
        setLastSend("")
        setLatitude("");
        setLongitude("");
        setCourse("");
        setCourseRangeMin("");
        setCourseRangeMax("");
        setCourseIncrement("");
        setSpeed("");
        setSpeedRangeMin("");
        setSpeedRangeMax("");
        setSpeedIncrement("");
        setAltitude("");
        setAltitudeRangeMin("");
        setAltitudeRangeMax("");
        setAltitudeIncrement("");
        setAirTemperature("");
        setHumidity("");
        setWindSpeed("");
        setWindDirection("");
        setHeading("");
        setPitch("");
        setYaw("");
        setRoll("");
        setAccelerationX("");
        setAccelerationY("");
        setAccelerationZ("");
        setBarometricPressure("");
        setVelocityX("");
        setVelocityY("");
        setVelocityZ("");
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
      $selectTrackMode.value = ownplatform.trackMode;
      const $selectEnvironment = document.getElementById('er');
      $selectEnvironment.value = ownplatform.environment;
      setEnvironment(ownplatform.environment)
      setTrackMode(ownplatform.trackMode)
      setStartTime(ownplatform.startTime)
      setEndTime(ownplatform.endTime)
      setCourse(ownplatform.course)
      setSpeed(ownplatform.speed)
      setAltitude(ownplatform.altitude)
      setCourseRangeMin(ownplatform.courseRangeMin)
      setCourseRangeMax(ownplatform.courseRangeMax)
      setCourseIncrement(ownplatform.courseIncrement)
      setSpeedRangeMin(ownplatform.speedRangeMin)
      setSpeedRangeMax(ownplatform.speedRangeMax)
      setSpeedIncrement(ownplatform.speedIncrement)
      setAltitudeRangeMin(ownplatform.altitudeRangeMin)
      setAltitudeRangeMax(ownplatform.altitudeRangeMax)
      setAltitudeIncrement(ownplatform.altitudeIncrement)
      setLatitude(ownplatform.latitude)
      setLongitude(ownplatform.longitude)
      setAirTemperature(ownplatform.airTemperature)
      setHumidity(ownplatform.humidity)
      setWindSpeed(ownplatform.windSpeed)
      setWindDirection(ownplatform.windDirection)
      setHeading(ownplatform.heading)
      setPitch(ownplatform.pitch)
      setYaw(ownplatform.yaw)
      setRoll(ownplatform.roll)
      setAccelerationX(ownplatform.accelerationX)
      setAccelerationY(ownplatform.accelerationY)
      setAccelerationZ(ownplatform.accelerationZ)
      setBarometricPressure(ownplatform.barometricPressure)
      setVelocityX(ownplatform.velocityX)
      setVelocityY(ownplatform.velocityY)
      setVelocityZ(ownplatform.velocityZ)
      disableFormInput(ownplatform.trackMode)
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




  //// Send only OwnPlatform TRACK --
  
  let handleSendOnlyPlatform = async (e) => {
    e.preventDefault();
    try {
      let resSend= await fetch("http://localhost:8080/ownship/sendtrack", {
        method: "POST",
        body: JSON.stringify({
          trackNumber: trackNumber,
          status: status
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
      getConfigOwnplatform();
      getDataOwnplatform();
    },1000)    
  }, [])

    //Handler Track Mode Form --
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "false"
        disableFormInput(Tmode, status)
    }

    //Fungsi disable input form --
    const disableAllInput = () => {
        document.getElementById("er").disabled = true;
        document.getElementById("start-time-input").disabled = true;
        document.getElementById("end-time-input").disabled = true;
        document.getElementById("course").disabled = true;
        document.getElementById("speed").disabled = true;
        document.getElementById("altitude").disabled = true;
        document.getElementById("course-range-min").disabled = true;
        document.getElementById("course-range-max").disabled = true;
        document.getElementById("speed-range-max").disabled = true;
        document.getElementById("speed-range-min").disabled = true;
        document.getElementById("altitude-range-max").disabled = true;
        document.getElementById("altitude-range-min").disabled = true;
        document.getElementById("course-increment").disabled = true;
        document.getElementById("speed-increment").disabled = true;
        document.getElementById("altitude-increment").disabled = true;
        document.getElementById("latitude").disabled = true;
        document.getElementById("longitude").disabled = true;
        document.getElementById("airTemperature").disabled = true;
        document.getElementById("humidity").disabled = true;
        document.getElementById("windSpeed").disabled = true;
        document.getElementById("windDirection").disabled = true;
        document.getElementById("heading").disabled = true;
        document.getElementById("pitch").disabled = true;
        document.getElementById("roll").disabled = true;
        document.getElementById("yaw").disabled = true;
        document.getElementById("accelerationX").disabled = true;
        document.getElementById("accelerationY").disabled = true;
        document.getElementById("accelerationZ").disabled = true;
        document.getElementById("barometricPressure").disabled = true;
        document.getElementById("velocityX").disabled = true;
        document.getElementById("velocityY").disabled = true;
        document.getElementById("velocityZ").disabled = true;
    }

    const disableFormInput=(Tmode, status)=>{ 
        if (Tmode === "manual"){
            disableAllInput();
            document.getElementById("er").disabled = false;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("airTemperature").disabled = false;
            document.getElementById("humidity").disabled = false;
            document.getElementById("windSpeed").disabled = false;
            document.getElementById("windDirection").disabled = false;
            document.getElementById("heading").disabled = false;
            document.getElementById("pitch").disabled = false;
            document.getElementById("roll").disabled = false;
            document.getElementById("yaw").disabled = false;
            document.getElementById("accelerationX").disabled = false;
            document.getElementById("accelerationY").disabled = false;
            document.getElementById("accelerationZ").disabled = false;
            document.getElementById("barometricPressure").disabled = false;
            document.getElementById("velocityX").disabled = false;
            document.getElementById("velocityY").disabled = false;
            document.getElementById("velocityZ").disabled = false;    
            setStartTime("-")
            setEndTime("-")   
            setCourseRangeMin("")
            setCourseRangeMax("") 
            setCourseIncrement("")
            setSpeedRangeMin("")
            setSpeedRangeMax("") 
            setSpeedIncrement("") 
            setAltitudeRangeMin("")
            setAltitudeRangeMax("") 
            setAltitudeIncrement("")   
        } else if (Tmode === "automatic") {
            disableAllInput();
            document.getElementById("er").disabled = false;
            document.getElementById("start-time-input").disabled = false;
            document.getElementById("end-time-input").disabled = false;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("course-range-min").disabled = false;
            document.getElementById("course-range-max").disabled = false;
            document.getElementById("speed-range-max").disabled = false;
            document.getElementById("speed-range-min").disabled = false;
            document.getElementById("altitude-range-max").disabled = false;
            document.getElementById("altitude-range-min").disabled = false;
            document.getElementById("course-increment").disabled = false;
            document.getElementById("speed-increment").disabled = false;
            document.getElementById("altitude-increment").disabled = false;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("airTemperature").disabled = false;
            document.getElementById("humidity").disabled = false;
            document.getElementById("windSpeed").disabled = false;
            document.getElementById("windDirection").disabled = false;
            document.getElementById("heading").disabled = false;
            document.getElementById("pitch").disabled = false;
            document.getElementById("roll").disabled = false;
            document.getElementById("yaw").disabled = false;
            document.getElementById("accelerationX").disabled = false;
            document.getElementById("accelerationY").disabled = false;
            document.getElementById("accelerationZ").disabled = false;
            document.getElementById("barometricPressure").disabled = false;
            document.getElementById("velocityX").disabled = false;
            document.getElementById("velocityY").disabled = false;
            document.getElementById("velocityZ").disabled = false;  
        } else {
           
        }
    }

//Handler Cancel -- 
const handlerCancel=(event)=>{
  const $selectTrackMode = document.getElementById('tmr');
  $selectTrackMode.value = "-";
  setTrackMode("")
  const $selectEnvironment = document.getElementById('er');
  $selectEnvironment.value = "-";
  setEnvironment("")
  setEditFormStatus("False")
  setTrackMode("")
  setStartTime("-")
  setEndTime("-")
  setCourse("")
  setSpeed("")
  setAltitude("")
  setCourseRangeMin("")
  setCourseRangeMax("")
  setCourseIncrement("")
  setSpeedRangeMin("")
  setSpeedRangeMax("")
  setSpeedIncrement("")
  setAltitudeRangeMin("")
  setAltitudeRangeMax("")
  setAltitudeIncrement("")
  setLongitude("")
  setLatitude("")
  setAirTemperature("")
  setHumidity("")
  setWindSpeed("")
  setWindDirection("")
  setHeading("")
  setPitch("")
  setRoll("")
  setYaw("")
  setAccelerationX("")
  setAccelerationY("")
  setAccelerationZ("")
  setVelocityX("")
  setVelocityY("")
  setVelocityZ("")
  setBarometricPressure("")
  disableAllInput();

}


  return (
   
      <>
        <div className="tabel-info">
          <label className="label">DATA SETTING</label>   
            <table className="table" >
                <tr>
                    <td>Track Mode</td>  
                    <td>: {ownplatform.trackMode}</td>  
                    <td>Course</td>  
                    <td>: {ownplatform.course} deg</td> 
                    <td>Speed</td>  
                    <td>: {ownplatform.speed} knot</td>   
                    <td>Altitude</td>  
                    <td>: {ownplatform.altitude} feet</td>
                    <td>Heading</td>
                    <td>: {ownplatform.heading} deg</td> 
                </tr>

                <tr >
                    <td>Environment</td>
                    <td>: {ownplatform.environment}</td>
                    <td>Course Range Min</td>  
                    <td>: {ownplatform.courseRangeMin} deg</td> 
                    <td>Speed Range Min</td>  
                    <td>: {ownplatform.speedRangeMin} knot</td> 
                    <td>Altitude Range Min</td>  
                    <td>: {ownplatform.altitudeRangeMin} feet</td> 
                    <td>Humidity</td>
                    <td>: {ownplatform.humidity} %</td> 
                </tr>        

                <tr>
                    <td>Start Time</td>
                    <td>: {ownplatform.startTime}</td>
                    <td>Course Range Max</td>  
                    <td>: {ownplatform.courseRangeMax} deg</td>  
                    <td>Speed Range Max</td>  
                    <td>: {ownplatform.speedRangeMax} knot</td> 
                    <td>Altitude Range Max</td>  
                    <td>: {ownplatform.altitudeRangeMax} feet</td> 
                    <td>Wind Speed</td>
                    <td>: {ownplatform.windSpeed} m/s</td>
                </tr>

                <tr>
                    <td>End Time</td>
                    <td>: {ownplatform.endTime} </td>
                    <td>Course Increment</td>
                    <td>: {ownplatform.courseIncrement} </td>
                    <td>Speed Increment</td>
                    <td>: {ownplatform.speedIncrement} </td>
                    <td>Altitude Increment</td>
                    <td>: {ownplatform.altitudeIncrement} </td>
                    <td>Wind Direction</td>
                    <td>: {ownplatform.windDirection} deg</td>      
                </tr>

                <tr>
                    <td>Last Update</td>
                    <td>: {ownplatform.lastSend} </td>
                    <td>Pitch</td>
                    <td>: {ownplatform.pitch} deg</td>
                    <td>Acceleration X</td>
                    <td>: {ownplatform.accelerationX} m/s</td>
                    <td>Velocity X</td>
                    <td>: {ownplatform.velocityX} m/s</td>  
                    <td>Air Temperature</td>
                    <td>: {ownplatform.airTemperature} celcius</td>   
                </tr>
    
                <tr>
                    <td>Latitude</td>
                    <td>: {ownplatform.latitude}</td>
                    <td>Roll</td>
                    <td>: {ownplatform.roll} deg </td>
                    <td>Acceleration Y</td>
                    <td>: {ownplatform.accelerationY} m/s</td>
                    <td>Velocity Y</td>
                    <td>: {ownplatform.velocityY} m/s</td>  
                    <td>Barometric Pressure</td>
                    <td>: {ownplatform.barometricPressure} pascal </td>  
                </tr>  

                <tr>
                    <td>Longitude</td>
                    <td>: {ownplatform.longitude}</td>
                    <td>Yaw</td>
                    <td>: {ownplatform.yaw} deg</td>
                    <td>Acceleration Z</td>
                    <td>: {ownplatform.accelerationZ} m/s</td>
                    <td>Velocity Z</td>
                    <td>: {ownplatform.velocityZ} m/s</td>  
                    <td>Track Number</td>
                    <td>: {ownplatform.trackNumber}</td>
                </tr>          
            </table>

                <button type="submit" className="btn" onClick={handleUpdateOwnPlatform} disabled={((ownplatform.id !== 1) || (ownplatform.status === "Start")? true: false)}>EDIT</button>
                {/* <button type="delete" className="btn" onClick={handleDeleteOwnPlatform} disabled={((ownplatform.id !== 1)|| (ownplatform.status === "Start")? true: false)}>DELETE</button> */}
                <button type="submit" className="btn" id="send" onClick={handleSendOnlyPlatform} disabled={((ownplatform.trackMode === "automatic") || (ownplatform.id !== 1)? true: false)}>SEND</button>
                <button type="delete" className="btn" id="btnstart" onClick={handleStartOwnPlatform} disabled={((ownplatform.trackMode === "manual") || (ownplatform.status === "Start") || (ownplatform.id !== 1)? true: false)}>START</button>
                <button type="delete" className="btn" id="btnstop" onClick={handleStopOwnPlatform} disabled={((ownplatform.trackMode === "manual")|| (ownplatform.status !== "Start") || (ownplatform.id !== 1)? true: false)}>STOP</button>
                <hr></hr>
                <label className="info"> Status : {ownplatform.status}</label>
                <label className="info"> Last Send : {ownplatform.lastSend}</label>
                <label className="info"> Status Data : {ownplatform.trackNumber}</label>
                <label className="info"> Edit Form Status : {editFormStatus}</label>
            <hr/>
        </div>

        <h5>id:{id}, radio:{statusRadio}, status:{edit}, tmode:{trackMode}</h5>
        <div className="container-list">
            <label className="label">DATA SETTING</label>
            <div className="track-list-1">
                <div className="data-setting">
                    <table className="table-input">
                            <tr>
                                <td>Track Mode</td>
                                <td>             
                                    <select  name="track-mode-radio" class="form-input" id="tmr"  onChange={handleTrackMode}> 
                                        <option value="-">-- Pilih --</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
                                    </select>
                                </td>
                                <td>Environment</td>
                                <td>
                                    <select name="environment-radio" class="form-input" id="er" onChange={(e) => setEnvironment(e.target.value)} disabled>
                                        <option value="-">-- Pilih --</option>
                                        <option value="1">Air</option>
                                        <option value="2">Surface</option>
                                        <option value="3">Subsurface</option>
                                        <option value="4">land</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>Start Time</td>
                                <td>
                                    <input 
                                    type="datetime-local" 
                                    id="start-time-input" 
                                    name="input-start"
                                    class="form-input"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    disabled>
                                    </input>
                                </td>
                                <td>End Time</td>
                                <td>
                                    <input 
                                    type="datetime-local" 
                                    id="end-time-input" 
                                    name="input-end"
                                    class="form-input"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    disabled>
                                    </input>
                                </td>  
                                
                            </tr>

                            <tr>
                                <td>Course</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="course"
                                    name="course"
                                    placeholder="Course"
                                    class="form-input"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    disabled>
                                    </input> deg
                                </td>
                                <td>Speed</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="speed"
                                    name="speed"
                                    placeholder="Speed"
                                    class="form-input"
                                    value={speed}
                                    onChange={(e) => setSpeed(e.target.value)}
                                    disabled>
                                    </input> knot
                                </td>
                                <td>Altitude</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="altitude"
                                    name="altitude"
                                    placeholder="Altitude"
                                    class="form-input"
                                    value={altitude}
                                    onChange={(e) => setAltitude(e.target.value)}
                                    disabled>
                                    </input> feet
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Course Variation</td>
                                <td></td>
                                <td>Speed Variation</td>
                                <td></td>
                                <td>Altitude  Variation</td>
                                <td></td>
                                <td></td>
                            </tr>
                
                            <tr>
                                <td>Course Range</td>
                                <td >
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="course-range-min" 
                                    name="course-range-min" 
                                    placeholder="Min"
                                    class="form-input-increment"
                                    value={courseRangeMin}
                                    onChange={(e) => setCourseRangeMin(e.target.value)} 
                                    disabled>
                                    </input>
                                    &nbsp;
                                    To
                                    &nbsp;
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="course-range-max" 
                                    name="course-range-max" 
                                    placeholder="Max"
                                    class="form-input-increment"
                                    value={courseRangeMax}
                                    onChange={(e) => setCourseRangeMax(e.target.value)}
                                    disabled>
                                    </input> deg
                                </td> 
                                <td>Speed Range</td>
                                <td>
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="speed-range-min" 
                                    name="speed-range-min" 
                                    placeholder="Min"
                                    class="form-input-increment"
                                    value={speedRangeMin}
                                    onChange={(e) => setSpeedRangeMin(e.target.value)} 
                                    disabled>
                                    </input>
                                    &nbsp;
                                    To
                                    &nbsp;
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="speed-range-max" 
                                    name="speed-range-max" 
                                    placeholder="Max"
                                    class="form-input-increment"
                                    value={speedRangeMax}
                                    onChange={(e) => setSpeedRangeMax(e.target.value)}
                                    disabled>
                                    </input> knot
                                </td>  
                                <td>Altitude Range</td>
                                <td>
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="altitude-range-min" 
                                    name="altitude-range-min" 
                                    placeholder="Min"
                                    class="form-input-increment"
                                    value={altitudeRangeMin}
                                    onChange={(e) => setAltitudeRangeMin(e.target.value)} 
                                    disabled>
                                    </input>
                                    &nbsp;
                                    To
                                    &nbsp;
                                    <input 
                                    type="number" 
                                    className="input-range"
                                    id="altitude-range-max" 
                                    name="altitude-range-max"
                                    placeholder="Max" 
                                    class="form-input-increment"
                                    value={altitudeRangeMax}
                                    onChange={(e) => setAltitudeRangeMax(e.target.value)}
                                    disabled >
                                    </input> feet
                                </td>  
                                <td></td>
                            </tr>   

                            <tr>
                                <td>Course Increment</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="course-increment"
                                    name="course-increment"
                                    placeholder="Course Increment"
                                    class="form-input"
                                    value={courseIncrement}
                                    onChange={(e) => setCourseIncrement(e.target.value)}
                                    disabled >
                                    </input> deg
                                </td>
                                <td>Speed Increment</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="speed-increment"
                                    name="speed-increment"
                                    placeholder="Speed Increment"
                                    class="form-input"
                                    value={speedIncrement}
                                    onChange={(e) => setSpeedIncrement(e.target.value)} 
                                    disabled>
                                    </input> knot
                                </td>
                                <td>Altitude Increment</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="altitude-increment"
                                    name="altitude-increment"
                                    placeholder="Altitude Increment"
                                    class="form-input"
                                    value={altitudeIncrement}
                                    onChange={(e) => setAltitudeIncrement(e.target.value)} 
                                    disabled>
                                    </input> feet
                                </td>
                                <td></td>
                            </tr>

                            <tr className="radio-box-top">
                                <td>Latitude</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="latitude"
                                    name="latitude"
                                    placeholder="Latitude"
                                    class="form-input"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Longitude</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="longitude"
                                    name="longitude"
                                    placeholder="Longitude"
                                    class="form-input"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}  disabled> 
                                    </input>
                                </td>
                                <td></td>
                                <td>    
                                </td>
                                <td></td>
                            </tr>

      

               

                            <tr>
                                <td>Air Temperature</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="airTemperature"
                                    name="airTemperature"
                                    placeholder="Air Temperature"
                                    class="form-input"
                                    value={airTemperature}
                                    onChange={(e) => setAirTemperature(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Heading</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="heading"
                                    name="heading"
                                    placeholder="Heading"
                                    class="form-input"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Acceleration X</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="accelerationX"
                                    name="accelerationX"
                                    placeholder="Acceleration X"
                                    class="form-input"
                                    value={accelerationX}
                                    onChange={(e) => setAccelerationX(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Velocity X</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="velocityX"
                                    name="velocityX"
                                    placeholder="Velocity X"
                                    class="form-input"
                                    value={velocityX}
                                    onChange={(e) => setVelocityX(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td></td>                      
                            </tr>

                            <tr>
                                <td>Humidity</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="humidity"
                                    name="humidity"
                                    placeholder="Humidity"
                                    class="form-input"
                                    value={humidity}
                                    onChange={(e) => setHumidity(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Pitch</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="pitch"
                                    name="pitch"
                                    placeholder="Pitch"
                                    class="form-input"
                                    value={pitch}
                                    onChange={(e) => setPitch(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Acceleration Y</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="accelerationY"
                                    name="accelerationY"
                                    placeholder="Acceleration Y"
                                    class="form-input"
                                    value={accelerationY}
                                    onChange={(e) => setAccelerationY(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Velocity Y</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="velocityY"
                                    name="velocityY"
                                    placeholder="Velocity Y"
                                    class="form-input"
                                    value={velocityY}
                                    onChange={(e) => setVelocityY(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td colSpan={3}></td>
                            </tr>

                            <tr>
                                <td>Wind Speed</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="windSpeed"
                                    name="windSpeed"
                                    placeholder="Wind Speed"
                                    class="form-input"
                                    value={windSpeed}
                                    onChange={(e) => setWindSpeed(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Roll</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="roll"
                                    name="roll"
                                    placeholder="Roll"
                                    class="form-input"
                                    value={roll}
                                    onChange={(e) => setRoll(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Acceleration Z</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="accelerationZ"
                                    name="accelerationZ"
                                    placeholder="Acceleration Z"
                                    class="form-input"
                                    value={accelerationZ}
                                    onChange={(e) => setAccelerationZ(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Velocity Z</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="velocityZ"
                                    name="velocityZ"
                                    placeholder="Velocity Z"
                                    class="form-input"
                                    value={velocityZ}
                                    onChange={(e) => setVelocityZ(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Wind Direction</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="windDirection"
                                    name="windDirection"
                                    placeholder="Wind Direction"
                                    class="form-input"
                                    value={windDirection}
                                    onChange={(e) => setWindDirection(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Yaw</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="yaw"
                                    name="yaw"
                                    placeholder="Yaw"
                                    class="form-input"
                                    value={yaw}
                                    onChange={(e) => setYaw(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Barometric Pressure</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="barometricPressure"
                                    name="barometricPressure"
                                    placeholder="Barometric Pressure"
                                    class="form-input"
                                    value={barometricPressure}
                                    onChange={(e) => setBarometricPressure(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
            
                        </table>
                </div>
            </div>
                         

                
            
        </div>
            
                <button type="submit" className="btn" onClick={handleDefaultOwnPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) ? true: false)}>GET DEFAULT</button>
                <button type="submit" className="btn" onClick={handleSaveOnlyOwnPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) ? true: false)}>SAVE ONLY</button>
                <button type="submit" className="btn" onClick={handleSaveAndSendPlatform} disabled={((editFormStatus === "False") && (ownplatformConfig.trackNumber === 0) || (trackMode === "Automatic") ? true: false)}>SAVE & SEND</button>
                <button type="submit" className="btn" onClick={handlerCancel}>CANCEL</button>
                {/* <button type="submit" className="btn" onClick={() => window.location.reload()} >TAMBAH</button> */}
         
    
          </>
  );
}

export default OwnShipHome; 