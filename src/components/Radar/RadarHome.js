import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './RadarHome.css';
import axios from "axios";
import { Alert } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useWebSocket from 'react-use-websocket';

const RadarHome = (props) => {

    const [RadarData, setRadarData] = useState([]);
    const [RadarDataClone, setRadarDataClone] = useState([]);
    const [RadarUpdate, setRadarUpdate] = useState([]);
    const [statusRadio, setStatusRadio] = useState(1);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Saved");
    const [lastSend, setLastSend] = useState("");
    const [time, setTime] = useState(0);
    const [trackMode, setTrackMode] = useState("");
    const [environment, setEnvironment] = useState("");
    const [course, setCourse] = useState("");
    const [speed, setSpeed] = useState("");
    const [courseRangeMin, setCourseRangeMin] = useState();
    const [courseRangeMax, setCourseRangeMax] = useState();
    const [courseIncrement, setCourseIncrement] = useState();
    const [latitude, setLatitude] = useState("");
    const [bearing, setBearing] = useState("");
    const [mode1code, setMode1Code] = useState("");
    const [mode2code, setMode2Code] = useState("");
    const [trackInput, setTrackInput] = useState("");
    const [startTime, setStartTime] = useState("-");
    const [speedRangeMin, setSpeedRangeMin] = useState("");
    const [speedRangeMax, setSpeedRangeMax] = useState("");
    const [speedIncrement, setSpeedIncrement] = useState("");
    const [longitude, setLongitude] = useState("");
    const [distance, setDistance] = useState("");
    const [mode3code, setMode3Code] = useState("");
    const [mode4code, setMode4Code] = useState("");
    const [count, setCount] = useState("");
    const [endTime, setEndTime] = useState("-");
    const [altitudeRangeMin, setAltitudeRangeMin] = useState("");
    const [altitudeRangeMax, setAltitudeRangeMax] = useState("");
    const [altitudeIncrement, setAltitudeIncrement] = useState("");
    const [altitude, setAltitude] = useState("");
    const [mode5code, setMode5Code] = useState("");
    const checkIdSend=[];
    const checkIdDelete=[];
    const checkIdStop=[];
    const idChecked=[3,4];
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState("");
    const [checkTrackMode, setCheckTrackMode] = useState("");
    const [connected, setConnected] = useState(false);

    const enumEnvironment = {
        1: "Air",
        2: "Surface",
        3: "Subsurface",
        4: "Land"
    }

    useEffect(() => {
        let ws
   
        var connected = false;
        var socket;

        socket = new WebSocket("ws://localhost:8080" + "/chat");
        socket.onopen = function() {
            connected = true;
            console.log("Connected to the web socket");
        };
        socket.onmessage =function(m) {
            console.log("Got message: " + m.data);
        };
         

    
        return () => {
          if (ws) {
            // Close the WebSocket connection when the component unmounts
            ws.close();
          }
        };
      }, []);


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


    // HANDLER RADIO 1 LATITUDE & LONGITUDE
    let handlerRadio1 = async (e) => {
        setStatusRadio(1)
        document.getElementById("bearing").disabled = true;
        document.getElementById("bearing").style.backgroundColor = '#696978';
        document.getElementById("distance").disabled = true;
        document.getElementById("distance").style.backgroundColor = '#696978';
        document.getElementById("latitude").disabled = false;
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").disabled = false;
        document.getElementById("longitude").style.backgroundColor = 'white';
        setBearing("")
        setDistance("")
    };
    
    // HANDLER RADIO 2 DISTANCE & BEARING
    let handlerRadio2 = async () => {
        setStatusRadio(2)
        document.getElementById("bearing").disabled = false;
        document.getElementById("bearing").style.backgroundColor = 'white';
        document.getElementById("distance").disabled = false;
        document.getElementById("distance").style.backgroundColor = 'white';
        document.getElementById("latitude").disabled = true;
        document.getElementById("latitude").style.backgroundColor = '#696978';
        document.getElementById("longitude").disabled = true;
        document.getElementById("longitude").style.backgroundColor = '#696978';
        setLatitude("")
        setLongitude("")
    };

    // Request Get Radar Track Data
    const getRadarData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/radar');
        setRadarData(response.data)
        
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
        // let interval = setInterval(() => {
            getRadarData()
           
        // },2000)
           
            
    }, [])

    // HANDLER SET CHECKED TRACK
    const handlerSetCheckedTrack = async (e) => {
        const {name, checked}= e.target;
            const checkedvalue= RadarData.map( (radar)=>
            radar.id === 4? {...radar, isChecked:true}:radar);
            console.log(checkedvalue);
            setRadarData(checkedvalue);
            alert("udah")
    }


    // REQUEST POST SAVE RADAR TRACK
    let dataSave = async (e) => {
        let resSend= await fetch("http://localhost:8080/radar", {
            method: "POST",
            body: JSON.stringify({
            status: status,
            count:count,
            lastSend: lastSend,
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

        if (resSend.status === 201) {
            alert("Save Radar Track success");
          } else {
            alert("Some error occured");
          }
        window.location.reload();
    }
    
    // REQUEST POST SAVE RADAR TRACK
    let dataSaveAndSend = async (e) => {
        let resSend= await fetch("http://localhost:8080/radar/saveandsend", {
            method: "POST",
            body: JSON.stringify({
            status: status,
            count:count,
            lastSend: lastSend,
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

        if (resSend.status === 201) {
            alert("Save and Send Radar Track success");
          } else {
            alert("Some error occured");
          }
        window.location.reload();   
    }

    // Function Request PUT Update Data Radar Track --
    let dataUpdate = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/radar/${id}`, {
            method: "PUT",
            body: JSON.stringify({
            id:id,
            status: status,
            lastSend: lastSend,
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

        if (resUpdate.status === 200) {
            alert("Radar Track Updated");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
        window.location.reload();
    }

    // Function Request PUT Update Data Radar Track SAVE AND SEND--
    let dataUpdateSaveAndSend = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/radar/${id}`, {
            method: "PUT",
            body: JSON.stringify({
            id:id,
            status: status,
            lastSend: lastSend,
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

        if (resUpdate.status === 200) {
            handlerSendTrackSaveAndSend();
            alert("Radar Track Updated");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
        window.location.reload();
    }
        
    // HANDLER SAVE RADAR TRACK
    let handlerSaveTrack = async (e) => {
        try {
            if(trackInput === "import"){
                alert("import") //TO DO
            } else {
                if(edit !== "edit"){
                    handleCloseSave();
                    dataSave();
                } else {
                    handleCloseSave();
                    dataUpdate();
                }
            }
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER SAVE AND SEND RADAR TRACK
    let handlerSaveAndSendTrack = async (e) => {
        try {
            if(trackInput === "import"){
                alert("import") //TO DO
            } else {
                if(edit !== "edit"){
                    handleCloseSaveAndSend();
                    dataSaveAndSend();
                } else {
                    handleCloseSaveAndSend();
                    dataUpdateSaveAndSend();
                }
            }
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER VALIDASI INPUT SAVE AND SEND UPDATE **
    let handlerValidasiInputSaveAndSendUpdate = async (e) => {
        if(edit === "edit"){
            handlerValidasiSaveAndSendTrackUpdate();
        } else {
            handlerValidasiSaveAndSendTrack();
        }
    }

    // HANDLER VALIDASI SAVE AND SEND RADAR TRACK
    let handlerValidasiSaveAndSendTrack = async (e) => {
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(environment === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackInput === "single" && trackMode === "automatic"){
                    if(environment === ""  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === ""|| mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackInput === "multi" && trackMode === "manual"){
                    if(environment === "" ||count === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackInput === "multi" && trackMode === "automatic"){
                    if(count === "" ){
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

    // HANDLER VALIDASI SAVE AND SEND RADAR TRACK UPDATE
    let handlerValidasiSaveAndSendTrackUpdate = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(environment === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackMode === "automatic"){
                    if(environment === ""  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === ""|| mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } 
            }  
        } catch (err) {
          console.log(err);
        }
    }

    // HANDLER VALIDASI INPUT SEND **
    let handlerValidasiInput = async (e) => {
        if(edit === "edit"){
            handlerValidasiUpdateTrack();
        } else {
            handlerValidasiSaveTrack();
        }
    }

    // HANDLER VALIDASI SAVE TRACK
    let handlerValidasiSaveTrack = async (e) => {
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(environment === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        }
                    }
                } else if(trackInput === "single" && trackMode === "automatic"){
                    if(environment === ""  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === ""|| mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        }
                    }
                } else if(trackInput === "multi" && trackMode === "manual"){
                    if(environment === "" ||count === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                    handleShowSave();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        }
                    }
                } else if(trackInput === "multi" && trackMode === "automatic"){
                    if(count === "" ){
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

    // HANDLER VALIDASI UPDATE SAVE TRACK
    let handlerValidasiUpdateTrack = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(environment === "" || course === "" || speed === "" || altitude === "" || mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        }
                    }
                } else if(trackMode === "automatic"){
                    if(environment === ""  || course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === "" || altitudeRangeMin === ""|| altitudeRangeMax === "" || altitudeIncrement === ""|| mode1code === ""|| mode2code === ""|| mode3code === ""|| mode4code === ""|| mode5code === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi")
                            } else {
                                handleShowSave();
                            }
                        }
                    }
                }
            }    
        } catch (err) {
            console.log(err);
        }
    }

    // HANDLER CHANGE SELECTED 
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
   
    // HANDLER GET DELETED ID RADAR TRACK
    const handlerGetIdDeleteTrack = async (id) => {
        try {               
            for(let i=0; i < RadarData.length; i++){
                if(RadarData[i].isChecked===true){            
                    checkIdDelete.push(RadarData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }
        if(checkIdDelete.length > 0){
            handleShowDelete();
        } else {
            alert("Pilih Radar Track yg akan dihapus")
        }
    }

    // HANDLER DELETE ALL RADAR TRACK BY ID CHECKED
    let handlerDeleteTrack = async (e) => {
        try {               
            for(let i=0; i < RadarData.length; i++){
                if(RadarData[i].isChecked===true){            
                    checkIdDelete.push(RadarData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }

        let resDelete= await fetch(`http://localhost:8080/radar/deleteall`, {
            method: "DELETE",
            body: "["+checkIdDelete+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        
        if (resDelete.status === 204) {
            alert("Radar Track Deleted");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
          handleCloseDelete(true)
    }   

    // HANDLER TRACK INPUT CHANGE
    const handleTrackInput=(event)=>{
        setTrackInput(event.target.value)
        var Tinput = event.target.value
        var status = "change"
        document.getElementById("tmr").disabled = false;
        document.getElementById("radio1").disabled = true;
        document.getElementById("radio2").disabled = true;
        disableFormInput(Tinput, trackMode, status)
    }

    // HANDLER TRACK MODE CHANGE
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "change"
        disableFormInput(trackInput, Tmode, status)
    }

    // DISABLED INPUT MANUAL TRACK RADAR 
    const formManualTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
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
        
        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("er").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("altitude").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("mode1").style.backgroundColor = 'white';
        document.getElementById("mode2").style.backgroundColor = 'white';
        document.getElementById("mode3").style.backgroundColor = 'white';
        document.getElementById("mode4").style.backgroundColor = 'white';
        document.getElementById("mode5").style.backgroundColor = 'white';
        setCount("")
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

    // DISABLED INPUT AUTOMATIC TRACK RADAR
    const formAutomaticTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
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

        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
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
        document.getElementById("mode1").style.backgroundColor = 'white';
        document.getElementById("mode2").style.backgroundColor = 'white';
        document.getElementById("mode3").style.backgroundColor = 'white';
        document.getElementById("mode4").style.backgroundColor = 'white';
        document.getElementById("mode5").style.backgroundColor = 'white';
    }

    // DISABLED ALL INPUT FORM
    const disableAllInput = () => {
        document.getElementById("count").disabled = true;
        document.getElementById("count").style.backgroundColor = '#696978';
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
        document.getElementById("bearing").disabled = true;
        document.getElementById("bearing").style.backgroundColor = '#696978';
        document.getElementById("distance").disabled = true;
        document.getElementById("distance").style.backgroundColor = '#696978';
        document.getElementById("mode1").disabled = true;
        document.getElementById("mode1").style.backgroundColor = '#696978';
        document.getElementById("mode2").disabled = true;
        document.getElementById("mode2").style.backgroundColor = '#696978';
        document.getElementById("mode3").disabled = true;
        document.getElementById("mode3").style.backgroundColor = '#696978';
        document.getElementById("mode4").disabled = true;
        document.getElementById("mode4").style.backgroundColor = '#696978';
        document.getElementById("mode5").disabled = true;
        document.getElementById("mode5").style.backgroundColor = '#696978';
        document.getElementById("myfile").disabled = true;
        document.getElementById("myfile").style.backgroundColor = '#696978';
    }

    // DISABLED FORM INPUT RADAR TRACK
    const disableFormInput=(Tinput, Tmode, getEdit, bearing1 ,getDistance)=>{  
        if(Tinput === 'single' && Tmode === 'manual')
        {
            disableAllInput()
            formManualTrackInput()
            if((getEdit === "edit")) {
                    if(bearing1 > 0 && getDistance > 0){
                        document.getElementById("ti").disabled = true;
                        document.getElementById("ti").style.backgroundColor = '#696978';
                        handlerRadio2()
                    } else {
                        document.getElementById("ti").disabled = true;
                        document.getElementById("ti").style.backgroundColor = '#696978';
                        handlerRadio1()    
                    }
            } else {
                if(bearing > 0 && distance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
            }
    
        } else if (Tinput === 'single' && Tmode === 'automatic') {
            disableAllInput()
            formAutomaticTrackInput()
            setCount("")
            if((getEdit === "edit")) {
                document.getElementById("ti").disabled = true;
                document.getElementById("ti").style.backgroundColor = '#696978';
                document.getElementById("tmr").disabled = true;
                document.getElementById("tmr").style.backgroundColor = '#696978';
                if(bearing1 > 0 && getDistance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
          
            } else {
                if(bearing > 0 && distance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
            }
            
        } else if (Tinput === 'multi' && Tmode === 'manual') {
            disableAllInput()
            formManualTrackInput()
            document.getElementById("count").disabled = false;
            document.getElementById("count").style.backgroundColor = 'white';
            if((getEdit === "edit")) {
                document.getElementById("ti").disabled = true;
                document.getElementById("ti").style.backgroundColor = '#696978';
                document.getElementById("count").disabled = true;
                document.getElementById("count").style.backgroundColor = '#696978';
                if(bearing1 > 0 && getDistance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
    
            } else {
                if(bearing > 0 && distance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
            }
        } else if (Tinput === 'multi' && Tmode === 'automatic') {
            
            if((getEdit === "edit")) {
                formAutomaticTrackInput()
                document.getElementById("ti").disabled = true;
                document.getElementById("ti").style.backgroundColor = '#696978';
                document.getElementById("tmr").disabled = true;
                document.getElementById("tmr").style.backgroundColor = '#696978';
                if(bearing1 > 0 && getDistance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
          
            } else {
                if(bearing > 0 && distance > 0){
                    handlerRadio2()
                } else {
                    handlerRadio1()    
                }
                disableAllInput()
                
                document.getElementById("tmr").disabled = false;
                document.getElementById("count").disabled = false;
                document.getElementById("count").style.backgroundColor = 'white';
                document.getElementById("radio1").disabled = true;
                document.getElementById("radio2").disabled = true;
                
                const $selectEnvironment = document.getElementById('er');
                $selectEnvironment.value = "";
                const $selectMode4Code = document.getElementById('mode4');
                $selectMode4Code.value = "";
                const $selectMode5Code = document.getElementById('mode5');
                $selectMode5Code.value = "";
                setEnvironment("");
                setStartTime("-");
                setEndTime("-");
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
                setLatitude("");
                setLongitude("");
                setBearing("");
                setDistance("");
                setMode1Code("");
                setMode2Code("");
                setMode3Code("");
                setMode4Code("");
                setMode5Code("");
            }
        } else if(Tinput === 'import') {
            disableAllInput()
            document.getElementById("tmr").disabled = true;
            alert("Fungsi Import masih belum bisa digunakan")
            // document.getElementById("myfile").disabled = false;
            // document.getElementById("myfile").style.backgroundColor = 'white';
        }else {
            disableAllInput()
        }
    }   
   
    // REQUEST GET UPDATE
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
        const $selectMode5Code = document.getElementById('mode5');
        $selectMode5Code.value = item.mode5code;
        const $selectMode4Code = document.getElementById('mode4');
        $selectMode4Code.value = item.mode5code;
        setTrackInput(item.trackInput)
        setTrackMode(item.trackMode)
        setCheckTrackMode(item.trackMode)
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

        
        var getEdit="edit";
        setEdit("edit")
        var bearing1 = item.bearing;
        var getDistance = item.distance;
        disableFormInput(item.trackInput, item.trackMode, getEdit, bearing1, getDistance)
    }

    // HANDLER SEND STOP RADAR TRACK
    let handlerStopTrack = async (e) => {
        let resStop= await fetch(`http://localhost:8080/radar/stoptrack`, {
            method: "POST",
            body: "["+checkIdStop+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resStop.status === 202) {
            alert("Radar Track Stopped");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
    } 

    // HANDLER GET ID STOP RADAR TREACK 
    const handlerGetIdStopTrack = async (id) => {
        try {    
            var getIdSend;           
            for(let i=0; i < RadarData.length; i++){
                if(RadarData[i].isChecked===true){            
                    checkIdStop.push(RadarData[i].id);                           
                    console.log(checkIdStop)
                }
            }

            if(checkIdStop.length > 0){
                handlerStopTrack()
            } else {
                alert("Pilih Track yang akan distop")
            }
            
                   
        } catch (err) {
            console.log(err);
        }
    }

    // HANDLER GET ID SEND RADAR TRACK
    const handlerGetIdSendTrack = async (id) => {
            try {    
                var getIdSend;           
                for(let i=0; i < RadarData.length; i++){
                    if(RadarData[i].isChecked===true){            
                        checkIdSend.push(RadarData[i].id);                           
                        console.log(checkIdSend)
                    }
                }
                
                       
            } catch (err) {
                console.log(err);
            }

            if(checkIdSend.length > 0){
                handlerSendTrack()
            } else {
                alert("Pilih Track yang akan dikirim")
            }
    }

    // HANDLER SEND RADAR TRACK 
    let handlerSendTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/radar/sendtrack`, {
            method: "POST",
            body: "["+checkIdSend+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 202) {
            setId("")
            alert("Radar Track Sended");
            window.location.reload();
          } else {
            setId("")
            setMessage("Some error occured");
            window.location.reload();
          }
    }

    // HANDLER SEND RADAR TRACK SAVE AND SEND
    let handlerSendTrackSaveAndSend = async (e) => {
        let resSend= await fetch(`http://localhost:8080/radar/sendtrack`, {
            method: "POST",
            body: "["+id+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 200) {
            alert("Radar Track Sended");
            window.location.reload();
            } else {
            setMessage("Some error occured");
            window.location.reload();
            }
    }

    // HANDLER CANCEL
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
        $selectEnvironment.value = "";
        setCount("")
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

    // HANDLER GET DEFAULT
    const handlerGetDefault=(event)=>{
        if(trackInput === "single" && trackMode === "manual"){
            var now = new Date();
            const $selectEnvironment = document.getElementById('er');
            $selectEnvironment.value = "1";
            const $selectMode4Code = document.getElementById('mode4');
            $selectMode4Code.value = "1";
            const $selectMode5Code = document.getElementById('mode5');
            $selectMode5Code.value = "1";

            if(statusRadio == 1){
                setLongitude(0)
            setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
            setCourse(0)
            setSpeed(0)
            setAltitude(0)
            setMode1Code(0)
            setMode2Code(0)
            setMode3Code(0)
            setMode4Code("")
            setMode5Code("")
    
        } else if(trackInput === "single" && trackMode === "automatic"){
            var now = new Date();
            const $selectEnvironment = document.getElementById('er');
            $selectEnvironment.value = "1";
            const $selectMode4Code = document.getElementById('mode4');
            $selectMode4Code.value = "1";
            const $selectMode5Code = document.getElementById('mode5');
            $selectMode5Code.value = "1";
            if(statusRadio == 1){
                setLongitude(0)
            setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
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
            setMode1Code(0)
            setMode2Code(0)
            setMode3Code(0)
            setMode4Code(0)
            setMode5Code(0)
        } else if(trackInput === "multi" && trackMode === "manual"){
            var now = new Date();
            const $selectEnvironment = document.getElementById('er');
            $selectEnvironment.value = "1";
            const $selectMode4Code = document.getElementById('mode4');
            $selectMode4Code.value = "1";
            const $selectMode5Code = document.getElementById('mode5');
            $selectMode5Code.value = "1";
            if(statusRadio == 1){
                setLongitude(0)
            setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
            setCount("")
            setCourse(0)
            setSpeed(0)
            setAltitude(0)
            setMode1Code(0)
            setMode2Code(0)
            setMode3Code(0)
            setMode4Code(0)
            setMode5Code(0)
        } else if(trackInput === "multi" && trackMode === "automatic"){
            
        }
        
    }


    return (
    <div className="main-container">   
        <label className="label">RADAR TRACK LIST INFO</label>
        <div className="track-info">
            <div className="track-list">
                <div className="table-wrapper">
                    <table className="scrolldown"  >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Track ID</th>
                                <th>Track Mode</th>
                                <th>Environment</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Last Time Update</th>
                                <th>Status</th>
                                <th>Action</th>  
                                <th><input type="checkbox" name="allselect" checked= { !RadarData.some( (radar)=>radar?.isChecked!==true)} onChange={handleChange} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                    RadarData.map( (d,i)=>(
                                    <tr key={i}>
                                        
                                        <td>{i}</td>
                                        <td>{d.id}</td>
                                        <td>{d.trackMode}</td>
                                        <td>{enumEnvironment[d.environment]}</td>
                                        <td>{d.startTime}</td>
                                        <td>{d.endTime}</td>
                                        <td>{d.lastSend}</td>
                                        <td>{d.status}</td>
                                        <td>
                                            {/* <button className="btn btn-sm btn-info me-2">Detail</button> */}
                                            <button className="btn btn-sm btn-primary me-2" id={d.id} onClick={handleGetUpdateRadarTrack}>Edit</button>
                                            {/* <button className="btn btn-sm btn-danger">Delete</button> */}
                                        </td> 
                                        <td className="select"><input type="checkbox" name={d.id}  checked={d?.isChecked || false} onChange={ handleChange }/> </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                    <button className="btn btn-primary mt-2" onClick={handlerGetIdSendTrack}>SEND</button>
                    {/* <button className="btn btn-info mt-2" onClick={handleSetChecked}>COBA</button> */}
                    <button className="btn btn-danger mt-2" onClick={handlerGetIdStopTrack}>STOP</button>
                    <div className="btn-delete">
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
                    </div>
                    </div>
        </div>


        <div className="container-list">
        <label className="label">DATA SETTING</label>
            <div className="track-list-1">
                <div className="data-setting">
                    <table className="table-input">
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
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
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
                                        <option value="">-- Pilih --</option>
                                        <option value="1">Air</option>
                                        <option value="2">Surface</option>
                                        <option value="3">Subsurface</option>
                                        <option value="4">Land</option>
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
                                <td>id:{id}, radio:{statusRadio}, status:{edit} test:{checkIdDelete} -- </td>
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
                                <td>Track Mode : {checkTrackMode}</td>
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
                                <td><input type="radio" className="radio" id="radio1" name="radio1" onClick={handlerRadio1}  disabled={(trackInput === "" || trackMode ==="")} checked={statusRadio === 1}/></td>
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
                                <td colSpan={3}></td>
                            </tr>

                            <tr  className="radio-box-bottom">
                                <td><input type="radio" className="radio" id="radio2" name="radio2"  onClick={handlerRadio2} disabled={((trackInput === "" || trackMode === "") ? true : false)} checked={statusRadio === 2}/></td>
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
                                <td colSpan={3}></td>
                            
                            </tr>

                            <tr>
                                <td></td>
                                <td>IFF Data</td>
                                <td colSpan={6}></td>
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
                                    <select name="environment-radio" class="form-input" id="mode5" onChange={(e) => setMode5Code(e.target.value)} disabled>
                                        <option value="">-- Pilih --</option>
                                        <option value="0">Not Interogated</option>
                                        <option value="1">Valid Response</option>
                                        <option value="2">No Respose</option>
                                        <option value="3">Invalid</option>
                                    </select>
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
                                    <select name="mode4" class="form-input" id="mode4" onChange={(e) => setMode4Code(e.target.value)} disabled>
                                        <option value="">-- Pilih --</option>
                                        <option value="0">Not Interogated</option>
                                        <option value="1">Valid Response</option>
                                        <option value="2">No Respose</option>
                                        <option value="3">Invalid</option>
                                    </select>
                                </td>
                                <td colSpan={3}></td>
                            </tr>
            
                        </table>
                </div>
            </div>
            <button type="submit" className="btn btn-info mt-2" onClick={handlerGetDefault} >GET DEFAULT</button>
            <Button variant="btn btn-success mt-2" onClick={handlerValidasiInput}>
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

            <Button variant="btn btn-primary mt-2" onClick={handlerValidasiInputSaveAndSendUpdate} disabled={((checkTrackMode === "automatic")? true: false)}>
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
                    <Button variant="primary" onClick={handlerSaveAndSendTrack}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <button type="submit" className="btn btn-warning mt-2" onClick={handlerCancel}>CANCEL</button>
        </div>
    </div>
  
    );
}

export default RadarHome; 