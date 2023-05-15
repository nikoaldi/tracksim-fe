import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './RadarForm.css';

const FormRadar = (props) => {

    const [RadarData, setRadarData] = useState([]);
    const [statusRadio, setStatusRadio] = useState(1);

    const [id, setId] = useState(0);
    const [status, setStatus] = useState("Status");
    const [lastSend, setLastSend] = useState("LastSend");
    const [time, setTime] = useState("Time");

    const [trackMode, setTrackMode] = useState("");
    const [environment, setEnvironment] = useState("Environment");
    const [course, setCourse] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [courseRangeMin, setCourseRangeMin] = useState(0);
    const [courseRangeMax, setCourseRangeMax] = useState(0);
    const [courseIncrement, setCourseIncrement] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [bearing, setBearing] = useState(0);
    const [mode1code, setMode1Code] = useState(0);
    const [mode2code, setMode2Code] = useState(0);

    const [trackInput, setTrackInput] = useState("");
    const [startTime, setStartTime] = useState("");
    const [speedRangeMin, setSpeedRangeMin] = useState(0);
    const [speedRangeMax, setSpeedRangeMax] = useState(0);
    const [speedIncrement, setSpeedIncrement] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [distance, setDistance] = useState(0);
    const [mode3code, setMode3Code] = useState(0);
    const [mode4code, setMode4Code] = useState(0);

    const [count, setCount] = useState(0);
    const [endTime, setEndTime] = useState("");
    const [altitudeRangeMin, setAltitudeMin] = useState(0);
    const [altitudeRangeMax, setAltitudeMax] = useState(0);
    const [altitudeIncrement, setAltitudeIncrement] = useState(0);
    const [altitude, setAltitude] = useState(0);
    const [mode5code, setMode5Code] = useState(0);

    const [message, setMessage] = useState("");

      //// Handler Radio 1
  
  let handlerRadio1 = async (e) => {
    setStatusRadio(1)
  };

  let hadlerDisable = async (e) => {
    document.getElementById("tmr").disabled = false;
  };




        //// Handler Radio 2
  
        let handlerRadio2 = async (e) => {
            setStatusRadio(2)
          };


    //// REQUEST GET

  const getRadarData = async () => {
    try{
      let response = await Axios.get('http://localhost:8080/radar')
      setRadarData(response.data)
    } catch(e){
      console.log(e.message)
    }
  }



  useEffect(() => {
    let interval = setInterval(() => {
        getRadarData();
    },1000)    
  }, [])


  function disableField(){

    let get= document.getElementById("count")
    
    get.disabled = true;
    
    }

    
    let handleSendOnlyPlatform = async (e) => {
        e.preventDefault();
        try {
          // Send Only

        
        if(trackInput === "multi" && trackMode == "Manual"){
            for (let step = 0; step < count; step++) {
    
                let resSend= await fetch("http://localhost:8080/radar/multimanual", {
                    method: "POST",
                    body: JSON.stringify({
                    status: status,
                    lastSend: lastSend,
                    count:count,
                    time:time,
                    trackInput:trackInput,
                    course:course,
                    speed:speed,
                    trackMode: trackMode,
                    environment: environment,
                    courseRangeMin:courseRangeMin,
                    courseRangeMax:courseRangeMax,
                    courseIncrement:courseIncrement,
                    latitude:latitude,
                    bearing:bearing,
                    mode1code:mode1code,
                    mode2code:mode2code,
                    startTime:startTime,
                    speedRangeMin:speedRangeMin,
                    speedRangeMax:speedRangeMax,
                    speedIncrement:speedIncrement,
                    longitude:longitude,
                    distance:distance,
                    mode3code:mode3code,
                    mode4code:mode4code,
                    endTime:endTime,
                    altitudeRangeMin:altitudeRangeMin,
                    altitudeRangeMax:altitudeRangeMax,
                    altitudeIncrement:altitudeIncrement,
                    altitude:altitude,
                    mode5code:mode5code

                    }),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    },
                    
                });
            }
        } else if(trackInput === "multi" && trackMode == "Automatic"){
            for (let step = 0; step < count; step++) {
    
                let resSend= await fetch("http://localhost:8080/radar/multiauto", {
                    method: "POST",
                    body: JSON.stringify({
                    status: status,
                    lastSend: lastSend,
                    count:count,
                    time:time,
                    trackInput:trackInput,
                    course:course,
                    speed:speed,
                    trackMode: trackMode,
                    environment: environment,
                    courseRangeMin:courseRangeMin,
                    courseRangeMax:courseRangeMax,
                    courseIncrement:courseIncrement,
                    latitude:latitude,
                    bearing:bearing,
                    mode1code:mode1code,
                    mode2code:mode2code,
                    startTime:startTime,
                    speedRangeMin:speedRangeMin,
                    speedRangeMax:speedRangeMax,
                    speedIncrement:speedIncrement,
                    longitude:longitude,
                    distance:distance,
                    mode3code:mode3code,
                    mode4code:mode4code,
                    endTime:endTime,
                    altitudeRangeMin:altitudeRangeMin,
                    altitudeRangeMax:altitudeRangeMax,
                    altitudeIncrement:altitudeIncrement,
                    altitude:altitude,
                    mode5code:mode5code

                    }),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    },
                    
                });
            }
        } else if(trackInput === "single"){
            let resSend= await fetch("http://localhost:8080/radar/single", {
                method: "POST",
                body: JSON.stringify({
                status: status,
                lastSend: lastSend,
                count:count,
                time:time,
                trackInput:trackInput,
                course:course,
                speed:speed,
                trackMode: trackMode,
                environment: environment,
                courseRangeMin:courseRangeMin,
                courseRangeMax:courseRangeMax,
                courseIncrement:courseIncrement,
                latitude:latitude,
                bearing:bearing,
                mode1code:mode1code,
                mode2code:mode2code,
                startTime:startTime,
                speedRangeMin:speedRangeMin,
                speedRangeMax:speedRangeMax,
                speedIncrement:speedIncrement,
                longitude:longitude,
                distance:distance,
                mode3code:mode3code,
                mode4code:mode4code,
                endTime:endTime,
                altitudeRangeMin:altitudeRangeMin,
                altitudeRangeMax:altitudeRangeMax,
                altitudeIncrement:altitudeIncrement,
                altitude:altitude,
                mode5code:mode5code

                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
                
            });
        }
        
    
        } catch (err) {
          console.log(err);
        }
      };


        

    

return (
    <div>
        <div id="radar-list-info">
        <h5 className="title">Radar List Info</h5>
        <form className="formradarlist">
            <table className="table" border={2}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Track Id</th>
                        <th>Track Mode</th>
                        <th>Environment</th>
                        <th>Course</th>
                        <th>Speed</th>
                        <th>Altitude</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>M1</th>
                        <th>M2</th>
                        <th>M3</th>
                        <th>M4</th>
                        <th>M5</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Last Update</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Select All</th>
                    </tr>
                </thead>
                <tbody>
                {
                  RadarData.map((data, index) => {
                    return (
                      <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.id}</td>
                      <td>{data.trackMode}</td>
                      <td>{data.environment}</td>
                      <td>{data.course}</td>
                      <td>{data.speed}</td>
                      <td>{data.altitude}</td>
                      <td>{data.latitude}</td>
                      <td>{data.longitude}</td>
                      <td>{data.mode1code}</td>
                      <td>{data.mode2code}</td>
                      <td>{data.mode3code}</td>
                      <td>{data.mode4code}</td>
                      <td>{data.mode5code}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                      <td>{data.lastSend}</td>
                      <td>{data.status}</td>
                      <td>Action</td>
                      <td>Sellect All</td>
                      </tr>
                    )
                  })
                }
                </tbody>
            </table>
        </form>
    </div>

    <div id="data-setting">
        <h5 className="title">Data Setting</h5>
            <form className="formdatasetting">
                <table className="table"  >
                    <tr>
                        <td></td>
                        <td><label>Track Input</label></td>
                        <td>             
                            <select name="trak-input-radio" id="er" onChange={(e) => setTrackInput(e.target.value)} >
                                <option value="-">-- Pilih --</option>
                                <option value="single">Single</option>
                                <option value="multi">Multi</option>
                                <option value="import">Import</option>
                            </select>
                        </td>
                        <td><label >Track Mode</label></td>
                        <td>
                            <select  name="track-mode-radio" id="tmr" onChange={(e) => setTrackMode(e.target.value)} disabled={((trackInput === "-")? true : false)}> 
                                <option value="-">-- Pilih --</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </td>
                        <td>Count</td>
                        <td>
                            <input 
                            type="number" 
                            id="count"
                            name="count"
                            placeholder="count"
                            onChange={(e) => setCount(e.target.value)}
                            disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "single") && (trackMode === "Automatic")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><input type="file" id="myfile" name="myfile" disabled={((trackInput !== "import")? true : false)}></input></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><label>Environment</label></td>
                        <td>             
                            <select name="environment-radio" id="er" onChange={(e) => setEnvironment(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
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
                            onChange={(e) => setStartTime(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><label >End Time</label></td>
                        <td>
                            <input 
                            type="datetime-local" 
                            id="end-time-input" 
                            name="input-end"
                            onChange={(e) => setEndTime(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>  
                        <td></td>
                    </tr>


                    <tr>
                        <td></td>
                        <td>Course</td>
                        <td>
                            <input 
                            type="number" 
                            id="course"
                            name="course"
                            placeholder="Course"
                            onChange={(e) => setCourse(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td>Speed</td>
                        <td>
                            <input 
                            type="number" 
                            id="speed"
                            name="speed"
                            placeholder="Speed"
                            onChange={(e) => setSpeed(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td>Altitude</td>
                        <td>
                            <input 
                            type="number" 
                            id="altitude"
                            name="altitude"
                            placeholder="Altitude"
                            onChange={(e) => setAltitude(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>Course Variation</td>
                        <td></td>
                        <td>Speed Variation</td>
                        <td></td>
                        <td>Altitude  Variation</td>
                        <td></td>
                        <td></td>
                    </tr>
         
                    <tr>
                        <td></td>
                        <td><label >Course Range</label></td>
                        <td >
                            <input 
                            type="number" 
                            className="input-range"
                            id="course-range-min" 
                            name="course-range-min" 
                            placeholder="Min"
                            size={200}
                            onChange={(e) => setCourseRangeMin(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
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
                            size={5}
                            onChange={(e) => setCourseRangeMax(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td> 
                        <td><label >Speed Range</label></td>
                        <td>
                            <input 
                            type="number" 
                            className="input-range"
                            id="speed-range-min" 
                            name="speed-range-min" 
                            placeholder="Min"
                            size={5}
                            onChange={(e) => setSpeedRangeMin(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
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
                            size={5}
                            onChange={(e) => setSpeedRangeMax(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>  
                        <td><label >Altitude Range</label></td>
                        <td>
                            <input 
                            type="number" 
                            className="input-range"
                            id="altitude-range-min" 
                            name="altitude-range-min" 
                            placeholder="Min"
                            size={5}
                            onChange={(e) => setAltitudeMin(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
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
                            size={5}
                            onChange={(e) => setAltitudeMax(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>  
                        <td></td>
                    </tr>   

                    <tr>
                        <td></td>
                        <td><label>Course Increment</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="course-increment"
                            name="course-increment"
                            placeholder="Course Increment"
                            onChange={(e) => setCourseIncrement(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><label >Speed Increment</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="speed-increment"
                            name="speed-increment"
                            placeholder="Speed Increment"
                            onChange={(e) => setSpeedIncrement(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><label>Altitude Increment</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="altitude-increment"
                            name="altitude-increment"
                            placeholder="Altitude Increment"
                            onChange={(e) => setAltitudeIncrement(e.target.value)} disabled={((trackMode === "") || ((trackInput === "single") && (trackMode === "Manual")) || ((trackInput === "multi") && (trackMode === "Manual")) || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                        <td><input type="radio" id="radio1" name="input1" onClick={handlerRadio1} disabled={((trackInput === "import")? true : false)} /></td>
                        <td><label>Latitude</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="latitude"
                            name="latitude"
                            placeholder="Latitude"
                            onChange={(e) => setLatitude(e.target.value)} disabled={((trackMode === "") || (trackInput === "import") || (statusRadio === 2)? true : false)}>
                            </input>
                        </td>
                        <td><label >Longitude</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="longitude"
                            name="longitude"
                            placeholder="Longitude"
                            onChange={(e) => setLongitude(e.target.value)} disabled={((trackMode === "") || (trackInput === "import") || (statusRadio === 2)? true : false)}> 
                            </input>
                        </td>
                        <td></td>
                        <td>    
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                    <td><input type="radio" id="radio2" name="input1"  onClick={handlerRadio2} disabled={((trackInput === "import")? true : false)}/></td>
                        <td><label>Bearing</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="bearing"
                            name="bearing"
                            placeholder="Bearing"
                            onChange={(e) => setBearing(e.target.value)} disabled={((trackMode === "") || (trackInput === "import") || (statusRadio === 1)? true : false)}>
                            </input>
                        </td>
                        <td><label >Distance</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="distance"
                            name="distance"
                            placeholder="Distance"
                            onChange={(e) => setDistance(e.target.value)} disabled={((trackMode === "") || (trackInput === "import") || (statusRadio === 1)? true : false)}> 
                            </input>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>IFF Data</td>
                        <td colSpan={5}></td>
                        <td></td>    
                    </tr>

                    <tr>
                        <td></td>
                        <td><label>Mode I Code</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="mode1"
                            name="mode1"
                            placeholder="Mode I Code"
                            onChange={(e) => setMode1Code(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><label >Mode III Code</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="mode3"
                            name="mode3"
                            placeholder="Mode III Code"
                            onChange={(e) => setMode3Code(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}> 
                            </input>
                        </td>
                        <td><label>Mode V Code</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="mode5"
                            name="mode5"
                            placeholder="Mode V Code"
                            onChange={(e) => setMode5Code(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td></td>                      
                    </tr>

                    <tr>
                        <td></td>
                        <td><label>Mode II Code</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="mode2"
                            name="mode2"
                            placeholder="Mode II Code"
                            onChange={(e) => setMode2Code(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}>
                            </input>
                        </td>
                        <td><label >Mode IV Code</label></td>
                        <td>
                            <input 
                            type="number" 
                            id="mode4"
                            name="mode4"
                            placeholder="Mode IV Code"
                            onChange={(e) => setMode4Code(e.target.value)} disabled={((trackMode === "") || (trackInput === "import")? true : false)}> 
                            </input>
                        </td>
                        <td colSpan={3}></td>
                    </tr>
           
                </table>
                    <button type="submit" className="btn" >GET DEFAULT</button>
                    <button type="submit" className="btn" onClick={handleSendOnlyPlatform}>SAVE ONLY</button>
                    <button type="submit" className="btn">SAVE & SEND</button>
                    <button type="submit" className="btn">CANCEL</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>



      

   </div>
  );
}

export default FormRadar; 