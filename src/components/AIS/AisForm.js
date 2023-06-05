import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './AisHome.css';
import axios from "axios";
import DataTable from "react-data-table-component";
import { Alert } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AISHome = (props) => {

    const [AISData, setaISData] = useState([]);
    const [statusRadio, setStatusRadio] = useState(1);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Saved");
    const [lastSend, setLastSend] = useState("");
    const [time, setTime] = useState("Time");
    const [trackMode, setTrackMode] = useState("");
    const [course, setCourse] = useState("");
    const [speed, setSpeed] = useState("");
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
    const [endTime, setEndTime] = useState("-");

    const [mmsiNumber, setMmsiNumber] = useState("");
    const [aisName, setAisName] = useState("");
    const [aisType, setAisType] = useState("");
    const [shipCallSign, setShipCallSign] = useState("");
    const [imoNumber, setImoNumber] = useState("");
    const [eta, setEta] = useState("");
    const [navStatus, setNavStatus] = useState("");
    const [rateOfTurn, setRateOfTurn] = useState("");
    const [dimensionsA, setDimensionsA] = useState("");
    const [dimensionsB, setDimensionsB] = useState("");
    const [dimensionsC, setDimensionsC] = useState("");
    const [dimensionsD, setDimensionsD] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [destination, setDestination] = useState("");

    const checkIdSend=[];
    const checkIdDelete=[];
    const checkIdStop=[];
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState("");
    const [checkTrackMode, setCheckTrackMode] = useState("");

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

    const enumNavStatus = {
        0: "Nav Status 1",
        1: "Nav Status 2",
        2: "Nav Status 3",
        3: "Nav Status 4"
    }

    const enumAisType = {
        1: "AIS Type 1",
        2: "AIS Type 2",
        3: "AIS Type 3"
    }


    // HANDLER RADIO 1 LATITUDE & LONGITUDE AIS TRACK **
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
    
    // HANDLER RADIO 2 DISTANCE & BEARING AIS TRACK **
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

    // REQUEST GET DATA AIS TRACK ==
    const getaISData = async () => {
        try{
        const response = await Axios.get('http://localhost:8080/ais');
        setaISData(response.data)
        } catch(e){
        console.log(e.message)
        }
    }

    useEffect(() => {
            getaISData();
    }, [])
    
    // REQUEST POST SAVE AIS TRACK **
    let dataSave = async (e) => {
        let resSend= await fetch("http://localhost:8080/ais", {
            method: "POST",
            body: JSON.stringify({
                status: status,
                lastSend: lastSend,
                trackInput: trackInput,
                startTime: startTime,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                latitude: latitude,
                bearing: bearing,
                mmsiNumber: mmsiNumber,
                aisName: aisName,
                aisType: aisType,
                shipCallSign: shipCallSign,
                trackMode: trackMode,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                longitude: longitude,
                distance: distance,
                imoNumber: imoNumber,
                eta: eta,
                navigationStatus: navStatus,
                rateOfTurn: rateOfTurn,
                dimensionsA: dimensionsA,
                dimensionsB: dimensionsB,
                dimensionsC: dimensionsC,
                dimensionsD: dimensionsD,
                vendorId: vendorId,
                destination: destination,
                count: count
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            alert("Save AIS Track success");
        } else {
            alert("Some error occured");
        }
        window.location.reload();
    }
    
    // REQUEST POST SAVE AND SEND AIS TRACK **
    let dataSaveAndSend = async (e) => {
        let resSend= await fetch("http://localhost:8080/ais/saveandsend", {
            method: "POST",
            body: JSON.stringify({
                
                status: status,
                lastSend: lastSend,
                trackInput: trackInput,
                startTime: startTime,
                course: course,
                courseRangeMin: courseRangeMin,
                courseRangeMax: courseRangeMax,
                courseIncrement: courseIncrement,
                latitude: latitude,
                bearing: bearing,
                mmsiNumber: mmsiNumber,
                aisName: aisName,
                aisType: aisType,
                shipCallSign: shipCallSign,
                trackMode: trackMode,
                endTime: endTime,
                speed: speed,
                speedRangeMin: speedRangeMin,
                speedRangeMax: speedRangeMax,
                speedIncrement: speedIncrement,
                longitude: longitude,
                distance: distance,
                imoNumber: imoNumber,
                eta: eta,
                navigationStatus: navStatus,
                rateOfTurn: rateOfTurn,
                dimensionsA: dimensionsA,
                dimensionsB: dimensionsB,
                dimensionsC: dimensionsC,
                dimensionsD: dimensionsD,
                vendorId: vendorId,
                destination: destination,
                count: count
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resSend.status === 201) {
            alert("Save and Send AIS Track success");
          } else {
            alert("Some error occured");
          }
        window.location.reload();   
    }

    // Function Request PUT Update Data AIS TRACK **
    let dataUpdate = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/ais/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id:id,
                status: status,
                count:count,
                lastSend: lastSend,
                trackInput:trackInput,
                course:course,
                speed:speed,
                trackMode: trackMode,
                courseRangeMin:courseRangeMin,
                courseRangeMax:courseRangeMax,
                courseIncrement:courseIncrement,
                latitude:latitude,
                bearing:bearing,
                startTime:startTime,
                speedRangeMin:speedRangeMin,
                speedRangeMax:speedRangeMax,
                speedIncrement:speedIncrement,
                longitude:longitude,
                distance:distance,
                endTime:endTime,
                mmsiNumber:mmsiNumber,
                aisName:aisName,
                aisType:aisType,
                shipCallSign:shipCallSign,
                imoNumber:imoNumber,
                eta:eta,
                navigationStatus:navStatus,
                rateOfTurn:rateOfTurn,
                dimensionsA:dimensionsA,
                dimensionsB:dimensionsB,
                dimensionsC:dimensionsC,
                dimensionsD:dimensionsD,
                vendorId:vendorId,
                destination:destination 
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resUpdate.status === 200) {
            alert("AIS Track Updated");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
        window.location.reload();
    }

    // Function Request PUT Update Data AIS TRACK SAVE AND SEND**
    let dataUpdateSaveAndSend = async (e) => {
        let resUpdate= await fetch(`http://localhost:8080/ais/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id:id,
                status: status,
                count:count,
                lastSend: lastSend,
                trackInput:trackInput,
                course:course,
                speed:speed,
                trackMode: trackMode,
                courseRangeMin:courseRangeMin,
                courseRangeMax:courseRangeMax,
                courseIncrement:courseIncrement,
                latitude:latitude,
                bearing:bearing,
                startTime:startTime,
                speedRangeMin:speedRangeMin,
                speedRangeMax:speedRangeMax,
                speedIncrement:speedIncrement,
                longitude:longitude,
                distance:distance,
                endTime:endTime,
                mmsiNumber:mmsiNumber,
                aisName:aisName,
                aisType:aisType,
                shipCallSign:shipCallSign,
                imoNumber:imoNumber,
                eta:eta,
                navigationStatus:navStatus,
                rateOfTurn:rateOfTurn,
                dimensionsA:dimensionsA,
                dimensionsB:dimensionsB,
                dimensionsC:dimensionsC,
                dimensionsD:dimensionsD,
                vendorId:vendorId,
                destination:destination 
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });

        if (resUpdate.status === 200) {
            handlerSendTrackSaveAndSend();
            alert("AIS Track Updated");
            window.location.reload();
            } else {
            setMessage("Some error occured");
            window.location.reload();
            }
        window.location.reload();
    }
        
    // HANDLER SAVE AIS TRACK **
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

    // HANDLER SAVE AND SEND AIS TRACK **
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

    // HANDLER VALIDASI INPUT SAVE AND SEND**
    let handlerValidasiInputSaveAndSend = async (e) => {
        if(edit === "edit"){
            handlerValidasiSaveAndSendTrackUpdate();
        } else {
            handlerValidasiSaveAndSendTrack();
        }
    }

    // HANDLER VALIDASI SAVE AND SEND AIS TRACK **
    let handlerValidasiSaveAndSendTrack = async (e) => {
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi 1 ")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi 1 ")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackInput === "single" && trackMode === "automatic"){
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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
                    if(count === "" || course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi 1")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi 2")
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

    // HANDLER VALIDASI SAVE AND SEND AIS TRACK UPDATE **
    let handlerValidasiSaveAndSendTrackUpdate = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
                        alert("Pastikan semua data sudah terisi")
                    } else {
                        if(statusRadio === 1){
                            if(latitude === "" || longitude === ""){
                                alert("Pastikan semua data sudah terisi 1 ")
                            } else {
                                handleShowSaveAndSend();
                            }
                        } else {
                            if(bearing === "" || distance === ""){
                                alert("Pastikan semua data sudah terisi 1 ")
                            } else {
                                handleShowSaveAndSend();
                            }
                        }
                    }
                } else if(trackMode === "automatic"){
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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

    // HANDLER VALIDASI INPUT SAVE**
    let handlerValidasiInput = async (e) => {
        if(edit === "edit"){
            handlerValidasiUpdateTrack();
        } else {
            handlerValidasiSaveTrack();
        }
    }

    // HANDLER VALIDASI SAVE AIS TRACK **  ======
    let handlerValidasiSaveTrack = async (e) => {
        try {
            if(trackInput === "" || trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackInput === "single" && trackMode === "manual"){
                    if(course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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
                    if(count === "" || course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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

    // HANDLER VALIDASI UPDATE AIS TRACK ** ====
    let handlerValidasiUpdateTrack = async (e) => {
        try {
            if(trackMode === ""){
                alert("Pilih track mode terlebih dahulu")
            } else {
                if(trackMode === "manual"){
                    if(course === "" || speed === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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
                } else if("automatic"){
                    if(course === "" || courseRangeMin === ""|| courseRangeMax === ""|| courseIncrement === ""|| speed === ""|| speedRangeMin === ""|| speedRangeMax === ""|| speedIncrement === "" || mmsiNumber === "" || aisName === "" || aisType === "" || shipCallSign === "" || imoNumber === "" || eta === "" || navStatus === "" || rateOfTurn === "" || dimensionsA === "" || dimensionsB === "" || dimensionsC === "" || dimensionsD === "" || vendorId === "" || destination === ""){
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

    // HANDLER CHANGE SELECTED AIS TRACK **
    const handleChange=(e)=>{
        const {name, checked}= e.target;
        if(name==="allselect")
        {
            const checkedvalue = AISData.map( (ais)=>{ return {...ais, isChecked:checked}});
            console.log(checkedvalue);
            setaISData(checkedvalue);
        } else {
            const checkedvalue= AISData.map( (ais)=>
            ais.id ===parseInt(name)? {...ais, isChecked:checked}:ais);
            console.log(checkedvalue);
            setaISData(checkedvalue);
        }
    }
   
    // HANDLER GET DELETED ID AIS TRACK **
    const handlerGetIdDeleteTrack = async (id) => {
        try {               
            for(let i=0; i < AISData.length; i++){
                if(AISData[i].isChecked===true){            
                    checkIdDelete.push(AISData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }
        if(checkIdDelete.length > 0){
            handleShowDelete();
        } else {
            alert("Pilih AIS Track yg akan dihapus")
        }
    }

    // HANDLER DELETE ALL AIS TRACK BY ID CHECKED **
    let handlerDeleteTrack = async (e) => {
        try {               
            for(let i=0; i < AISData.length; i++){
                if(AISData[i].isChecked===true){            
                    checkIdDelete.push(AISData[i].id);                           
                    console.log(checkIdDelete)
                }
            }        
        } catch (err) {
            console.log(err);
        }

        let resDelete= await fetch(`http://localhost:8080/ais/deleteall`, {
            method: "DELETE",
            body: "["+checkIdDelete+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        
        if (resDelete.status === 204) {
            alert("AIS Track Deleted");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
          handleCloseDelete(true)
    }   

    // HANDLER TRACK INPUT CHANGE AIS TRACK **
    const handleTrackInput=(event)=>{
        setTrackInput(event.target.value)
        var Tinput = event.target.value
        var status = "change"
        document.getElementById("tmr").disabled = false;
        document.getElementById("radio1").disabled = true;
        document.getElementById("radio2").disabled = true;
        disableFormInput(Tinput, trackMode, status)
    }

    // HANDLER TRACK MODE CHANGE AIS TRACK **
    const handleTrackMode=(event)=>{
        setTrackMode(event.target.value)
        var Tmode = event.target.value
        var status = "change"
        disableFormInput(trackInput, Tmode, status)
    }

    // DISABLED INPUT MANUAL AIS TRACK **
    const formManualTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
        document.getElementById("tmr").disabled = false;
        document.getElementById("course").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("latitude").disabled = false;
        document.getElementById("longitude").disabled = false;
        document.getElementById("mmsi-number").disabled = false;
        document.getElementById("imo-number").disabled = false;
        document.getElementById("vendor-id").disabled = false;
        document.getElementById("destination").disabled = false;
        document.getElementById("ais-name").disabled = false;
        document.getElementById("ais-type").disabled = false;
        document.getElementById("ship-call-sign").disabled = false;
        document.getElementById("eta").disabled = false;
        document.getElementById("rate-of-turn").disabled = false;
        document.getElementById("nav-status").disabled = false;
        document.getElementById("dimensions-a").disabled = false;
        document.getElementById("dimensions-b").disabled = false;
        document.getElementById("dimensions-c").disabled = false;
        document.getElementById("dimensions-d").disabled = false;
        
        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("mmsi-number").style.backgroundColor = 'white';
        document.getElementById("imo-number").style.backgroundColor = 'white';
        document.getElementById("vendor-id").style.backgroundColor = 'white';
        document.getElementById("destination").style.backgroundColor = 'white';
        document.getElementById("ais-name").style.backgroundColor = 'white';
        document.getElementById("ais-type").style.backgroundColor = 'white';
        document.getElementById("ship-call-sign").style.backgroundColor = 'white';
        document.getElementById("eta").style.backgroundColor = 'white';
        document.getElementById("rate-of-turn").style.backgroundColor = 'white';
        document.getElementById("nav-status").style.backgroundColor = 'white';
        document.getElementById("dimensions-a").style.backgroundColor = 'white';
        document.getElementById("dimensions-b").style.backgroundColor = 'white';
        document.getElementById("dimensions-c").style.backgroundColor = 'white';
        document.getElementById("dimensions-d").style.backgroundColor = 'white';
        setCount("")
        setStartTime("-")
        setEndTime("-")
        setCourseRangeMin("")
        setCourseRangeMax("")
        setCourseIncrement("")
        setSpeedRangeMin("")
        setSpeedRangeMax("")
        setSpeedIncrement("")
    }

    // DISABLED INPUT AUTOMATIC AIS TRACK **
    const formAutomaticTrackInput = () => {  
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
        document.getElementById("tmr").disabled = false;
        document.getElementById("start-time-input").disabled = false;
        document.getElementById("end-time-input").disabled = false;
        document.getElementById("course").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("course-range-min").disabled = false;
        document.getElementById("course-range-max").disabled = false;
        document.getElementById("speed-range-max").disabled = false;
        document.getElementById("speed-range-min").disabled = false;
        document.getElementById("course-increment").disabled = false;
        document.getElementById("speed-increment").disabled = false;
        document.getElementById("latitude").disabled = false;
        document.getElementById("longitude").disabled = false;
        document.getElementById("mmsi-number").disabled = false;
        document.getElementById("imo-number").disabled = false;
        document.getElementById("vendor-id").disabled = false;
        document.getElementById("destination").disabled = false;
        document.getElementById("ais-name").disabled = false;
        document.getElementById("ais-type").disabled = false;
        document.getElementById("ship-call-sign").disabled = false;
        document.getElementById("eta").disabled = false;
        document.getElementById("rate-of-turn").disabled = false;
        document.getElementById("nav-status").disabled = false;
        document.getElementById("dimensions-a").disabled = false;
        document.getElementById("dimensions-b").disabled = false;
        document.getElementById("dimensions-c").disabled = false;
        document.getElementById("dimensions-d").disabled = false;


        document.getElementById("radio1").style.backgroundColor = 'white';
        document.getElementById("radio2").style.backgroundColor = 'white';
        document.getElementById("tmr").style.backgroundColor = 'white';
        document.getElementById("start-time-input").style.backgroundColor = 'white';
        document.getElementById("end-time-input").style.backgroundColor = 'white';
        document.getElementById("course").style.backgroundColor = 'white';
        document.getElementById("speed").style.backgroundColor = 'white';
        document.getElementById("course-range-min").style.backgroundColor = 'white';
        document.getElementById("course-range-max").style.backgroundColor = 'white';
        document.getElementById("speed-range-max").style.backgroundColor = 'white';
        document.getElementById("speed-range-min").style.backgroundColor = 'white';
        document.getElementById("course-increment").style.backgroundColor = 'white';
        document.getElementById("speed-increment").style.backgroundColor = 'white';
        document.getElementById("latitude").style.backgroundColor = 'white';
        document.getElementById("longitude").style.backgroundColor = 'white';
        document.getElementById("mmsi-number").style.backgroundColor = 'white';
        document.getElementById("imo-number").style.backgroundColor = 'white';
        document.getElementById("vendor-id").style.backgroundColor = 'white';
        document.getElementById("destination").style.backgroundColor = 'white';
        document.getElementById("ais-name").style.backgroundColor = 'white';
        document.getElementById("ais-type").style.backgroundColor = 'white';
        document.getElementById("ship-call-sign").style.backgroundColor = 'white';
        document.getElementById("eta").style.backgroundColor = 'white';
        document.getElementById("rate-of-turn").style.backgroundColor = 'white';
        document.getElementById("nav-status").style.backgroundColor = 'white';
        document.getElementById("dimensions-a").style.backgroundColor = 'white';
        document.getElementById("dimensions-b").style.backgroundColor = 'white';
        document.getElementById("dimensions-c").style.backgroundColor = 'white';
        document.getElementById("dimensions-d").style.backgroundColor = 'white';

    }

    // DISABLED ALL INPUT AIS TRACK FORM **
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
        document.getElementById("course-range-min").disabled = true;
        document.getElementById("course-range-min").style.backgroundColor = '#696978';
        document.getElementById("course-range-max").disabled = true;
        document.getElementById("course-range-max").style.backgroundColor = '#696978';
        document.getElementById("speed-range-max").disabled = true;
        document.getElementById("speed-range-max").style.backgroundColor = '#696978';
        document.getElementById("speed-range-min").disabled = true;
        document.getElementById("speed-range-min").style.backgroundColor = '#696978';
        document.getElementById("course-increment").disabled = true;
        document.getElementById("course-increment").style.backgroundColor = '#696978';
        document.getElementById("speed-increment").disabled = true;
        document.getElementById("speed-increment").style.backgroundColor = '#696978';
        document.getElementById("latitude").disabled = true;
        document.getElementById("latitude").style.backgroundColor = '#696978';
        document.getElementById("longitude").disabled = true;
        document.getElementById("longitude").style.backgroundColor = '#696978';
        document.getElementById("bearing").disabled = true;
        document.getElementById("bearing").style.backgroundColor = '#696978';
        document.getElementById("distance").disabled = true;
        document.getElementById("distance").style.backgroundColor = '#696978';
        document.getElementById("mmsi-number").disabled = true;
        document.getElementById("mmsi-number").style.backgroundColor = '#696978';
        document.getElementById("imo-number").disabled = true;
        document.getElementById("imo-number").style.backgroundColor = '#696978';
        document.getElementById("dimensions-a").disabled = true;
        document.getElementById("dimensions-a").style.backgroundColor = '#696978';
        document.getElementById("vendor-id").disabled = true;
        document.getElementById("vendor-id").style.backgroundColor = '#696978';
        document.getElementById("ais-name").disabled = true;
        document.getElementById("ais-name").style.backgroundColor = '#696978';
        document.getElementById("eta").disabled = true;
        document.getElementById("eta").style.backgroundColor = '#696978';
        document.getElementById("dimensions-b").disabled = true;
        document.getElementById("dimensions-b").style.backgroundColor = '#696978';
        document.getElementById("destination").disabled = true;
        document.getElementById("destination").style.backgroundColor = '#696978';
        document.getElementById("ais-type").disabled = true;
        document.getElementById("ais-type").style.backgroundColor = '#696978';
        document.getElementById("nav-status").disabled = true;
        document.getElementById("nav-status").style.backgroundColor = '#696978';
        document.getElementById("dimensions-c").disabled = true;
        document.getElementById("dimensions-c").style.backgroundColor = '#696978';
        document.getElementById("ship-call-sign").disabled = true;
        document.getElementById("ship-call-sign").style.backgroundColor = '#696978';
        document.getElementById("rate-of-turn").disabled = true;
        document.getElementById("rate-of-turn").style.backgroundColor = '#696978';
        document.getElementById("dimensions-d").disabled = true;
        document.getElementById("dimensions-d").style.backgroundColor = '#696978';
    }

    // DISABLED FORM INPUT AIS TRACK **
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
                
                const $selectaisType = document.getElementById('ais-type');
                $selectaisType.value = "-";
                const $selectNavStatus = document.getElementById('nav-status');
                $selectNavStatus.value = "-";
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
                setLatitude("");
                setLongitude("");
                setBearing("");
                setDistance("");
                setMmsiNumber("");
                setImoNumber("");
                setDimensionsA("");
                setVendorId("");
                setAisName("");
                setEta("");
                setDimensionsB("");
                setDestination("");
                setAisType("");
                setNavStatus("");
                setDimensionsC("");
                setShipCallSign("");
                setRateOfTurn("");
                setDimensionsD("");
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
   
    // REQUEST GET UPDATE AIS TRACK **
    const handleGetUpdateAISTrack = async (e) => {

        const {id, checked}= e.target;
        var item = AISData.find(x => x.id === parseInt(id));
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = item.trackMode;
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = item.trackInput;
        const $selectaisType = document.getElementById('ais-type');
        $selectaisType.value = item.aisType;
        const $selectNavStatus = document.getElementById('nav-status');
        $selectNavStatus.value = item.navigationStatus;
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
        setCourseIncrement(item.courseIncrement)
        setSpeedIncrement(item.speedIncrement)
        setLatitude(item.latitude)
        setLongitude(item.longitude)
        setBearing(item.bearing)
        setDistance(item.distance)
        setId(item.id)
        setSpeed(item.speed)
        setMmsiNumber(item.mmsiNumber)
        setAisName(item.aisName)
        setAisType(item.aisType)
        setShipCallSign(item.shipCallSign)
        setImoNumber(item.imoNumber)
        setEta(item.eta)
        setNavStatus(item.navigationStatus)
        setRateOfTurn(item.rateOfTurn)
        setDimensionsA(item.dimensionsA)
        setDimensionsB(item.dimensionsB)
        setDimensionsC(item.dimensionsC)
        setDimensionsD(item.dimensionsD)
        setVendorId(item.vendorId)
        setDestination(item.destination)
        console.log(item)

        
        var getEdit="edit";
        setEdit("edit")
        var bearing1 = item.bearing;
        var getDistance = item.distance;
        disableFormInput(item.trackInput, item.trackMode, getEdit, bearing1, getDistance)
    }

    // HANDLER SEND STOP AIS TRACK **
    let handlerStopTrack = async (e) => {
        let resStop= await fetch(`http://localhost:8080/ais/stoptrack`, {
            method: "POST",
            body: "["+checkIdStop+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resStop.status === 202) {
            alert("AIS Track Stopped");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
    } 

    // HANDLER GET ID STOP AIS TRACK **
    const handlerGetIdStopTrack = async (id) => {
        try {              
            for(let i=0; i < AISData.length; i++){
                if(AISData[i].isChecked===true){            
                    checkIdStop.push(AISData[i].id);                           
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

    // HANDLER GET ID SEND AIS TRACK **
    const handlerGetIdSendTrack = async (id) => {
            try {    
                for(let i=0; i < AISData.length; i++){
                    if(AISData[i].isChecked===true){            
                        checkIdSend.push(AISData[i].id);                           
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

    // HANDLER SEND AIS TRACK **
    let handlerSendTrack = async (e) => {
        let resSend= await fetch(`http://localhost:8080/ais/sendtrack`, {
            method: "POST",
            body: "["+checkIdSend+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 202) {
            alert("AIS Track Sended");
            window.location.reload();
          } else {
            setMessage("Some error occured");
            window.location.reload();
          }
    }

    // HANDLER SEND AIS TRACK SAVE AND SEND**
    let handlerSendTrackSaveAndSend = async (e) => {
        let resSend= await fetch(`http://localhost:8080/ais/sendtrack`, {
            method: "POST",
            body: "["+id+"]",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },               
        });
        if (resSend.status === 202) {
            alert("AIS Track Sended");
            window.location.reload();
            } else {
            setMessage("Some error occured");
            window.location.reload();
            }
    }

    // HANDLER CANCEL **
    const handlerCancel=(event)=>{
        setEdit("change")
        document.getElementById("ti").style.backgroundColor = 'white';
        var Tinput = "-"
        var Tmode = "-"
        document.getElementById("ti").disabled = false;
        document.getElementById("tmr").disabled = true;
        const $selectaisType = document.getElementById('ais-type');
        $selectaisType.value = "-";
        const $selectNavStatus = document.getElementById('nav-status');
        $selectNavStatus.value = "-";
        const $selectTrackInput = document.getElementById('ti');
        $selectTrackInput.value = "-";
        setTrackInput("")
        const $selectTrackMode = document.getElementById('tmr');
        $selectTrackMode.value = "-";
        setTrackMode("")
        setCount("")
        setStartTime("-")
        setEndTime("-")
        setCourse("")
        setSpeed("")
        setCourseRangeMin("")
        setCourseRangeMax("")
        setCourseIncrement("")
        setSpeedRangeMin("")
        setSpeedRangeMax("")
        setSpeedIncrement("")
        setLongitude("")
        setLatitude("")
        setBearing("")
        setDistance("")
        setMmsiNumber("")
        setAisName("")
        setShipCallSign("")
        setImoNumber("")
        setEta("")
        setRateOfTurn("")
        setDimensionsA("")
        setDimensionsB("")
        setDimensionsC("")
        setDimensionsD("")
        setVendorId("")
        setDestination("")
        disableFormInput(Tinput, Tmode, status)
    }

    // HANDLER GET DEFAULT AIS TRACK --
    const handlerGetDefault=(event)=>{
        if(trackInput === "single" && trackMode === "manual"){
            const $selectaisType = document.getElementById('ais-type');
            $selectaisType.value = "1";
            const $selectNavStatus = document.getElementById('nav-status');
            $selectNavStatus.value = "1";
            if(statusRadio == 1){
                setLongitude(0)
                setLatitude(0)
            } else {
                setBearing(0)
                setDistance(0)
            }
            setCourse(0)
            setSpeed(0)
            setMmsiNumber(0)
            setAisName("")
            setShipCallSign("")
            setImoNumber(0)
            setEta(0)
            setRateOfTurn(0)
            setDimensionsA(0)
            setDimensionsB(0)
            setDimensionsC(0)
            setDimensionsD(0)
            setVendorId(0)
            setDestination("")
    
        } else if(trackInput === "single" && trackMode === "automatic"){
            const $selectaisType = document.getElementById('ais-type');
            $selectaisType.value = "1";
            const $selectNavStatus = document.getElementById('nav-status');
            $selectNavStatus.value = "1";
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
            setCourseRangeMin(0)
            setCourseRangeMax(0)
            setCourseIncrement(0)
            setSpeedRangeMin(0)
            setSpeedRangeMax(0)
            setSpeedIncrement(0)
            setMmsiNumber(0)
            setAisName("")
            setShipCallSign("")
            setImoNumber(0)
            setEta(0)
            setRateOfTurn(0)
            setDimensionsA(0)
            setDimensionsB(0)
            setDimensionsC(0)
            setDimensionsD(0)
            setVendorId(0)
            setDestination("")

        } else if(trackInput === "multi" && trackMode === "manual"){
            const $selectaisType = document.getElementById('ais-type');
            $selectaisType.value = "1";
            const $selectNavStatus = document.getElementById('nav-status');
            $selectNavStatus.value = "1";
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
            setMmsiNumber(0)
            setAisName("")
            setShipCallSign("")
            setImoNumber(0)
            setEta(0)
            setRateOfTurn(0)
            setDimensionsA(0)
            setDimensionsB(0)
            setDimensionsC(0)
            setDimensionsD(0)
            setVendorId(0)
            setDestination("")
        } else if(trackInput === "multi" && trackMode === "automatic"){
            
        }
        
    }


    return (
    <div className="main-container">   
        <label className="label">AIS TRACK LIST INFO</label>
        <div className="track-info">
            <div className="track-list">
                <div className="table-wrapper">
                    <table className="scrolldown" >
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Track Mode</th>
                                <th>MMSI</th>
                                <th>AIS Name</th>
                                <th>AIS Type</th>
                                <th>Navigation Status</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Last Update Time</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th><input type="checkbox" name="allselect" checked= { !AISData.some( (ais)=>ais?.isChecked!==true)} onChange={handleChange} />Select All</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            AISData.map( (d,i)=>(
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.trackMode}</td>
                                    <td>{d.mmsiNumber}</td>
                                    <td>{d.aisName}</td>
                                    <td>{enumAisType[d.aisType]}</td>
                                    <td>{enumNavStatus[d.navigationStatus]}</td>
                                    <td>{d.startTime}</td>
                                    <td>{d.endTime}</td>
                                    <td>{d.lastSend}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        {/* <button className="btn btn-sm btn-info me-2">Detail</button> */}
                                        <button className="btn btn-sm btn-primary me-2" id={d.id} onClick={handleGetUpdateAISTrack}>Edit</button>
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
                <button className="btn btn-info mt-2" onClick={handlerGetIdSendTrack}>START</button>
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
                            <td colSpan={2}></td>
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
                            <td colSpan={3}>id:{id}, radio:{statusRadio}, status:{edit}</td>
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
                            <td colSpan={4}></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>Course Variation</td>
                            <td></td>
                            <td>Speed Variation</td>
                            <td colSpan={5}></td>
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
                            <td colSpan={4}></td>
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
                            <td colSpan={4}></td> 
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
                            <td colSpan={4}></td>
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
                            <td colSpan={4}></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>IFF Data</td>
                            <td colSpan={7}></td>  
                        </tr>

                        <tr>
                            <td></td>
                            <td>MMSI Number</td>
                            <td>
                                <input 
                                type="number" 
                                id="mmsi-number"
                                name="mmsi-number"
                                placeholder="MMSI Number"
                                class="form-input"
                                value={mmsiNumber}
                                onChange={(e) => setMmsiNumber(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>IMO Number</td>
                            <td>
                                <input 
                                type="number" 
                                id="imo-number"
                                name="imo-number"
                                placeholder="IMO Number"
                                class="form-input"
                                value={imoNumber}
                                onChange={(e) => setImoNumber(e.target.value)} disabled> 
                                </input>
                            </td>
                            <td>Dimensions A</td>
                            <td>             
                                <input 
                                type="number" 
                                id="dimensions-a"
                                name="dimensions-a"
                                placeholder="Dimensions A"
                                class="form-input"
                                value={dimensionsA}
                                onChange={(e) => setDimensionsA(e.target.value)} disabled> 
                                </input>
                            </td>
                            <td>Vendor id</td>  
                            <td>
                                <input 
                                type="text" 
                                id="vendor-id"
                                name="vendor-id"
                                placeholder="Vendor Id"
                                class="form-input"
                                value={vendorId}
                                onChange={(e) => setVendorId(e.target.value)} disabled> 
                                </input>
                            </td>                    
                        </tr>

                        <tr>
                            <td></td>
                            <td>AIS Name</td>
                            <td>
                                <input 
                                type="text" 
                                id="ais-name"
                                name="ais-name"
                                placeholder="AIS Name"
                                class="form-input"
                                value={aisName}
                                onChange={(e) => setAisName(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>ETA</td>
                            <td>
                                <input 
                                type="datetime-local" 
                                id="eta" 
                                name="eta"
                                class="form-input"
                                value={eta}
                                onChange={(e) => setEta(e.target.value)}
                                disabled>
                                </input>
                            </td>  
                            <td>Dimensions B</td>
                            <td>
                                <input 
                                type="number" 
                                id="dimensions-b"
                                name="dimensions-b"
                                placeholder="Dimensions B"
                                class="form-input"
                                value={dimensionsB}
                                onChange={(e) => setDimensionsB(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>Destination</td>
                            <td>
                                <input 
                                type="text" 
                                id="destination"
                                name="destination"
                                placeholder="Destination"
                                class="form-input"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)} disabled>
                                </input>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>AIS Type</td>
                            <td>             
                                <select name="ais-type"  class="form-input" id="ais-type"  onChange={(e) => setAisType(e.target.value)} disabled>
                                    <option value="">-- Pilih --</option>
                                    <option value="1">AIS Type 1</option>
                                    <option value="2">AIS Type 2</option>
                                    <option value="3">AIS Type 3</option>
                                </select>
                            </td>
                            <td>Nav Status</td>
                            <td>             
                                <select name="nav-status" class="form-input" id="nav-status" onChange={(e) => setNavStatus(e.target.value)} disabled>
                                    <option value="">-- Pilih --</option>
                                    <option value="0">Nav Status 1</option>
                                    <option value="1">Nav Status 2</option>
                                    <option value="2">Nav Status 3</option>
                                    <option value="3">Nav Status 4</option>
                                </select>
                            </td>
                            <td>Dimensions C</td>
                            <td>
                                <input 
                                type="number" 
                                id="dimensions-c"
                                name="dimensions-c"
                                placeholder="Dimensions C"
                                class="form-input"
                                value={dimensionsC}
                                onChange={(e) => setDimensionsC(e.target.value)} disabled>
                                </input>
                            </td>
                            <td colSpan={2}></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>Ship Call Sign</td>
                            <td>
                                <input 
                                type="text" 
                                id="ship-call-sign"
                                name="ship-call-sign"
                                placeholder="Ship Call Sign"
                                class="form-input"
                                value={shipCallSign}
                                onChange={(e) => setShipCallSign(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>Rate of Turn</td>
                            <td>             
                                <input 
                                type="number" 
                                id="rate-of-turn"
                                name="rate-of-turn"
                                placeholder="Rate of Turn"
                                class="form-input"
                                value={rateOfTurn}
                                onChange={(e) => setRateOfTurn(e.target.value)} disabled>
                                </input>
                            </td>
                            <td>Dimensions D</td>
                            <td>
                                <input 
                                type="number" 
                                id="dimensions-d"
                                name="dimensions-d"
                                placeholder="Dimensions D"
                                class="form-input"
                                value={dimensionsD}
                                onChange={(e) => setDimensionsD(e.target.value)} disabled>
                                </input>
                            </td>
                            <td colSpan={2}></td>
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

                <Button variant="btn btn-primary mt-2" onClick={handlerValidasiInputSaveAndSend} disabled={((checkTrackMode === "automatic")? true: false)}>
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

export default AISHome; 