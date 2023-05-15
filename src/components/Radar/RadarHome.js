import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './RadarForm.css';
import axios from "axios";
import DataTable from "react-data-table-component";
import { Alert } from "bootstrap";

const RadarHome = (props) => {

    const [RadarData, setRadarData] = useState([]);
    const [RadarUpdate, setRadarUpdate] = useState([]);
    const [statusRadio, setStatusRadio] = useState(1);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState("Saved");
    const [lastSend, setLastSend] = useState(null);
    const [time, setTime] = useState("Time");
    const [trackMode, setTrackMode] = useState("");
    const [environment, setEnvironment] = useState("Environment");
    const [course, setCourse] = useState();
    const [speed, setSpeed] = useState();
    const [courseRangeMin, setCourseRangeMin] = useState();
    const [courseRangeMax, setCourseRangeMax] = useState();
    const [courseIncrement, setCourseIncrement] = useState();
    const [latitude, setLatitude] = useState(null);
    const [bearing, setBearing] = useState(null);
    const [mode1code, setMode1Code] = useState(null);
    const [mode2code, setMode2Code] = useState(null);
    const [trackInput, setTrackInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [speedRangeMin, setSpeedRangeMin] = useState(null);
    const [speedRangeMax, setSpeedRangeMax] = useState(null);
    const [speedIncrement, setSpeedIncrement] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [distance, setDistance] = useState(null);
    const [mode3code, setMode3Code] = useState(null);
    const [mode4code, setMode4Code] = useState(null);
    const [count, setCount] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [altitudeRangeMin, setAltitudeRangeMin] = useState(null);
    const [altitudeRangeMax, setAltitudeRangeMax] = useState(null);
    const [altitudeIncrement, setAltitudeIncrement] = useState(null);
    const [altitude, setAltitude] = useState(null);
    const [mode5code, setMode5Code] = useState(null);
    const checkIdSend=[];
    const checkIdDelete=[];
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState("");

    const kolom = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true
      },
      {
        name: 'Track Input',
        selector: row => row.trackInput,
        sortable: true
      },
      {
        name: 'Track Mode',
        selector: row => row.trackMode,
        sortable: true
      },
      {
        name: 'Environtment',
        selector: row => row.environtment,
        sortable: true
      },
      {
        name: 'Start Time',
        selector: row => row.startTime,
        sortable: true
      },
      {
        name: 'End Time',
        selector: row => row.endTime,
        sortable: true
      }
    ]

    // Handler Radio 1
    let handlerRadio1 = async (e) => {
        setStatusRadio(1)
        document.getElementById("bearing").disabled = true;
        document.getElementById("distance").disabled = true;
        document.getElementById("latitude").disabled = false;
        document.getElementById("longitude").disabled = false;
        setBearing("")
        setDistance("")
    };
    
    //// Handler Radio 2
    let handlerRadio2 = async () => {
        setStatusRadio(2)
        document.getElementById("bearing").disabled = false;
        document.getElementById("distance").disabled = false;
        document.getElementById("latitude").disabled = true;
        document.getElementById("longitude").disabled = true;
        setLatitude("")
        setLongitude("")
    };

    //// Request Get Radar Track Data
    const getRadarData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/radar');
        setRadarData(response.data)
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
            getRadarData();
    }, [])
    
    //Function Request POST Save Data Radar Track
    let dataSave = async (e) => {
        let resSend= await fetch("http://localhost:8080/radar", {
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
        
    // Handle Save Radar Track
    let handlerSaveTrack = async (e) => {
        e.preventDefault();
        try {
            if(trackInput === "multi" && trackMode == "Manual"){
                for (let step = 0; step < count; step++) {
                    dataSave();
                }
            } else if(trackInput === "multi" && trackMode == "Automatic"){
                for (let step = 0; step < count; step++) {
                    dataSave();
                }
            } else if(trackInput === "single"){
                dataSave();
            }        
        } catch (err) {
          console.log(err);
        }
    };

    //Handle change selected 
    const handleChange=(e)=>{
        const {name, checked}= e.target;
        if(name==="allselect")
        {
            const checkedvalue = RadarData.map( (radar)=>{ return {...radar, isChecked:checked}});
            console.log(checkedvalue);
            setRadarData(checkedvalue);
        } else {
            const checkedvalue= RadarData.map( (radar)=>
            radar.id ===parseInt(name)? {...radar, isChecked:checked}:radar);
            console.log(checkedvalue);
            setRadarData(checkedvalue);
        }
    }
  

    //Handle delete track
    const handlerGetIdDeleteTrack = async (id) => {
        try {               
            for(let i=0; i < RadarData.length; i++){
                if(RadarData[i].isChecked===true){            
                    checkIdDelete.push(RadarData[i].id);                           
                    console.log(checkIdDelete)
                }
            }
            handlerDeleteTrack()       
        } catch (err) {
            console.log(err);
        }
    }

    //Handler get ID Delete Radar Track Data
    let handlerDeleteTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/radar/deleteall`, {
            method: "DELETE",
            body: "["+checkIdDelete+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
    }   
    
     //Handle Update Form
    const handlerUpdateForm=(radar)=>{
        setTrackInput(radar.trackInput)
        setTrackMode(radar.trackMode)
        var Tinput = radar.trackInput
        var Tmode = radar.trackMode
  
        if(Tinput === 'single' && Tmode === 'Manual')
        {
            document.getElementById("count").disabled = true;
            document.getElementById("er").disabled = false;
            document.getElementById("start-time-input").disabled = true;
            document.getElementById("end-time-input").disabled = true;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("course-range-min").disabled = true;
            document.getElementById("course-range-max").disabled = true;
            document.getElementById("speed-range-max").disabled = true;
            document.getElementById("speed-range-max").disabled = true;
            document.getElementById("altitude-range-max").disabled = true;
            document.getElementById("altitude-range-max").disabled = true;
            document.getElementById("course-increment").disabled = true;
            document.getElementById("speed-increment").disabled = true;
            document.getElementById("altitude-increment").disabled = true;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("bearing").disabled = false;
            document.getElementById("distance").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
        }
        else if (Tinput === 'single' && Tmode === 'Automatic')
        {
            document.getElementById("count").disabled = true;
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
            document.getElementById("bearing").disabled = false;
            document.getElementById("distance").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
        }
        else if (Tinput === 'multi' && Tmode === 'Manual')
        {
            document.getElementById("count").disabled = false;
            document.getElementById("er").disabled = false;
            document.getElementById("start-time-input").disabled = true;
            document.getElementById("end-time-input").disabled = true;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("course-range-min").disabled = true;
            document.getElementById("course-range-max").disabled = true;
            document.getElementById("speed-range-max").disabled = true;
            document.getElementById("speed-range-min").disabled = true;
            document.getElementById("altitude-range-max").disabled = true;
            document.getElementById("altitude-range-min").disabled = true;
            document.getElementById("course-increment").disabled = true;
            document.getElementById("speed-increment").disabled = true;
            document.getElementById("altitude-increment").disabled = true;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("bearing").disabled = false;
            document.getElementById("distance").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
        }
        else if (Tinput === 'multi' && Tmode === 'Automatic')
        {
            document.getElementById("count").disabled = false;
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
            document.getElementById("bearing").disabled = true;
            document.getElementById("distance").disabled = true;
            document.getElementById("mode1").disabled = true;
            document.getElementById("mode2").disabled = true;
            document.getElementById("mode3").disabled = true;
            document.getElementById("mode4").disabled = true;
            document.getElementById("mode5").disabled = true;
        }
        else {
            document.getElementById("count").disabled = true;
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
            document.getElementById("bearing").disabled = true;
            document.getElementById("distance").disabled = true;
            document.getElementById("mode1").disabled = true;
            document.getElementById("mode2").disabled = true;
            document.getElementById("mode3").disabled = true;
            document.getElementById("mode4").disabled = true;
            document.getElementById("mode5").disabled = true;
        }
       
    }  

    //Handler Track Input Form
    const handleTrackInput=(event)=>{
        setTrackInput(event.target.value)
        var Tinput = event.target.value
        var status = "change"
        document.getElementById("tmr").disabled = false;
        disableFormInput(Tinput, trackMode, status)
    }

    //Handler Track Mode Form
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "change"
        disableFormInput(trackInput, Tmode, status)
    }

    //Fungsi disable input form
    const disableAllInput = () => {
        document.getElementById("count").disabled = true;
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
        document.getElementById("bearing").disabled = true;
        document.getElementById("distance").disabled = true;
        document.getElementById("mode1").disabled = true;
        document.getElementById("mode2").disabled = true;
        document.getElementById("mode3").disabled = true;
        document.getElementById("mode4").disabled = true;
        document.getElementById("mode5").disabled = true;
    }

    //Handle Disable Form Input
    const disableFormInput=(Tinput, Tmode, getEdit, bearing1 ,getDistance)=>{  
        if(Tinput === 'single' && Tmode === 'Manual')
        {
            disableAllInput()
            document.getElementById("tmr").disabled = false;
            document.getElementById("er").disabled = false;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
            
            setCount("")
            setStartTime("")
            setEndTime("")
            setCourseRangeMin("")
            setCourseRangeMax("")
            setCourseIncrement("")
            setSpeedRangeMin("")
            setSpeedRangeMax("")
            setSpeedIncrement("")
            setAltitudeRangeMin("")
            setAltitudeRangeMax("")
            setAltitudeIncrement("")

           
      
            
            if((getEdit === "edit")) {
                    if(bearing1 > 0 && getDistance > 0){
                        document.getElementById("ti").disabled = true;
                        handlerRadio2()
                    } else {
                        document.getElementById("ti").disabled = true;
                        handlerRadio1()    
                    }
                document.getElementById("ti").disabled = true;
            } 

            
        }
        else if (Tinput === 'single' && Tmode === 'Automatic')
        {

            disableAllInput()
            document.getElementById("tmr").disabled = false;
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
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
            setCount("")
            if(statusRadio === 2){
                handlerRadio2()
            } else {
                handlerRadio1()
            }
            
            if(getEdit === "edit") {
                document.getElementById("ti").disabled = true;
                document.getElementById("tmr").disabled = true;
            } 
            
        }
        else if (Tinput === 'multi' && Tmode === 'Manual')
        {
            disableAllInput()
            document.getElementById("tmr").disabled = false;
            document.getElementById("count").disabled = false;
            document.getElementById("er").disabled = false;
            document.getElementById("course").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("altitude").disabled = false;
            document.getElementById("latitude").disabled = false;
            document.getElementById("longitude").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
            setCount("")
            setStatusRadio(1)
            setStartTime("")
            setEndTime("")
            setCourseRangeMin("")
            setCourseRangeMax("")
            setCourseIncrement("")
            setSpeedRangeMin("")
            setSpeedRangeMax("")
            setSpeedIncrement("")
            setAltitudeRangeMin("")
            setAltitudeRangeMax("")
            setAltitudeIncrement("")
            if((getEdit == "edit") && (bearing1 > 0 && getDistance > 0) ) {
                document.getElementById("ti").disabled = true;
                document.getElementById("count").disabled = true;
                handlerRadio2()
            }
        }
        else if (Tinput === 'multi' && Tmode === 'Automatic')
        {
            disableAllInput()
            
            document.getElementById("er").disabled = false;
            document.getElementById("start-time-input").disabled = false;
            document.getElementById("end-time-input").disabled = false;
            document.getElementById("speed").disabled = false;
            document.getElementById("course").disabled = false;
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
            document.getElementById("bearing").disabled = false;
            document.getElementById("distance").disabled = false;
            document.getElementById("mode1").disabled = false;
            document.getElementById("mode2").disabled = false;
            document.getElementById("mode3").disabled = false;
            document.getElementById("mode4").disabled = false;
            document.getElementById("mode5").disabled = false;
            
            if((getEdit == "edit") && (bearing1 > 0 && getDistance > 0) ) {
                handlerRadio2()
                document.getElementById("ti").disabled = true;
                document.getElementById("tmr").disabled = true;
            } else if((getEdit == "edit") && Tmode === "Automatic" ){
                document.getElementById("ti").disabled = true;
                document.getElementById("tmr").disabled = true;
            } else {
                disableAllInput()
                document.getElementById("count").disabled = false;
                setCount("")
                setStatusRadio(1)
                setEnvironment("")
                setStartTime("")
                setEndTime("")
                setCourse("")
                setCourseRangeMin("")
                setCourseRangeMax("")
                setCourseIncrement("")
                setSpeed("")
                setSpeedRangeMin("")
                setSpeedRangeMax("")
                setSpeedIncrement("")
                setAltitude("")
                setAltitudeRangeMin("")
                setAltitudeRangeMax("")
                setAltitudeIncrement("")      
                setLatitude("")
                setLongitude("")
                setBearing("")
                setDistance("")
                setMode1Code("")
                setMode2Code("")
                setMode3Code("")
                setMode4Code("")
                setMode5Code("")
            }
        } else {
            if(status == "edit") {
                document.getElementById("ti").disabled = true;
            }
            document.getElementById("count").disabled = true;
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
            document.getElementById("bearing").disabled = true;
            document.getElementById("distance").disabled = true;
            document.getElementById("mode1").disabled = true;
            document.getElementById("mode2").disabled = true;
            document.getElementById("mode3").disabled = true;
            document.getElementById("mode4").disabled = true;
            document.getElementById("mode5").disabled = true;
        }
       
    }   
   
    /// REQUEST GET UPDATE
    const handleGetUpdateRadarTrack = async (e) => {

        const {id, checked}= e.target;
        var item = RadarData.find(x => x.id === parseInt(id));
        setRadarUpdate(item)
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = item.trackMode;
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = item.trackInput;
        const $selectEnvironment = document.getElementById('er');
        $selectEnvironment.value = item.environment;
        setTrackInput(item.trackInput)
        setTrackMode(item.trackMode)
        setCount(item.count)
        setEnvironment(item.environment)
        setStartTime(item.startTime)
        setEndTime(item.endTime)
        setCourse(item.course)
        setAltitude(item.altitude)
        setCourseRangeMin(item.courseRangeMin)
        setCourseRangeMax(item.courseRangeMax)
        setSpeedRangeMin(item.speedRangeMin)
        setSpeedRangeMax(item.speedRangeMax)
        setAltitudeRangeMin(item.altitudeRangeMin)
        setAltitudeRangeMax(item.altitudeRangeMax)
        setCourseIncrement(item.courseIncrement)
        setSpeedIncrement(item.speedIncrement)
        setAltitudeIncrement(item.altitudeIncrement)
        setLatitude(item.latitude)
        setLongitude(item.longitude)
        setBearing(item.bearing)
        setDistance(item.distance)
        setMode1Code(item.mode1code)
        setMode2Code(item.mode2code)
        setMode3Code(item.mode3code)
        setMode4Code(item.mode4code)
        setMode5Code(item.mode5code)
        setCount(item.count)
        setId(item.id)
        setSpeed(item.speed)
        console.log(item)

        setEdit("edit")
        var getEdit="edit";

        var bearing1 = item.bearing;
        var getDistance = item.distance;
        disableFormInput(item.trackInput, item.trackMode, getEdit, bearing1, getDistance)
    }

    //Handler get ID Send Radar Track Data
    const handlerGetIdSendTrack = async (id) => {
            try {               
                for(let i=0; i < RadarData.length; i++){
                    if(RadarData[i].isChecked===true){            
                        checkIdSend.push(RadarData[i].id);                           
                        console.log(checkIdSend)
                    }
                }
                handlerSendTrack()       
            } catch (err) {
                console.log(err);
            }
    }

    ///Handle Send Radar
    let handlerSendTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/radar/sendtrack`, {
            method: "POST",
            body: "["+checkIdSend+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
    }

    //Handler Cancel
    const handlerCancel=(event)=>{
        setEdit("change")
        var Tinput = "-"
        var Tmode = "-"
        document.getElementById("ti").disabled = false;
        document.getElementById("tmr").disabled = true;
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = "-";
        setTrackInput("")
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = "-";
        setTrackMode("")
        const $selectEnvironment = document.getElementById('er');
        $selectEnvironment.value = "-";
        setEnvironment("")
        setCount("")
        setEnvironment("")
        setStartTime("")
        setEndTime("")
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
        setBearing("")
        setDistance("")
        setMode1Code("")
        setMode2Code("")
        setMode3Code("")
        setMode4Code("")
        setMode5Code("")

        disableFormInput(Tinput, Tmode, status)
    }

    return (
    <div className="main-container">   
        <label className="label">RADAR TRACK LIST INFO</label>
        <div className="">
            <div className="track-list">
                <div className="table-wrapper">
                    <table className="scrolldown" >
                        <thead>
                            <tr>
                                <th>TN</th>
                                <th>TI</th>
                                <th>TM</th>
                                <th>Env</th>
                                <th>Course</th>
                                <th>Cmin</th>
                                <th>Cmax</th>
                                <th>Cinc</th>
                                <th>Speed</th>
                                <th>Smin</th>
                                <th>Smax</th>
                                <th>Sinc</th>
                                <th>Alt</th>
                                <th>Amin</th>
                                <th>Amax</th>
                                <th>Ainc</th>
                                <th>BR</th>
                                <th>DN</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Status</th>
                                <th>Last Send</th>
                                <th>Action</th>
                                <th><input type="checkbox" name="allselect" checked= { !RadarData.some( (radar)=>radar?.isChecked!==true)} onChange={handleChange} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                RadarData.map( (d,i)=>(
                                    <tr key={i}>
                                        
                                        <td>{d.id}</td>
                                        <td>{d.trackInput}</td>
                                        <td>{d.trackMode}</td>
                                        <td>{d.environment}</td>
                                        <td>{d.course}</td>
                                        <td>{d.courseRangeMin}</td>
                                        <td>{d.courseRangeMax}</td>
                                        <td>{d.courseIncrement}</td>
                                        <td>{d.speed}</td>
                                        <td>{d.speedRangeMin}</td>
                                        <td>{d.speedRangeMax}</td>
                                        <td>{d.speedIncrement}</td>
                                        <td>{d.altitude}</td>
                                        <td>{d.altitudeRangeMin}</td>
                                        <td>{d.altitudeRangeMax}</td>
                                        <td>{d.altitudeIncrement}</td>
                                        <td>{d.bearing}</td>
                                        <td>{d.distance}</td>
                                        <td>{d.startTime}</td>
                                        <td>{d.endTime}</td>
                                        <td>{d.status}</td>
                                        <td>{d.lastSend}</td>
                                        
                                        <td>
                                            {/* <button className="btn btn-sm btn-info me-2">Detail</button> */}
                                            <button className="btn btn-sm btn-primary me-2" id={d.id} onClick={handleGetUpdateRadarTrack}>Edit</button>
                                            {/* <button className="btn btn-sm btn-danger">Delete</button> */}
                                        </td>
                                        <td className="select"><input type="checkbox" name={d.id}  checked={d?.isChecked|| false } onChange={ handleChange }/> </td>
                                
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                    <button className="btn btn-primary mb-3" onClick={handlerGetIdSendTrack}>SEND</button>
                    <button className="btn btn-info mb-3" onClick={handlerGetIdSendTrack}>START</button>
                    <button className="btn btn-danger mb-3" onClick={handlerGetIdSendTrack}>STOP</button>
                    <div className="btn-delete">
                        <button className="btn btn-danger mb-3"  onClick={handlerGetIdDeleteTrack}>DELETE</button>
                    </div>
                
            </div>
        </div>


        <div className="container-list">
        <label className="label">DATA SETTING</label>
            <div className="track-list-1">
                
                <div className="data-setting">
                   
                        <table className="table-input" >
                            <tr>
                                <td className="id1"></td>
                                <td>Track Input</td>
                                <td>             
                                    <select name="trak-input-radio"  class="form-input" id="ti" onChange={handleTrackInput} >
                                        <option value="-">-- Pilih --</option>
                                        <option value="single">Single</option>
                                        <option value="multi">Multi</option>
                                        <option value="import">Import</option>
                                    </select>
                                </td>
                                <td>Track Mode</td>
                                <td>
                                    <select  name="track-mode-radio" class="form-input" id="tmr"   onChange={handleTrackMode} disabled> 
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
                                    class="form-input"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                    disabled>
                                    </input>
                                </td>
                                <td><input type="file" id="myfile" name="myfile" disabled></input></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>Environment</td>
                                <td>             
                                    <select name="environment-radio" class="form-input" id="er" onChange={(e) => setEnvironment(e.target.value)} disabled>
                                        <option value="-">-- Pilih --</option>
                                        <option value="air">Air</option>
                                        <option value="surface">Surface</option>
                                        <option value="subsurface">Subsurface</option>
                                        <option value="land">land</option>
                                    </select>
                                </td>
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
                                <td>id:{id}, radio:{statusRadio}, status:{edit}</td>
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
                                <td></td>
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
                                <td><input type="radio" className="radio" id="radio1" name="radio1" onClick={handlerRadio1}  disabled={(trackInput === "" && trackMode ==="")} checked={statusRadio === 1}/></td>
                                <td>Latitude</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="latitude"
                                    name="latitude"
                                    placeholder="Latitude"
                                    class="form-input"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)} disabled={(statusRadio === 2? true : false)}>
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
                                    onChange={(e) => setLongitude(e.target.value)}  disabled={(statusRadio === 2? true : false)}> 
                                    </input>
                                </td>
                                <td></td>
                                <td>    
                                </td>
                                <td></td>
                            </tr>

                            <tr  className="radio-box-bottom">
                            <td><input type="radio" className="radio" id="radio2" name="radio2"  onClick={handlerRadio2} disabled={((trackInput === "" && trackMode === "") ? true : false)} checked={statusRadio === 2}/></td>
                                <td>Bearing</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="bearing"
                                    name="bearing"
                                    placeholder="Bearing"
                                    class="form-input"
                                    value={bearing}
                                    onChange={(e) => setBearing(e.target.value)} disabled={(statusRadio === 1? true : false)}>
                                    </input> deg
                                </td>
                                <td>Distance</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="distance"
                                    name="distance"
                                    placeholder="Distance"
                                    class="form-input"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)} disabled={(statusRadio === 1? true : false)}> 
                                    </input> NM
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
                                <td>Mode I Code</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="mode1"
                                    name="mode1"
                                    placeholder="Mode I Code"
                                    class="form-input"
                                    value={mode1code}
                                    onChange={(e) => setMode1Code(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Mode III Code</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="mode3"
                                    name="mode3"
                                    placeholder="Mode III Code"
                                    class="form-input"
                                    value={mode3code}
                                    onChange={(e) => setMode3Code(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td>Mode V Code</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="mode5"
                                    name="mode5"
                                    placeholder="Mode V Code"
                                    class="form-input"
                                    value={mode5code}
                                    onChange={(e) => setMode5Code(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td></td>                      
                            </tr>

                            <tr>
                                <td></td>
                                <td>Mode II Code</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="mode2"
                                    name="mode2"
                                    placeholder="Mode II Code"
                                    class="form-input"
                                    value={mode2code}
                                    onChange={(e) => setMode2Code(e.target.value)} disabled>
                                    </input>
                                </td>
                                <td>Mode IV Code</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="mode4"
                                    name="mode4"
                                    placeholder="Mode IV Code"
                                    class="form-input"
                                    value={mode4code}
                                    onChange={(e) => setMode4Code(e.target.value)} disabled> 
                                    </input>
                                </td>
                                <td colSpan={3}></td>
                            </tr>
            
                        </table>
                </div>
            </div>
                            <button type="submit" className="btn" >GET DEFAULT</button>
                            <button type="submit" className="btn" onClick={handlerSaveTrack}>SAVE ONLY</button>
                            <button type="submit" className="btn">SAVE & SEND</button>
                            <button type="submit" className="btn" onClick={handlerCancel}>CANCEL</button>

                
            
        </div>
    </div>
  
    );
}

export default RadarHome; 