import  Axios  from "axios"
import React, { useEffect, useState } from "react"




const App = (props) => {
  
  const [plots, setPlot] = useState([]);
  const [plots1, setPlot1] = useState([]);


  
  const [nama, setNama] = useState("");
  const [warna, setWarna] = useState("");
  const [koordinatX, setKoordinatX] = useState("");
  const [koordinatY, setKoordinatY] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [message, setMessage] = useState("");

  const [idUpdate, setIdUpdate] = useState();
  const [namaUpdate, setNamaUpdate] = useState("");
  const [warnaUpdate, setWarnaUpdate] = useState("");
  const [kordinatUpdateX, setKoordinatUpdateX] = useState();
  const [kordinatUpdateY, setKoordinatUpdateY] = useState();
  const [deskripsiUpdate, setDeskripsiUpdate] = useState("");

    //Own Platform
  const [trackMode, setTrackMode] = useState("");
  const [trackNumber, setTrackNumber] = useState("");
  const [humidity, setHumidity] = useState("");
  const [airTemperature, setAirTemperature] = useState("");
  const [trackName, setTrackName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [barometricPressure, setBarometricPressure] = useState("");
  const [environment, setEnvironment] = useState("");
  const [sensor, setSensor] = useState("");
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



  const [idDelete, setIdDelete] = useState();



  
//// REQUEST POST

let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await fetch("http://localhost:9000/plotss", {
      method: "POST",
      body: JSON.stringify({
        nama: nama,
        warna: warna,
        koordinatX: koordinatX,
        koordinatY: koordinatY,
        deskripsi: deskripsi,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let resJson = await res.json();
    if (res.status === 201) {
      setNama("");
      setWarna("");
      setKoordinatX("");
      setKoordinatY("");
      setDeskripsi("");
      setMessage("Plot created successfully");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};





//// REQUEST GET

  const getPlot = async () => {
    try{
      let response = await Axios.get('http://localhost:9000/plotss')
      setPlot(response.data)
    } catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
      getPlot();
  }, [])


  //// REQUEST GET UPDATE PLOT

  const getUpdatePlot = async () => {
    try{
      let response = await Axios.get(`http://localhost:9000/plotss/${idUpdate}`)
      setPlot1(response.data)
    } catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    getUpdatePlot();
  }, [ idUpdate ])


//// REQUEST POST

let handleOwnPlatform = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:9000/ownplatform", {
        method: "POST",
        body: JSON.stringify({
          trackMode: trackMode,
          trackNumber: trackNumber,
          humidity: humidity,
          airTemperature: airTemperature,
          trackName: trackName,
          startTime: startTime,
          endTime: endTime,
          barometricPressure: barometricPressure,
          environment: environment,
          sensor: sensor,
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
          roll: roll,

        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setTrackName("");
        setTrackNumber("");
        setHumidity("");
        setAirTemperature("");
        setTrackName("");
        setStartTime("");
        setEndTime("");
        setBarometricPressure("");
        setEnvironment("");
        setSensor("");
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



    
//// REQUEST UPDATE

let handleUpdate = async (e) => {
  e.preventDefault();
  try {
    let res1 = await fetch(`http://localhost:9000/plotss/${idUpdate}`, {
      method: "PUT",
      body: JSON.stringify({
        nama: namaUpdate,
          warna: warnaUpdate,
          koordinatX: kordinatUpdateX,
          koordinatY: kordinatUpdateY,
          deskripsi: deskripsiUpdate,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let resJson1 = await res1.json();
    if (res1.status === 200) {
      setNama("");
      setWarna("");
      setKoordinatX("");
      setKoordinatY("");
      setMessage("Plot update successfully");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};

//// REQUEST DELETE

let handleDelete = async (e) => {
  e.preventDefault();
  try {
    let res2 = await fetch(`http://localhost:9000/plotss/${idDelete}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let resJson2 = await res2.json();
    if (res2.status === 201) {
      setIdUpdate("");
      setMessage("Plot deleted successfully");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="py-5">
       <div className="container">
         <div className="row justfy-content-center">
          <div className="col-md-8">
            <h1>TAMPIL PLOT</h1>
            
     
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Warna</th>
                  <th>Kordinat X</th>
                  <th>Kordinat Y</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {
                  plots.map((plot, index) => {
                    return (
                      <tr key={index}>
                      <td>{plot.id}</td>
                      <td>{plot.nama}</td>
                      <td>{plot.warna}</td>
                      <td>{plot.koordinatX}</td>
                      <td>{plot.koordinatY}</td>
                      <td>{plot.deskripsi}</td>
                      </tr>
        
                    )
                  })
                }
                

              </tbody>
            </table>
            
          

         <br/>
         <hr/>
          
          <h1>Own Platform</h1>

          <form onSubmit={handleOwnPlatform}>
            <table>
              
              <tr>
              <td><label >Track Mode</label></td>
              <td>
                <select name="track-mode-radio" id="tmr">
                  <option value="Manual">Manual</option>
                  <option value="Automathic">Automathic</option>
                </select>
              </td>

              <td><label >Track Number</label></td>
              <td>
                <input 
                type="text" 
                name="track-number"
                placeholder="Track Number"
                onChange={(e) => setTrackNumber(e.target.value)}> 
              </input>
              </td>

              <td><label >Humidity</label></td>
              <td>
                <input 
                type="text" 
                name="humidity"
                placeholder="Humidity"
                onChange={(e) => setHumidity(e.target.value)}> 
              </input>
              </td>
              
              <td><label >Air Temperature</label></td>
              <td>
                <input 
                type="text" 
                name="air-temperature"
                placeholder="Air Temperature"
                onChange={(e) => setAirTemperature(e.target.value)}> 
              </input>
              </td>
              </tr>





              <tr>
              <td><label>Track Name</label></td>
              <td>
                <input 
                type="text" 
                name="track-name"
                placeholder="Track Name"
                onChange={(e) => setTrackName(e.target.value)}>
                </input>
              </td>

              <td><label >Start Time</label></td>
              <td>
                <input type="datetime-local" id="start-time-input" name="input-start"></input>
              </td>

              <td><label >End Time</label></td>
              <td>
                <input type="datetime-local" id="end-time-input" name="input-end"></input>
              </td>

              <td><label >Barometric Pressure</label></td>
              <td>
                <input 
                type="text" 
                name="barometric-pressure"
                placeholder="Barometric Pressure"
                onChange={(e) => setBarometricPressure(e.target.value)}> 
              </input>
              </td>
              </tr>



              <tr>
                <td><label>Environment</label></td>
                <td>             
                  <select name="environment-radio" id="er">
                    <option value="air">Air</option>
                    <option value="surface">Surface</option>
                    <option value="subsurface">Subsurface</option>
                    <option value="land">land</option>
                  </select>
              </td>

              <td><label >Sensor</label></td>
              <td>
              <select name="sensor-radio" id="sr">
                    <option value="air">Radar</option>
                    <option value="surface">AIS</option>
                    <option value="subsurface">ADS-B</option>
                    <option value="land">Manual</option>
                    <option value="land">Datalink Link ID</option>
                    <option value="land">Datalink INDL</option>
                    <option value="land">Datalink Y</option>
                  </select>
              </td>

              <td><label >Wind Speed</label></td>
              <td> <input 
                type="text" 
                name="wind-speed"
                placeholder="Wind Speed"
                onChange={(e) => setWindSpeed(e.target.value)}> 
              </input>
              </td>

              <td><label >Wind Direction</label></td>
              <td>
                <input 
                type="text" 
                name="wind-direction"
                placeholder="Wind Direction"
                onChange={(e) => setWindDirection(e.target.value)}> 
              </input>
              </td>
              </tr>

              <tr>
                <td><label>Latitude</label></td>
                <td><input 
                type="text" 
                name="latitude"
                placeholder="Latitude"
                onChange={(e) => setLatitude(e.target.value)}>
              </input>
              </td>
              <td></td>
              <td>
              </td>

              <td><label >Longitude</label></td>
              <td>
                <input 
                type="text" 
                name="longitude"
                placeholder="Longitude"
                onChange={(e) => setLongitude(e.target.value)}> 
              </input>
              </td>
              <td></td>
              <td>
              </td>
              </tr>

              <tr>
                <td><label>Altitude</label></td>
                <td><input 
                type="text" 
                name="altitude"
                placeholder="Altitude"
                onChange={(e) => setAltitude(e.target.value)}>
              </input></td>
              <td><label >Pitch</label></td>
              <td>
                <input 
                type="text" 
                name="pitch"
                placeholder="Pitch"
                onChange={(e) => setPitch(e.target.value)}> 
              </input></td>
              <td><label >Acceleration X</label></td>
              <td>
                <input 
                type="text" 
                name="acceleration-x"
                placeholder="Acceleration X"
                onChange={(e) => setAccelerationY(e.target.value)}> 
              </input></td>
              <td><label >Velocity X</label></td>
              <td>
                <input 
                type="text" 
                name="velocity-x"
                placeholder="Velocity X"
                onChange={(e) => setVelocityX(e.target.value)}> 
              </input></td>
              </tr>



              <tr>
                <td><label>Speed</label></td>
                <td><input 
                type="text" 
                name="speed"
                placeholder="Speed"
                onChange={(e) => setSpeed(e.target.value)}>
              </input></td>
              <td><label >Roll</label></td>
              <td>
                <input 
                type="text" 
                name="roll"
                placeholder="Roll"
                onChange={(e) => setRoll(e.target.value)}> 
              </input></td>
              <td><label >Acceleration Y</label></td>
              <td>
                <input 
                type="text" 
                name="acceleration-y"
                placeholder="Acceleration Y"
                onChange={(e) => setAccelerationY(e.target.value)}> 
              </input></td>
              <td><label >Velocity Y</label></td>
              <td>
                <input 
                type="text" 
                name="velocity-y"
                placeholder="Velocity Y"
                onChange={(e) => setVelocityY(e.target.value)}> 
              </input></td>
              </tr>

              <tr>
                <td><label>Heading</label></td>
                <td><input 
                type="text" 
                name="heading"
                placeholder="Heading"
                onChange={(e) => setHeading(e.target.value)}>
              </input></td>
              <td><label >Yaw</label></td>
              <td>
                <input 
                type="text" 
                name="yaw"
                placeholder="Yaw"
                onChange={(e) => setYaw(e.target.value)}> 
              </input></td>
              <td><label >Acceleration Z</label></td>
              <td>
                <input 
                type="text" 
                name="acceleration-z"
                placeholder="Acceleration Z"
                onChange={(e) => setNama(e.target.value)}> 
              </input></td>
              <td><label >Velocity Z</label></td>
              <td>
                <input 
                type="text" 
                name="velocity-z"
                placeholder="Velocity Z"
                onChange={(e) => setVeloityZ(e.target.value)}> 
              </input></td>
              </tr>


            
              
            </table>

              <button type="submit">TAMBAH</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>

          <hr/>

          <br/>
         <hr/>
          
          <h1>TAMBAH PLOT</h1>

          <form onSubmit={handleSubmit}>
            <table>
              <tr>
              <td><label >Nama</label></td>
              <td>
                <input 
                type="text" 
                name="nama"
                placeholder="Nama"
                onChange={(e) => setNama(e.target.value)}> 
              </input></td>
              </tr>

              <tr>
                <td><label>Warna</label></td>
                <td>
                <input 
                type="text" 
                name="warna"
                placeholder="Warna"
                onChange={(e) => setWarna(e.target.value)}>
              </input>
                </td>
              </tr>

              <tr>
                <td><label>Kordinat X</label></td>
                <td><input 
                type="text" 
                name="kordinatX"
                placeholder="Kordinat X"
                onChange={(e) => setKoordinatX(e.target.value)}>
              </input></td>
              </tr>

              <tr>
                <td><label>Kordinat Y</label></td>
                <td><input 
                type="text" 
                name="kordinatY"
                placeholder="Kordinat Y"
                onChange={(e) => setKoordinatY(e.target.value)}>
              </input></td>
              </tr>

              <tr>
                <td><label>Deskripsi</label></td>
                <td><input 
                type="text" 
                name="deskripsi"
                placeholder="Deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}>
              </input></td>
              </tr>
              
            </table>

              <button type="submit">TAMBAH</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>

          <hr/>
              

  

          <h1>UPDATE  PLOT</h1>
          <form onSubmit={handleUpdate}>
          <label>ID UPDATE</label>
          <input type="text" name="idUpdate" value={idUpdate} onChange={(e) => setIdUpdate(e.target.value)}></input>
          <br/>

          <table>
            <tr>
              <td><label>Nama</label></td>
              <td><input 
                type="text" 
                name="nama"           
                defaultValue={plots1.nama}
                onChange={(e) => setNamaUpdate(e.target.value)}> 
              </input></td>
            </tr>

            <tr>
              <td><label>Warna</label></td>
              <td><input 
                type="text" 
                name="warna"
                defaultValue={plots1.warna}
                onChange={(e) => setWarnaUpdate(e.target.value)}>
              </input></td>
            </tr>

            <tr>
              <td><label>Kordinat X</label></td>
              <td><input 
                type="text" 
                name="kordinatX"
                defaultValue={plots1.koordinatX}
                onChange={(e) => setKoordinatUpdateX(e.target.value)}>
              </input></td>
            </tr>

            <tr>
              <td><label>Kordinat Y</label></td>
              <td><input 
                type="text" 
                name="kordinatY"
                defaultValue={plots1.koordinatY}
                onChange={(e) => setKoordinatUpdateY(e.target.value)}>
              </input></td>
            </tr>

            <tr>
              <td><label>Deskripsi</label></td>
              <td> <input quick start guide
                type="text" 
                name="deskripsi"
                defaultValue={plots1.deskripsi}
                onChange={(e) => setDeskripsiUpdate(e.target.value)}> 
              </input></td>
            </tr>
          </table>
          

              <br/>
              <button type="submit">UPDATE</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>

          <br/>


          <h1>DELETE PLOT</h1>
          <form onSubmit={handleDelete}>
            <label>ID DELETE PLot</label>
              <input type="text" 
                name="idDelete" 
                value={idDelete} 
                onChange={(e) => setIdDelete(e.target.value)}>
              </input>
          
              <br/>
              <button type="submit">DELETE</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>


          

          </div>





         </div>
       </div>
    </div>
  );
}

export default App; 