import  Axios  from "axios"
import React, { useEffect, useState } from "react"

import axios from "axios";
import DataTable from "react-data-table-component";
import { Alert } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ADSBHome = (props) => {

    const [ADSBData, setADSBData] = useState([]);
    const [statusRadio, setStatusRadio] = useState(1);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Saved");
    const [lastSend, setLastSend] = useState("");
    const [trackMode, setTrackMode] = useState("");
    const [course, setCourse] = useState("");
    const [speed, setSpeed] = useState("");
    const [altitude, setAltitude] = useState("");
    const [courseRangeMin, setCourseRangeMin] = useState();
    const [courseRangeMax, setCourseRangeMax] = useState();
    const [courseIncrement, setCourseIncrement] = useState();
    const [latitude, setLatitude] = useState("");
    const [bearing, setBearing] = useState("");
    const [trackInput, setTrackInput] = useState("");
    const [startTime, setStartTime] = useState("-");
    const [speedRangeMin, setSpeedRangeMin] = useState("");
    const [speedRangeMax, setSpeedRangeMax] = useState("");
    const [speedIncrement, setSpeedIncrement] = useState("");
    const [longitude, setLongitude] = useState("");
    const [distance, setDistance] = useState("");
    const [count, setCount] = useState("");
    const [altitudeRangeMin, setAltitudeRangeMin] = useState();
    const [altitudeRangeMax, setAltitudeRangeMax] = useState();
    const [altitudeIncrement, setAltitudeIncrement] = useState();
    const [endTime, setEndTime] = useState("-");

    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [icao, SetIcao] = useState("");
    const [heading, setHeading] = useState("");
    const [callSign, setCallSign] = useState("");
    const [verticalRate, setVerticalRate] = useState("");

    const checkIdSend=[];
    const checkIdDelete=[];
    const checkIdStop=[];
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState("");
    const [checkTrackMode, setCheckTrackMode] = useState("");

    // POP UP DELETE ASDB TRACK
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete= () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    // POP UP SAVE ASDB TRACK
    const [showSave, setShowSave] = useState(false);
    const handleCloseSave= () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);

    // POP UP SAVE AND SEND ASDB TRACK
    const [showSaveAndSend, setShowSaveAndSend] = useState(false);
    const handleCloseSaveAndSend= () => setShowSaveAndSend(false);
    const handleShowSaveAndSend = () => setShowSaveAndSend(true);


    // HANDLER RADIO 1 LATITUDE & LONGITUDE ASDB TRACK ##
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
    
    // HANDLER RADIO 2 DISTANCE & BEARING ASDB TRACK ##
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

    // REQUEST GET DATA ASDB TRACK ##
    const getADSBData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/adsb');
        setADSBData(response.data)
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
            getADSBData();
    }, [])
    
    // HANDLER VALIDASI INPUT SEND **
    let handlerValidasiInput = async (e) => {
        if(edit === "edit"){
            handlerValidasiUpdateTrack();
        } else {
            handlerValidasiSaveTrack();
        }
    }

    // REQUEST POST SAVE ADSB TRACK ##
    let dataSave = async (e) => {
        let resSend= await fetch("http://localhost:8080/adsb", {
            method: "POST",
            body: JSON.stringify({
                status: status,
                lastSend:lastSend,
                trackInput: trackInput,
                trackMode: trackMode,
                count: count,
                startTime: startTime,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                altitude: altitude,
                altitudeRangeMin: altitudeRangeMin,
                altitudeRangeMax: altitudeRangeMax,
                altitudeIncrement: altitudeIncrement,
                longitude: longitude,
                latitude: latitude,
                bearing: bearing,
                distance: distance,
                country: country,
                icao: icao,
                callSign: callSign,
                position: position,
                heading: heading,
                verticalRate: verticalRate
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            alert("Save ADSB Track success");
          } else {
            alert("Some error occured");
          }
        window.location.reload();
    }

    // HANDLER SAVE ASDB TRACK  ##
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

    // HANDLER VALIDASI SAVE ADSB TRACK ##
    let handlerValidasiSaveTrack = async (e) => {
        e.preventDefault();
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === ""  || altitudeIncrement === ""  || altitudeRangeMin === ""  || altitudeRangeMax === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(count === "" || course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === ""){
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

    // HANDLER VALIDASI SAVE ADSB UPDATE TRACK ##
    let handlerValidasiUpdateTrack = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === ""  || altitudeIncrement === ""  || altitudeRangeMin === ""  || altitudeRangeMax === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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

    // REQUEST POST SAVE AND SEND ADSB TRACK ##
    let dataSaveAndSend = async (e) => {
        let resSend= await fetch("http://localhost:8080/adsb/saveandsend", {
            method: "POST",
            body: JSON.stringify({
                status: status,
                lastSend:lastSend,
                trackInput: trackInput,
                trackMode: trackMode,
                count: count,
                startTime: startTime,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                altitude: altitude,
                altitudeRangeMin: altitudeRangeMin,
                altitudeRangeMax: altitudeRangeMax,
                altitudeIncrement: altitudeIncrement,
                longitude: longitude,
                latitude: latitude,
                bearing: bearing,
                distance: distance,
                country: country,
                icao: icao,
                callSign: callSign,
                position: position,
                heading: heading,
                verticalRate: verticalRate
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            alert("Save and Send ADSB Track success");
          } else {
            alert("Some error occured");
          }
        window.location.reload();   
    }

    // Function Request PUT Update Data ADSB TRACK SAVE AND SEND  ##
    let dataUpdateSaveAndSend = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/adsb/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                status: status,
                lastSend:lastSend,
                trackInput: trackInput,
                trackMode: trackMode,
                count: count,
                startTime: startTime,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                altitude: altitude,
                altitudeRangeMin: altitudeRangeMin,
                altitudeRangeMax: altitudeRangeMax,
                altitudeIncrement: altitudeIncrement,
                longitude: longitude,
                latitude: latitude,
                bearing: bearing,
                distance: distance,
                country: country,
                icao: icao,
                callSign: callSign,
                position: position,
                heading: heading,
                verticalRate: verticalRate
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resUpdate.status === 200) {
            handlerSendTrackSaveAndSend();
            alert("ASDB Track Updated");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
        window.location.reload();
    }

    // HANDLER VALIDASI INPUT SAVE AND SEND UPDATE ##
    let handlerValidasiInputSaveAndSendUpdate = async (e) => {
        if(edit === "edit"){
            handlerValidasiSaveAndSendTrackUpdate();
        } else {
            handlerValidasiSaveAndSendTrack();
        }
    }

    // HANDLER SAVE AND SEND ASDB TRACK ##
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

    // HANDLER VALIDASI SAVE AND SEND ADSB TRACK ##
    let handlerValidasiSaveAndSendTrack = async (e) => {
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === ""  || altitudeIncrement === ""  || altitudeRangeMin === ""  || altitudeRangeMax === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(count === "" || course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === ""){
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

    // HANDLER VALIDASI SAVE AND SEND ADSB TRACK UPDATE ##
    let handlerValidasiSaveAndSendTrackUpdate = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(course === "" || speed === "" || altitude === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || altitude === ""  || altitudeIncrement === ""  || altitudeRangeMin === ""  || altitudeRangeMax === "" || country === "" || position === "" || icao === "" || heading === "" || callSign === "" || verticalRate === "" ){
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

    // HANDLER SEND ADSB TRACK SAVE AND SEND
    let handlerSendTrackSaveAndSend = async (e) => {
        let resSend= await fetch(`http://localhost:8080/adsb/sendtrack`, {
            method: "POST",
            body: "["+id+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 200) {
            alert("ADSB Track Sended");
            window.location.reload();
            } else {
            setMessage("Some error occured");
            window.location.reload();
            }
    }

    // HANDLER CHANGE SELECTED ADSB TRACK ##
    const handleChange=(e)=>{
        const {name, checked}= e.target;
        if(name==="allselect")
        {
            const checkedvalue = ADSBData.map( (adsb)=>{ return {...adsb, isChecked:checked}});
            console.log(checkedvalue);
            setADSBData(checkedvalue);
        } else {
            const checkedvalue= ADSBData.map( (adsb)=>
            adsb.id ===parseInt(name)? {...adsb, isChecked:checked}:adsb);
            console.log(checkedvalue);
            setADSBData(checkedvalue);
        }
    }
   
    // HANDLER GET DELETED ID ADSB TRACK ##
    const handlerGetIdDeleteTrack = async (id) => {
        try {               
            for(let i=0; i < ADSBData.length; i++){
                if(ADSBData[i].isChecked===true){            
                    checkIdDelete.push(ADSBData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }
        if(checkIdDelete.length > 0){
            handleShowDelete();
        } else {
            alert("Pilih ADSB Track yg akan dihapus")
        }
    }

    // HANDLER DELETE ALL ADSB TRACK BY ID CHECKED ##
    let handlerDeleteTrack = async (e) => {
        try {               
            for(let i=0; i < ADSBData.length; i++){
                if(ADSBData[i].isChecked===true){            
                    checkIdDelete.push(ADSBData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }

        let resDelete= await fetch(`http://localhost:8080/adsb/deleteall`, {
            method: "DELETE",
            body: "["+checkIdDelete+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        
        if (resDelete.status === 204) {
            alert("ADSB Track Deleted");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
          handleCloseDelete(true)
    }   

    // HANDLER TRACK INPUT CHANGE ADSB TRACK ##
    const handleTrackInput=(event)=>{
        setTrackInput(event.target.value)
        var Tinput = event.target.value
        var status = "change"
        document.getElementById("tmr").disabled = false;
        document.getElementById("radio1").disabled = true;
        document.getElementById("radio2").disabled = true;
        disableFormInput(Tinput, trackMode, status)
    }

    // HANDLER TRACK MODE CHANGE ADSB TRACK ##
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "change"
        disableFormInput(trackInput, Tmode, status)
    }

    // DISABLED INPUT MANUAL ADSB TRACK ##
    const formManualTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
        document.getElementById("tmr").disabled = false;
        document.getElementById("course").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("altitude").disabled = false;
        document.getElementById("latitude").disabled = false;
        document.getElementById("longitude").disabled = false;
        document.getElementById("country").disabled = false;
        document.getElementById("position").disabled = false;
        document.getElementById("heading").disabled = false;
        document.getElementById("icao").disabled = false;
        document.getElementById("call-sign").disabled = false;
        document.getElementById("vertical-rate").disabled = false;

        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("altitude").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("country").style.backgroundColor = 'white';
        document.getElementById("position").style.backgroundColor = 'white';
        document.getElementById("heading").style.backgroundColor = 'white';
        document.getElementById("icao").style.backgroundColor = 'white';
        document.getElementById("call-sign").style.backgroundColor = 'white';
        document.getElementById("vertical-rate").style.backgroundColor = 'white';
   
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

    // DISABLED INPUT AUTOMATIC ADSB TRACK ##
    const formAutomaticTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
        document.getElementById("tmr").disabled = false;
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
        document.getElementById("country").disabled = false;
        document.getElementById("position").disabled = false;
        document.getElementById("heading").disabled = false;
        document.getElementById("icao").disabled = false;
        document.getElementById("call-sign").disabled = false;
        document.getElementById("vertical-rate").disabled = false;

        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
        document.getElementById("tmr").style.backgroundColor = 'white';
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
        document.getElementById("country").style.backgroundColor = 'white';
        document.getElementById("position").style.backgroundColor = 'white';
        document.getElementById("heading").style.backgroundColor = 'white';
        document.getElementById("icao").style.backgroundColor = 'white';
        document.getElementById("call-sign").style.backgroundColor = 'white';
        document.getElementById("vertical-rate").style.backgroundColor = 'white';
    }

    // DISABLED ALL INPUT ADSB TRACK FORM ##
    const disableAllInput = () => {
        document.getElementById("count").disabled = true;
        document.getElementById("count").style.backgroundColor = '#696978';
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
        document.getElementById("altitude-range-min").disabled = true;
        document.getElementById("altitude-range-min").style.backgroundColor = '#696978';
        document.getElementById("altitude-range-max").disabled = true;
        document.getElementById("altitude-range-max").style.backgroundColor = '#696978';
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
        document.getElementById("country").disabled = true;
        document.getElementById("country").style.backgroundColor = '#696978';
        document.getElementById("position").disabled = true;
        document.getElementById("position").style.backgroundColor = '#696978';
        document.getElementById("icao").disabled = true;
        document.getElementById("icao").style.backgroundColor = '#696978';
        document.getElementById("heading").disabled = true;
        document.getElementById("heading").style.backgroundColor = '#696978';
        document.getElementById("call-sign").disabled = true;
        document.getElementById("call-sign").style.backgroundColor = '#696978';
        document.getElementById("vertical-rate").disabled = true;
        document.getElementById("vertical-rate").style.backgroundColor = '#696978';
    }

    // DISABLED FORM INPUT ADSB TRACK ##
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
                
                const $selectCountry = document.getElementById('country');
                $selectCountry.value = "-";
                const $selectPosition = document.getElementById('position');
                $selectPosition.value = "-";
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
                setCountry("");
                setPosition("");
                SetIcao("");
                setHeading("");
                setCallSign("");
                setVerticalRate("");

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
   
    // REQUEST GET UPDATE ADSB TRACK ##
    const handleGetUpdateADSBTrack = async (e) => {

        const {id, checked}= e.target;
        var item = ADSBData.find(x => x.id === parseInt(id));
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = item.trackMode;
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = item.trackInput;
        const $selectCountry = document.getElementById('country');
        $selectCountry.value = item.country;
        const $selectPosition = document.getElementById('position');
        $selectPosition.value = item.position;
        setTrackInput(item.trackInput)
        setTrackMode(item.trackMode)
        setCheckTrackMode(item.trackMode)
        setCount(item.count)
        setStartTime(item.startTime)
        setEndTime(item.endTime)
        setCourse(item.course)
        setCourseRangeMin(item.courseRangeMin)
        setCourseRangeMax(item.courseRangeMax)
        setSpeedRangeMin(item.speedRangeMin)
        setSpeedRangeMax(item.speedRangeMax)
        setAltitudeRangeMin(item.altitudeRangeMin)
        setAltitudeRangeMax(item.altitudeRangeMax)
        setCourseIncrement(item.courseIncrement)
        setSpeedIncrement(item.speedIncrement)
        setAltitudeIncrement(item.altitudeIncrement)
        setAltitude(item.altitude)
        setLatitude(item.latitude)
        setLongitude(item.longitude)
        setBearing(item.bearing)
        setDistance(item.distance)
        setId(item.id)
        setSpeed(item.speed)
        setCountry(item.country)
        setPosition(item.position)
        SetIcao(item.icao)
        setHeading(item.heading)
        setCallSign(item.callSign)
        setVerticalRate(item.verticalRate)
        console.log(item)
        var getEdit="edit";
        setEdit("edit")
        var bearing1 = item.bearing;
        var getDistance = item.distance;
        disableFormInput(item.trackInput, item.trackMode, getEdit, bearing1, getDistance)
    }

    // Function Request PUT Update Data ADSB TRACK  ##
    let dataUpdate = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/adsb/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                status: status,
                lastSend:lastSend,
                trackInput: trackInput,
                trackMode: trackMode,
                count: count,
                startTime: startTime,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                altitude: altitude,
                altitudeRangeMin: altitudeRangeMin,
                altitudeRangeMax: altitudeRangeMax,
                altitudeIncrement: altitudeIncrement,
                longitude: longitude,
                latitude: latitude,
                bearing: bearing,
                distance: distance,
                country: country,
                icao: icao,
                callSign: callSign,
                position: position,
                heading: heading,
                verticalRate: verticalRate
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resUpdate.status === 200) {
            alert("ASDB Track Updated");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
        window.location.reload();
    }

    // HANDLER SEND STOP ADSB TRACK ##
    let handlerStopTrack = async (e) => {
        let resStop= await fetch(`http://localhost:8080/adsb/stoptrack`, {
            method: "POST",
            body: "["+checkIdStop+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resStop.status === 202) {
            alert("ADSB Track Stopped");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
    } 

    // HANDLER GET ID STOP ADSB TRACK ##
    const handlerGetIdStopTrack = async (id) => {
        try {              
            for(let i=0; i < ADSBData.length; i++){
                if(ADSBData[i].isChecked===true){            
                    checkIdStop.push(ADSBData[i].id);                           
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

    // HANDLER GET ID SEND ADSB TRACK ##
    const handlerGetIdSendTrack = async (id) => {
            try {    
                for(let i=0; i < ADSBData.length; i++){
                    if(ADSBData[i].isChecked===true){            
                        checkIdSend.push(ADSBData[i].id);                           
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

    // HANDLER SEND ADSB TRACK ##
    let handlerSendTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/adsb/sendtrack`, {
            method: "POST",
            body: "["+checkIdSend+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 202) {
            alert("ADSB Track Sended");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
    }

    // HANDLER CANCEL ADSB TRACK
    const handlerCancel=(event)=>{

        setEdit("change")
        var Tinput = "-"
        var Tmode = "-"
        document.getElementById("ti").disabled = false;
        document.getElementById("ti").style.backgroundColor = 'white';
        document.getElementById("tmr").disabled = true;
        const $selectCountry = document.getElementById('country');
        $selectCountry.value = "";
        const $selectPosition = document.getElementById('position');
        $selectPosition.value = "";
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = "-";
        setTrackInput("")
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = "-";
        setTrackMode("")
        setStatus("Saved")
        setCount("")
        setStartTime("-")
        setEndTime("-")
        setCourse("")
        setSpeed("")
        setAltitude("");
        setCourseRangeMin("")
        setCourseRangeMax("")
        setCourseIncrement("")
        setSpeedRangeMin("")
        setSpeedRangeMax("")
        setSpeedIncrement("")
        setAltitudeRangeMin("");
        setAltitudeRangeMax("");
        setAltitudeIncrement("");
        setLongitude("")
        setLatitude("")
        setBearing("")
        setDistance("")
        setCountry("");
        setPosition("");
        SetIcao("");
        setHeading("");
        setCallSign("");
        setVerticalRate("");
        disableFormInput(Tinput, Tmode, status)
    }

    // HANDLER GET DEFAULT ADSB TRACK
    const handlerGetDefault=(event)=>{
        if(trackInput === "single" && trackMode === "manual"){
            const $selectCountry = document.getElementById('country');
            $selectCountry.value = "IND";
            const $selectPosition = document.getElementById('position');
            $selectPosition.value = "1";
            if(statusRadio == 1){
                setLongitude(0)
                setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
            setCountry("IND")
            setPosition("1")
            setCourse(0)
            setSpeed(0)
            setAltitude(0)
            SetIcao(0)
            setHeading(0)
            setCallSign("NS")
            setVerticalRate(0)
    
        } else if(trackInput === "single" && trackMode === "automatic"){
            const $selectCountry = document.getElementById('country');
            $selectCountry.value = "IND";
            const $selectPosition = document.getElementById('position');
            $selectPosition.value = "1";
            if(statusRadio == 1){
                setLongitude(0)
                setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
            setCountry("IND")
            setPosition("1")
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
            SetIcao(0)
            setHeading(0)
            setCallSign("NS")
            setVerticalRate(0)

        } else if(trackInput === "multi" && trackMode === "manual"){
            const $selectCountry = document.getElementById('country');
            $selectCountry.value = "1";
            const $selectPosition = document.getElementById('position');
            $selectPosition.value = "1";
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
            SetIcao(0)
            setHeading(0)
            setCallSign("")
            setVerticalRate(0)
        } else if(trackInput === "multi" && trackMode === "automatic"){
            
        }
        
    }


    return (
    <div className="main-container">   
        <label className="label">ADSB TRACK LIST INFO</label>
        <div className="track-info">
            <div className="track-list">
                <div className="table-wrapper">
                    <table className="scrolldown" >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Track Mode</th>
                                <th>ICAO</th>
                                <th>ADSB Name</th>
                                <th>Call Sign</th>
                                <th>Stat Time</th>
                                <th>End Time</th>
                                <th>Last Update Time</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th><input type="checkbox" name="allselect" checked= { !ADSBData.some( (adsb)=>adsb?.isChecked!==true)} onChange={handleChange} /></th>
                            </tr>
                        </thead>
                        <tbody>
                        {

                            ADSBData.map( (d,i)=>(
                                <tr key={i}> 
                                    <td>{d.id}</td>
                                    <td>{d.trackMode}</td>
                                    <td>{d.icao}</td>
                                    <td>{d.country}</td>
                                    <td>{d.callSign}</td>
                                    <td>{d.startTime}</td>
                                    <td>{d.endTime}</td>
                                    <td>{d.lastSend}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        {/* <button className="btn btn-sm btn-info me-2">Detail</button> */}
                                        <button className="btn btn-sm btn-primary me-2" id={d.id} onClick={handleGetUpdateADSBTrack}>Edit</button>
                                        {/* <button className="btn btn-sm btn-danger">Delete</button> */}
                                    </td>
                                    <td className="select"><input type="checkbox" name={d.id}  checked={d?.isChecked || false } onChange={ handleChange }/> </td>
                                </tr>
                            ))
                        }
                          
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary mt-2" onClick={handlerGetIdSendTrack}>SEND</button>
                {/* <button className="btn btn-info mt-2" onClick={handlerGetIdSendTrack}>START</button> */}
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
                    <table className="table-input"  >
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
                            <td><input 
                                type="number" 
                                id="count"
                                name="count"
                                placeholder="Count"
                                class="form-input"
                                value={count}
                                onChange={(e) => setCount(e.target.value)} disabled>
                                </input>
                            </td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
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
                            <td></td>
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
                                <td> Altitude Increment </td> 
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
                            <td>Country</td>
                            <td>             
                                <select name="country"  class="form-input" id="country" onChange={(e) => setCountry(e.target.value)} disabled>
                                    <option value="">-- Pilih --</option>
                                    <option value="IND">IND</option>
                                    <option value="MY">MY</option>
                                    <option value="USA">USA</option>
                                </select>
                            </td>
                            <td>Position</td>
                            <td>             
                                <select name="position" class="form-input" id="position" onChange={(e) => setPosition(e.target.value)} disabled>
                                    <option value="">-- Pilih --</option>
                                    <option value="0">Ground</option>
                                    <option value="1">Air</option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>ICAO</td>
                            <td>
                                <input 
                                type="number" 
                                id="icao"
                                name="icao"
                                placeholder="ICAO"
                                class="form-input"
                                value={icao}
                                onChange={(e) => SetIcao(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>Heading</td>
                            <td>             
                                <input 
                                type="number" 
                                id="heading"
                                name="heading"
                                placeholder="heading"
                                class="form-input"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)} disabled>
                                </input>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>Flight/Call Sign</td>
                            <td>
                                <input 
                                type="text" 
                                id="call-sign"
                                name="call-sign"
                                placeholder="Flight/Call Sign"
                                class="form-input"
                                value={callSign}
                                onChange={(e) => setCallSign(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>Vertical Rate</td>
                            <td>             
                                <input 
                                type="number" 
                                id="vertical-rate"
                                name="vertical-rate"
                                placeholder="Vertical Rate"
                                class="form-input"
                                value={verticalRate}
                                onChange={(e) => setVerticalRate(e.target.value)} disabled>
                                </input>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                     </table>
                </div>
            </div>
            <button type="submit" className="btn btn-info mt-2" onClick={handlerGetDefault} >GET DEFAULT</button>
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

export default ADSBHome; 