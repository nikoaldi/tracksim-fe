import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './OwnshipForm.css';
import axios from "axios";
import DataTable from "react-data-table-component";
import { Alert } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OwnshipForm = (props) => {

    const [OwnshipData, setOwnshipData] = useState([]);
    const [id, setId] = useState(0);
    const [status, setStatus] = useState("Saved");
    const [lastSend, setLastSend] = useState("");
    const [time, setTime] = useState("Time");
    const [trackMode, setTrackMode] = useState("");
    const [environment, setEnvironment] = useState("-");
    const [startTime, setStartTime] = useState("-");
    const [endTime, setEndTime] = useState("-");
    const [course, setCourse] = useState("");
    const [speed, setSpeed] = useState("");
    const [altitude, setAltitude] = useState("");
    const [courseRangeMin, setCourseRangeMin] = useState();
    const [courseRangeMax, setCourseRangeMax] = useState();
    const [courseIncrement, setCourseIncrement] = useState();
    const [speedRangeMin, setSpeedRangeMin] = useState(null);
    const [speedRangeMax, setSpeedRangeMax] = useState(null);
    const [speedIncrement, setSpeedIncrement] = useState(null);
    const [altitudeRangeMin, setAltitudeRangeMin] = useState(null);
    const [altitudeRangeMax, setAltitudeRangeMax] = useState(null);
    const [altitudeIncrement, setAltitudeIncrement] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    const [heading, setHeading] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [windDirection, setWindDirection] = useState("");
    const [airTemperature, setAirTemperature] = useState("");
    const [pitch, setPitch] = useState("");
    const [yaw, setYaw] = useState("");
    const [roll, setRoll] = useState("");
    const [barometricPressure, setBarometricPressure] = useState("");
    const [accelerationX, setAccelerationX] = useState("");
    const [accelerationY, setAccelerationY] = useState("");
    const [accelerationZ, setAccelerationZ] = useState("")
    const [velocityX, setVelocityX] = useState("");
    const [velocityY, setVelocityY] = useState("");
    const [velocityZ, setVelocityZ] = useState("");

    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState("");

    // POP UP DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete= () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    // POP UP SAVE
    const [showSave, setShowSave] = useState(false);
    const handleCloseSave= () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);

    // POP UP SAVE AND SEND
    const [showSaveAndSend, setShowSaveAndSend] = useState(false);
    const handleCloseSaveAndSend= () => setShowSaveAndSend(false);
    const handleShowSaveAndSend = () => setShowSaveAndSend(true);

    const enumEnvironment = {
        1: "Air",
        2: "Surface",
        3: "Subsurface",
        4: "Land"
    }


    // REQUEST GET OWNSHIP DATA 00
    const getOwnshipData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/ownship');
        setOwnshipData(response.data)
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            getOwnshipData();
        },1000)    
    }, [])
    
    // REQUEST POST SAVE OWNSHIP TRACK 00
    let dataSave = async (e) => {
        let resSend= await fetch("http://localhost:8080/ownship", {
            method: "POST",
            body: JSON.stringify({
            status: status,
            lastSend: lastSend,
            trackMode: trackMode,
            environment: environment,
            startTime:startTime,
            endTime:endTime,
            course:course,
            speed:speed,
            altitude:altitude,
            courseRangeMin:courseRangeMin,
            courseRangeMax:courseRangeMax,
            courseIncrement:courseIncrement,
            speedRangeMin:speedRangeMin,
            speedRangeMax:speedRangeMax,
            speedIncrement:speedIncrement,
            altitudeRangeMin:altitudeRangeMin,
            altitudeRangeMax:altitudeRangeMax,
            altitudeIncrement:altitudeIncrement,
            latitude:latitude,
            longitude:longitude,
            heading:heading,
            humidity:humidity,
            windSpeed:windSpeed,
            windDirection:windDirection,
            airTemperature:airTemperature,
            pitch:pitch,
            roll:roll,
            yaw:yaw,
            barometricPressure:barometricPressure,
            accelerationX:accelerationX,
            accelerationY:accelerationY,
            accelerationZ:accelerationZ,
            velocityX:velocityX,
            velocityY:velocityY,
            velocityZ:velocityZ
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            handleCloseSave();
            handlerCancel();
            alert("Save OwnShip Track success");
          } else {
            handleCloseSave();
            handlerCancel();
            alert("Some error occured");
          }
    }
    
    // REQUEST POST SAVE AND SEND OWNSHIP TRACK 00
    let dataSaveAndSend = async (e) => {
        let resSend= await fetch("http://localhost:8080/ownship/saveandsend", {
            method: "POST",
            body: JSON.stringify({
                status: status,
                lastSend: lastSend,
                trackMode: trackMode,
                environment: environment,
                startTime:startTime,
                endTime:endTime,
                course:course,
                speed:speed,
                altitude:altitude,
                courseRangeMin:courseRangeMin,
                courseRangeMax:courseRangeMax,
                courseIncrement:courseIncrement,
                speedRangeMin:speedRangeMin,
                speedRangeMax:speedRangeMax,
                speedIncrement:speedIncrement,
                altitudeRangeMin:altitudeRangeMin,
                altitudeRangeMax:altitudeRangeMax,
                altitudeIncrement:altitudeIncrement,
                latitude:latitude,
                longitude:longitude,
                heading:heading,
                humidity:humidity,
                windSpeed:windSpeed,
                windDirection:windDirection,
                airTemperature:airTemperature,
                pitch:pitch,
                roll:roll,
                yaw:yaw,
                barometricPressure:barometricPressure,
                accelerationX:accelerationX,
                accelerationY:accelerationY,
                accelerationZ:accelerationZ,
                velocityX:velocityX,
                velocityY:velocityY,
                velocityZ:velocityZ
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            handleCloseSaveAndSend()
            alert("Save and Send OwnShip Track success");
          } else {
            alert("Some error occured");
          }
    }

    // Function Request PUT Update Data OwnShip Track 00
    let dataUpdate = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/ownship/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                status: status,
                lastSend: lastSend,
                trackMode: trackMode,
                environment: environment,
                startTime:startTime,
                endTime:endTime,
                course:course,
                speed:speed,
                altitude:altitude,
                courseRangeMin:courseRangeMin,
                courseRangeMax:courseRangeMax,
                courseIncrement:courseIncrement,
                speedRangeMin:speedRangeMin,
                speedRangeMax:speedRangeMax,
                speedIncrement:speedIncrement,
                altitudeRangeMin:altitudeRangeMin,
                altitudeRangeMax:altitudeRangeMax,
                altitudeIncrement:altitudeIncrement,
                latitude:latitude,
                longitude:longitude,
                heading:heading,
                humidity:humidity,
                windSpeed:windSpeed,
                windDirection:windDirection,
                airTemperature:airTemperature,
                pitch:pitch,
                roll:roll,
                yaw:yaw,
                barometricPressure:barometricPressure,
                accelerationX:accelerationX,
                accelerationY:accelerationY,
                accelerationZ:accelerationZ,
                velocityX:velocityX,
                velocityY:velocityY,
                velocityZ:velocityZ
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resUpdate.status === 200) {
            handleCloseSave();
            handlerCancel();
            alert("OwnShip Track Updated");
          } else {
            handleCloseSave();
            handlerCancel();
            setMessage("Some error occured");
          }
    }
        
    // HANDLER SAVE OWNSHIP TRACK 00
    let handlerSaveTrack = async (e) => {
        try {
            if(edit !== "edit"){
                dataSave();
                handleCloseSave();
            } else {
                dataUpdate();
                handleCloseSave();
            }
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER VALIDASI SAVE AND SEND OWNSHIP TRACK
    let handlerValidasiSaveAndSendTrack = async (e) => {
        e.preventDefault();
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(environment === "-" || course === "" || speed === "" || altitude === "" || heading === ""|| humidity === ""|| windSpeed === ""|| windDirection === ""|| airTemperature === "" || pitch === "" || roll === "" || yaw === "" || barometricPressure === ""|| accelerationX === ""|| accelerationY === ""|| accelerationZ === ""|| velocityX === ""|| velocityY === ""|| velocityZ === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        handleShowSaveAndSend();
                    }
                } else if(trackMode === "automatic"){
                    if(environment === "-"  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === "" || heading === ""|| humidity === ""|| windSpeed === ""|| windDirection === ""|| airTemperature === "" || pitch === "" || roll === "" || yaw === "" || barometricPressure === ""|| accelerationX === ""|| accelerationY === ""|| accelerationZ === ""|| velocityX === ""|| velocityY === ""|| velocityZ === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        handleShowSaveAndSend();
                    }
                }
            }
            
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER VALIDASI SAVE TRACK  00
    let handlerValidasiSaveTrack = async (e) => {
        e.preventDefault();
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(environment === "-" || course === "" || speed === "" || altitude === "" || heading === ""|| humidity === ""|| windSpeed === ""|| windDirection === ""|| airTemperature === "" || pitch === "" || roll === "" || yaw === "" || barometricPressure === ""|| accelerationX === ""|| accelerationY === ""|| accelerationZ === ""|| velocityX === ""|| velocityY === ""|| velocityZ === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        handleShowSave();
                    }
                } else if(trackMode === "automatic"){
                    if(environment === "-"  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === "" || heading === ""|| humidity === ""|| windSpeed === ""|| windDirection === ""|| airTemperature === "" || pitch === "" || roll === "" || yaw === "" || barometricPressure === ""|| accelerationX === ""|| accelerationY === ""|| accelerationZ === ""|| velocityX === ""|| velocityY === ""|| velocityZ === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        handleShowSave();
                    }
                }
            }
            
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER TRACK MODE CHANGE 00
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "change"
        disableFormInput(Tmode, status)
    }

    // DISABLED INPUT MANUAL TRACK OWNSHIP == 
    const formManualTrackInput = () => {  
        document.getElementById("tmr").disabled = false;
        document.getElementById("er").disabled = false;
        document.getElementById("course").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("altitude").disabled = false;
        document.getElementById("latitude").disabled = false;
        document.getElementById("longitude").disabled = false;
        document.getElementById("humidity").disabled = false;
        document.getElementById("heading").disabled = false;
        document.getElementById("wind-speed").disabled = false;
        document.getElementById("wind-direction").disabled = false;
        document.getElementById("air-temperature").disabled = false;
        document.getElementById("pitch").disabled = false;
        document.getElementById("roll").disabled = false;
        document.getElementById("yaw").disabled = false;
        document.getElementById("barometric-pressure").disabled = false;
        document.getElementById("acceleration-x").disabled = false;
        document.getElementById("acceleration-y").disabled = false;
        document.getElementById("acceleration-z").disabled = false;
        document.getElementById("velocity-x").disabled = false;
        document.getElementById("velocity-y").disabled = false;
        document.getElementById("velocity-z").disabled = false;

        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("er").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("altitude").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("humidity").style.backgroundColor = 'white';
        document.getElementById("heading").style.backgroundColor = 'white';
        document.getElementById("wind-speed").style.backgroundColor = 'white';
        document.getElementById("wind-direction").style.backgroundColor = 'white';
        document.getElementById("air-temperature").style.backgroundColor = 'white';
        document.getElementById("pitch").style.backgroundColor = 'white';
        document.getElementById("roll").style.backgroundColor = 'white';
        document.getElementById("yaw").style.backgroundColor = 'white';
        document.getElementById("barometric-pressure").style.backgroundColor = 'white';
        document.getElementById("acceleration-x").style.backgroundColor = 'white';
        document.getElementById("acceleration-y").style.backgroundColor = 'white';
        document.getElementById("acceleration-z").style.backgroundColor = 'white';
        document.getElementById("velocity-x").style.backgroundColor = 'white';
        document.getElementById("velocity-y").style.backgroundColor = 'white';
        document.getElementById("velocity-z").style.backgroundColor = 'white';
        
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
    }

    // DISABLED INPUT AUTOMATIC TRACK OWNSIP ==
    const formAutomaticTrackInput = () => {  
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
        document.getElementById("humidity").disabled = false;
        document.getElementById("heading").disabled = false;
        document.getElementById("wind-speed").disabled = false;
        document.getElementById("wind-direction").disabled = false;
        document.getElementById("air-temperature").disabled = false;
        document.getElementById("pitch").disabled = false;
        document.getElementById("roll").disabled = false;
        document.getElementById("yaw").disabled = false;
        document.getElementById("barometric-pressure").disabled = false;
        document.getElementById("acceleration-x").disabled = false;
        document.getElementById("acceleration-y").disabled = false;
        document.getElementById("acceleration-z").disabled = false;
        document.getElementById("velocity-x").disabled = false;
        document.getElementById("velocity-y").disabled = false;
        document.getElementById("velocity-z").disabled = false;

        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("er").style.backgroundColor = 'white';
        document.getElementById("start-time-input").style.backgroundColor = 'white';
        document.getElementById("end-time-input").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("altitude").style.backgroundColor = 'white';
        document.getElementById("course-range-min").style.backgroundColor = 'white';
        document.getElementById("course-range-max").style.backgroundColor = 'white';
        document.getElementById("speed-range-max").style.backgroundColor = 'white';
        document.getElementById("speed-range-min").style.backgroundColor = 'white';
        document.getElementById("altitude-range-max").style.backgroundColor = 'white';
        document.getElementById("altitude-range-min").style.backgroundColor = 'white';
        document.getElementById("course-increment").style.backgroundColor = 'white';
        document.getElementById("speed-increment").style.backgroundColor = 'white';
        document.getElementById("altitude-increment").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("humidity").style.backgroundColor = 'white';
        document.getElementById("heading").style.backgroundColor = 'white';
        document.getElementById("wind-speed").style.backgroundColor = 'white';
        document.getElementById("wind-direction").style.backgroundColor = 'white';
        document.getElementById("air-temperature").style.backgroundColor = 'white';
        document.getElementById("pitch").style.backgroundColor = 'white';
        document.getElementById("roll").style.backgroundColor = 'white';
        document.getElementById("yaw").style.backgroundColor = 'white';
        document.getElementById("barometric-pressure").style.backgroundColor = 'white';
        document.getElementById("acceleration-x").style.backgroundColor = 'white';
        document.getElementById("acceleration-y").style.backgroundColor = 'white';
        document.getElementById("acceleration-z").style.backgroundColor = 'white';
        document.getElementById("velocity-x").style.backgroundColor = 'white';
        document.getElementById("velocity-y").style.backgroundColor = 'white';
        document.getElementById("velocity-z").style.backgroundColor = 'white';
    }

    // DISABLED ALL INPUT FORM 00
    const disableAllInput = () => {
        
        document.getElementById("er").disabled = true;
        document.getElementById("er").style.backgroundColor = '#696978';
        document.getElementById("start-time-input").disabled = true;
        document.getElementById("start-time-input").style.backgroundColor = '#696978';
        document.getElementById("end-time-input").disabled = true;
        document.getElementById("end-time-input").style.backgroundColor = '#696978';
        document.getElementById("course").disabled = true;
        document.getElementById("course").style.backgroundColor = '#696978';
        document.getElementById("speed").disabled = true;
        document.getElementById("speed").style.backgroundColor = '#696978';
        document.getElementById("altitude").disabled = true;
        document.getElementById("altitude").style.backgroundColor = '#696978';
        document.getElementById("course-range-min").disabled = true;
        document.getElementById("course-range-min").style.backgroundColor = '#696978';
        document.getElementById("course-range-max").disabled = true;
        document.getElementById("course-range-max").style.backgroundColor = '#696978';
        document.getElementById("speed-range-max").disabled = true;
        document.getElementById("speed-range-max").style.backgroundColor = '#696978';
        document.getElementById("speed-range-min").disabled = true;
        document.getElementById("speed-range-min").style.backgroundColor = '#696978';
        document.getElementById("altitude-range-max").disabled = true;
        document.getElementById("altitude-range-max").style.backgroundColor = '#696978';
        document.getElementById("altitude-range-min").disabled = true;
        document.getElementById("altitude-range-min").style.backgroundColor = '#696978';
        document.getElementById("course-increment").disabled = true;
        document.getElementById("course-increment").style.backgroundColor = '#696978';
        document.getElementById("speed-increment").disabled = true;
        document.getElementById("speed-increment").style.backgroundColor = '#696978';
        document.getElementById("altitude-increment").disabled = true;
        document.getElementById("altitude-increment").style.backgroundColor = '#696978';
        document.getElementById("latitude").disabled = true;
        document.getElementById("latitude").style.backgroundColor = '#696978';
        document.getElementById("longitude").disabled = true;
        document.getElementById("longitude").style.backgroundColor = '#696978';
        document.getElementById("heading").disabled = true;
        document.getElementById("heading").style.backgroundColor = '#696978';
        document.getElementById("humidity").disabled = true;
        document.getElementById("humidity").style.backgroundColor = '#696978';
        document.getElementById("wind-speed").disabled = true;
        document.getElementById("wind-speed").style.backgroundColor = '#696978';
        document.getElementById("wind-direction").disabled = true;
        document.getElementById("wind-direction").style.backgroundColor = '#696978';
        document.getElementById("air-temperature").disabled = true;
        document.getElementById("air-temperature").style.backgroundColor = '#696978';
        document.getElementById("pitch").disabled = true;
        document.getElementById("pitch").style.backgroundColor = '#696978';
        document.getElementById("roll").disabled = true;
        document.getElementById("roll").style.backgroundColor = '#696978';
        document.getElementById("yaw").disabled = true;
        document.getElementById("yaw").style.backgroundColor = '#696978';
        document.getElementById("barometric-pressure").disabled = true;
        document.getElementById("barometric-pressure").style.backgroundColor = '#696978';
        document.getElementById("acceleration-x").disabled = true;
        document.getElementById("acceleration-x").style.backgroundColor = '#696978';
        document.getElementById("acceleration-y").disabled = true;
        document.getElementById("acceleration-y").style.backgroundColor = '#696978';
        document.getElementById("acceleration-z").disabled = true;
        document.getElementById("acceleration-z").style.backgroundColor = '#696978';
        document.getElementById("velocity-x").disabled = true;
        document.getElementById("velocity-x").style.backgroundColor = '#696978';
        document.getElementById("velocity-y").disabled = true;
        document.getElementById("velocity-y").style.backgroundColor = '#696978';
        document.getElementById("velocity-z").disabled = true;
        document.getElementById("velocity-z").style.backgroundColor = '#696978';
    }

    // DISABLED FORM INPUT setHeading(0) TRACK ==
    const disableFormInput=(Tmode, getEdit)=>{  
        if(Tmode === 'manual')
        {
            disableAllInput()
            formManualTrackInput()
        } else if (Tmode === 'automatic') {
            disableAllInput()
            formAutomaticTrackInput()
        } else {
            disableAllInput()
        }
    }   
   
    /// REQUEST GET UPDATE 00
    const handleGetUpdateOwnShipTrack = async (e) => {
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = OwnshipData.trackMode;
        const $selectEnvironment = document.getElementById('er');
        $selectEnvironment.value = OwnshipData.environment;
        setTrackMode(OwnshipData.trackMode)
        setEnvironment(OwnshipData.environment)
        setStartTime(OwnshipData.startTime)
        setEndTime(OwnshipData.endTime)
        setCourse(OwnshipData.course)
        setSpeed(OwnshipData.speed)
        setAltitude(OwnshipData.altitude)
        setCourseRangeMin(OwnshipData.courseRangeMin)
        setCourseRangeMax(OwnshipData.courseRangeMax)
        setSpeedRangeMin(OwnshipData.speedRangeMin)
        setSpeedRangeMax(OwnshipData.speedRangeMax)
        setAltitudeRangeMin(OwnshipData.altitudeRangeMin)
        setAltitudeRangeMax(OwnshipData.altitudeRangeMax)
        setCourseIncrement(OwnshipData.courseIncrement)
        setSpeedIncrement(OwnshipData.speedIncrement)
        setAltitudeIncrement(OwnshipData.altitudeIncrement)
        setLatitude(OwnshipData.latitude)
        setLongitude(OwnshipData.longitude)
        setHeading(OwnshipData.heading)
        setHumidity(OwnshipData.humidity)
        setWindSpeed(OwnshipData.windSpeed)
        setWindDirection(OwnshipData.windDirection)
        setAirTemperature(OwnshipData.airTemperature)
        setPitch(OwnshipData.pitch)
        setRoll(OwnshipData.roll)
        setYaw(OwnshipData.yaw)
        setBarometricPressure(OwnshipData.barometricPressure)
        setAccelerationX(OwnshipData.accelerationX)
        setAccelerationY(OwnshipData.accelerationY)
        setAccelerationZ(OwnshipData.accelerationZ)
        setVelocityX(OwnshipData.velocityX)
        setVelocityY(OwnshipData.velocityY)
        setVelocityZ(OwnshipData.velocityZ)
        setId(OwnshipData.id)
        console.log(OwnshipData)

        
        var getEdit="edit";
        setEdit("edit")
        disableFormInput(OwnshipData.trackMode, getEdit)
    }

    // HANDLER SEND STOP OWNSHIP TRACK 00
    let handlerStopTrack = async (e) => {
        let resStop= await fetch(`http://localhost:8080/ownship/stoptrack`, {
            method: "POST",
            body: 1,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resStop.status === 202) {
            alert("OwnShip Track Stopped");
          } else {
            setMessage("Some error occured");
          }
    } 

    // HANDLER SEND OWNSHIP TRACK 00
    let handlerSendTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/ownship/sendtrack`, {
            method: "POST",
            body: 1,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 202) {
            alert("Ownship Track Sended");
          } else {
            setMessage("Some error occured");
          }
    }

    // HANDLER CANCEL ==
    const handlerCancel=(event)=>{
        setEdit("change")
        var Tmode = "-"
        
        if(OwnshipData.id === 1){
            document.getElementById("tmr").disabled = true;
            document.getElementById("tmr").style.backgroundColor = '#696978';
        }
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = "-";

        setTrackMode("")
        const $selectEnvironment = document.getElementById('er');
        $selectEnvironment.value = "-";
        setEnvironment("")
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
        setLatitude("")
        setLongitude("")
        setHumidity("")
        setWindSpeed("")
        setHeading("")
        setWindDirection("")
        setAirTemperature("")
        setPitch("")
        setRoll("")
        setYaw("")
        setBarometricPressure("")
        setAccelerationX("")
        setAccelerationY("")
        setAccelerationZ("")
        setVelocityX("")
        setVelocityY("")
        setVelocityZ("")

        disableFormInput(Tmode, status)
    }

    // HANDLER GET DEFAULT 
    const handlerGetDefault=(event)=>{
        if(trackMode === "manual"){
            var now = new Date();
            const $selectEnvironment = document.getElementById('er');
            $selectEnvironment.value = "1";
            setCourse(0)
            setSpeed(0)
            setAltitude(0)
            setLongitude(0)
            setLatitude(0)
            setHumidity(0)
            setHeading(0)
            setWindSpeed(0)
            setWindDirection(0)
            setAirTemperature(0)
            setPitch(0)
            setRoll(0)
            setYaw(0)
            setBarometricPressure(0)
            setAccelerationX(0)
            setAccelerationY(0)
            setAccelerationZ(0)
            setVelocityX(0)
            setVelocityY(0)
            setVelocityZ(0)
    
        } else if(trackMode === "automatic"){
            var now = new Date();
            const $selectEnvironment = document.getElementById('er');
            $selectEnvironment.value = "1";
            
            setStartTime("-")
            setEndTime("-")
            setCourse(0)
            setSpeed(0)
            setAltitude(0)
            setCourseRangeMin(0)
            setCourseRangeMax(0)
            setCourseIncrement(0)
            setSpeedRangeMin(0)
            setSpeedRangeMax(0)
            setSpeedIncrement(0)
            setAltitudeRangeMin(0)
            setAltitudeRangeMax(0)
            setAltitudeIncrement(0)
            setLongitude(0)
            setLatitude(0)
            setHeading(0)
            setHumidity(0)
            setWindSpeed(0)
            setWindDirection(0)
            setAirTemperature(0)
            setPitch(0)
            setRoll(0)
            setYaw(0)
            setBarometricPressure(0)
            setAccelerationX(0)
            setAccelerationY(0)
            setAccelerationZ(0)
            setVelocityX(0)
            setVelocityY(0)
            setVelocityZ(0)
        } 
    }


    return (
    <div className="main-container">   
        <label className="label">OWNSHIP TRACK LIST INFO</label>
        <div className="">
            <div className="track-list">
                <div className="track-info">
                    <table className="table">
                    <tr>
                        <td>Track Mode</td>  
                        <td>: {OwnshipData.trackMode}</td>  
                        <td>Course</td>  
                        <td>: {OwnshipData.course} deg</td> 
                        <td>Speed</td>  
                        <td>: {OwnshipData.speed} knot</td>   
                        <td>Altitude</td>  
                        <td>: {OwnshipData.altitude} feet</td>
                        <td>Heading</td>
                        <td>: {OwnshipData.heading} deg</td> 
                    </tr>

                    <tr >
                        <td>Environment</td>
                        <td>: {enumEnvironment[OwnshipData.environment]}</td>
                        <td>Course Range Min</td>  
                        <td>: {OwnshipData.courseRangeMin} deg</td> 
                        <td>Speed Range Min</td>  
                        <td>: {OwnshipData.speedRangeMin} knot</td> 
                        <td>Altitude Range Min</td>  
                        <td>: {OwnshipData.altitudeRangeMin} feet</td> 
                        <td>Humidity</td>
                        <td>: {OwnshipData.humidity} %</td> 
                    </tr>        

                    <tr>
                        <td>Start Time</td>
                        <td>: {OwnshipData.startTime}</td>
                        <td>Course Range Max</td>  
                        <td>: {OwnshipData.courseRangeMax} deg</td>  
                        <td>Speed Range Max</td>  
                        <td>: {OwnshipData.speedRangeMax} knot</td> 
                        <td>Altitude Range Max</td>  
                        <td>: {OwnshipData.altitudeRangeMax} feet</td> 
                        <td>Wind Speed</td>
                        <td>: {OwnshipData.windSpeed} m/s</td>
                    </tr>

                    <tr>
                        <td>End Time</td>
                        <td>: {OwnshipData.endTime} </td>
                        <td>Course Increment</td>
                        <td>: {OwnshipData.courseIncrement} </td>
                        <td>Speed Increment</td>
                        <td>: {OwnshipData.speedIncrement} </td>
                        <td>Altitude Increment</td>
                        <td>: {OwnshipData.altitudeIncrement} </td>
                        <td>Wind Direction</td>
                        <td>: {OwnshipData.windDirection} deg</td>      
                    </tr>

                    <tr>
                        <td>Last Update</td>
                        <td>: {OwnshipData.lastSend} </td>
                        <td>Pitch</td>
                        <td>: {OwnshipData.pitch} deg</td>
                        <td>Acceleration X</td>
                        <td>: {OwnshipData.accelerationX} m/s</td>
                        <td>Velocity X</td>
                        <td>: {OwnshipData.velocityX} m/s</td>  
                        <td>Air Temperature</td>
                        <td>: {OwnshipData.airTemperature} celcius</td>   
                    </tr>
        
                    <tr>
                        <td>Latitude</td>
                        <td>: {OwnshipData.latitude}</td>
                        <td>Roll</td>
                        <td>: {OwnshipData.roll} deg </td>
                        <td>Acceleration Y</td>
                        <td>: {OwnshipData.accelerationY} m/s</td>
                        <td>Velocity Y</td>
                        <td>: {OwnshipData.velocityY} m/s</td>  
                        <td>Barometric Pressure</td>
                        <td>: {OwnshipData.barometricPressure} pascal </td>  
                    </tr>  

                    <tr>
                        <td>Longitude</td>
                        <td>: {OwnshipData.longitude}</td>
                        <td>Yaw</td>
                        <td>: {OwnshipData.yaw} deg</td>
                        <td>Acceleration Z</td>
                        <td>: {OwnshipData.accelerationZ} m/s</td>
                        <td>Velocity Z</td>
                        <td>: {OwnshipData.velocityZ} m/s</td>  
                        <td>Status</td>
                        <td>: {OwnshipData.status}</td>
                    </tr>          
                </table>
                </div>
                    <button className="btn btn-info mt-2 ml-4" onClick={handleGetUpdateOwnShipTrack}  disabled={(OwnshipData.length === 0? true : false)} >EDIT</button>
                    <button className="btn btn-primary mt-2" onClick={handlerSendTrack} disabled={(OwnshipData.length === 0? true : false)}>SEND</button>
                    <button className="btn btn-danger mt-2" onClick={handlerStopTrack} disabled={(OwnshipData.length === 0? true : false)}>STOP</button>
                    {/* <div className="btn-delete">
                        <Button variant="btn btn-danger mt-2" onClick={handlerGetIdDeleteTrack}>
                            DELETE
                        </Button>
                        <Modal show={showDelete} onHide={handleCloseDelete}>
                            <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Yakin hapus Track?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handlerDeleteTrack}>
                                Delete
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div> */}
            </div>
        </div>


        <div className="container-list">
        <label className="label">DATA SETTING</label>
            <div className="track-list-1">
                <div className="data-setting" >
                    <table className="table-input">
                            <tr>
                                <td>Track Mode</td>
                                <td>             
                                    <select  name="track-mode-radio" class="form-input" id="tmr"  onChange={handleTrackMode} disabled={(OwnshipData.length !== 0? true : false)}> 
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
                                <td> {/*edit : {edit} -- Status:{OwnshipData.status} */}</td>
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
                          
                            </tr>

                            <tr className="radio-box-top">
                                <td>Air Temperature</td>
                                <td>
                                    <input 
                                    type="number" 
                                    id="air-temperature"
                                    name="air-temperature"
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
                                    id="acceleration-x"
                                    name="acceleration-x"
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
                                    id="velocity-x"
                                    name="velocity-x"
                                    placeholder="Velocity X"
                                    class="form-input"
                                    value={velocityX}
                                    onChange={(e) => setVelocityX(e.target.value)} disabled> 
                                    </input>
                                </td>                    
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
                                    id="acceleration-y"
                                    name="acceleration-y"
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
                                    id="velocity-y"
                                    name="velocity-y"
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
                                    id="wind-speed"
                                    name="wind-speed"
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
                                    id="acceleration-z"
                                    name="acceleration-z"
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
                                    id="velocity-z"
                                    name="velocity-z"
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
                                    id="wind-direction"
                                    name="wind-direction"
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
                                    id="barometric-pressure"
                                    name="barometric-pressure"
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
            <button type="submit" className="btn btn-info mt-2 ml-4" onClick={handlerGetDefault} >GET DEFAULT</button>
            <Button variant="btn btn-success mt-2" onClick={handlerValidasiSaveTrack}>
                SAVE ONLY
            </Button>
            <Modal show={showSave} onHide={handleCloseSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Confirmation</Modal.Title>
                </Modal.Header>
                 <Modal.Body>Yakin untuk menyimpan Track?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSave}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlerSaveTrack}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="btn btn-primary mt-2" onClick={handlerValidasiSaveAndSendTrack} >
                SAVE & SEND
            </Button>
            <Modal show={showSaveAndSend} onHide={handleCloseSaveAndSend}>
                <Modal.Header closeButton>
                    <Modal.Title>Save and Send Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Yakin untuk Menyimpan dan Mengirim Track?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSaveAndSend}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={dataSaveAndSend}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <button type="submit" className="btn btn-warning mt-2" onClick={handlerCancel}>CANCEL</button>
        </div>
    </div>
  
    );
}

export default OwnshipForm; 