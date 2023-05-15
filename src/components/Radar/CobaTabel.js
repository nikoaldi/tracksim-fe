import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import './RadarForm.css';
import axios from "axios";
import DataTable from "react-data-table-component";

const CobaTabel = (props) => {

    const [RadarData, setRadarData] = useState([]);
    const [columns, setColumns] = useState([]);

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

    const data = [
      {
        id:1,
        trackInput: 'Single',
        trackMode: 'Manual',
        environtment: 'Air',
        startTime: '05-05-2023 10:30',
        endTime:'05-05-2023 10:30'
      },
      {
        id:2,
        trackInput: 'Multi',
        trackMode: 'Manual',
        environtment: 'Surface',
        startTime: '05-05-2023 10:30',
        endTime:'05-05-2023 10:30'
      },
      {
        id:3,
        trackInput: 'Single',
        trackMode: 'Manual',
        environtment: 'Land',
        startTime: '05-05-2023 10:30',
        endTime:'05-05-2023 10:30'
      },
    ]



    
    //   useEffect(()=> {
    //     axios.get('http://localhost:8080/radar')
    //     .then(res => {
    //         setColumns(Object.keys(res.data[0]))
    //         setRadarData(res.data)
    //     })
    //   }, [])

          //// REQUEST GET

  const getRadarData = async () => {
    try{
      let response = await Axios.get('http://localhost:8080/radar')
      setRadarData(response.data)
      setColumns(Object.keys(response.data[0]))
    } catch(e){
      console.log(e.message)
    }
  }



  useEffect(() => {
    let interval = setInterval(() => {
        getRadarData();
    },1000)    
  }, [])
    

    return (
      <div className="container mt-5">
          <DataTable
            columns={kolom}
            data={RadarData}
            selectableRows
            fixedHeader
            pagination
          >

          </DataTable>
      </div>
    );
}

export default CobaTabel; 