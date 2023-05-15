import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import '../App.css';
import {
    Marker,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'






function Plots(props) {
    
    
    // Ambil data plots dari API Quarkus
    const [plot2, setPlot] = useState([]);


    //Data
    const [nama, setNama] = useState("");
    const [warna, setWarna] = useState("");
    const [koordinatX, setKoordinatX] = useState("");
    const [koordinatY, setKoordinatY] = useState("");
    const [deskripsi, setDeskripsi] = useState("");


    const [message, setMessage] = useState("");

    const [LetUpdate, setLetUpdate] = useState("");
    const [LongUpdate, setLongUpdate] = useState("");
    

    const [idUpdate, setIdUpdate] = useState();
    const [namaUpdate, setNamaUpdate] = useState("");
    const [warnaUpdate, setWarnaUpdate] = useState("");
    const [kordinatUpdateX, setKoordinatUpdateX] = useState(0);
    const [kordinatUpdateY, setKoordinatUpdateY] = useState(0);
    const [deskripsiUpdate, setDeskripsiUpdate] = useState("");
    const [messageUpdate, setMessageUpdate] = useState("");
    

    const getPlot = async () => {
        
        try{
          let response = await Axios.get('http://localhost:9000/plotss')
          setPlot(response.data)
          plot2 = setPlot(response.data);
        } catch(e){
          console.log(e.message)
        }
      }



      

      useEffect(() => {
        
        let interval = setInterval(() => {
            getPlot();
        },2000)
          
      }, [])
    
      

    // const plot1 = [
    //     {id: 1, lat: -6, long:107},
    //     {id: 2, lat: -5.900, long:110.195},
    //     {id: 3, lat: -7.900, long:110.195},
    //     {id: 4, lat: -4.900, long:110.195},
    //     {id: 5, lat: -10.900, long:110.195},

    //   ];


    var position = [];

   
    
    //// REQUEST DELETE
    const handleDelete = async (id) => {
    


    try {
        let res2 = await fetch(`http://localhost:9000/plotss/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        });
        let resJson2 = await res2.json();
        if (res2.status === 204) {
            alert("Plot deleted successfully");
        } else {
            alert("Some error occured");
        }
    } catch (err) {
        console.log(err);
    }
    

    }

        //// REQUEST UPDATE

    const handleUpdate = async (id) => {

    try {
        let res1 = await fetch(`http://localhost:9000/plotss/${id}`, {
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
        setDeskripsi("");
        setKoordinatUpdateX();
        setKoordinatUpdateY();
        setMessage("Plot update successfully");
        } else {
        setMessage("Some error occured");
        }
    } catch (err) {
        console.log(err);
    }
    };

  

  return (
              
        plot2.map((plot2, index) => {
            position = [plot2.koordinatX, plot2.koordinatY]
            
            
                return (            
                    <div key={index} namaUpdate={plot2.nama}> 
                    <script></script>
            
                        <Marker 
                            position={position}
                            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}
                        >
                        <Popup>
                            
                            
                            <table >
                            <h1>{plot2.nama}</h1>
                                <tr>
                                <td>Nama</td>
                                <input type="text" name="namaInput" defaultValue={plot2.nama}  onChange={(e) => setNamaUpdate(e.target.value)}  ></input>
                                <td></td>
                                </tr>

                                <tr>
                                <td>Des</td>
                                <input type="text" name="desInput" defaultValue={plot2.deskripsi}  onChange={(e) => setDeskripsiUpdate(e.target.value)}></input>
                                <td></td>
                                </tr>

                                <tr>
                                <td>Warna</td>
                                <input type="text" name="desInput" defaultValue={plot2.warna}  onChange={(e) => setWarnaUpdate(e.target.value)} ></input>
                                <td></td>
                                </tr>

                                <tr>
                                <td>Lat</td>
                                <input type="text" Value={plot2.koordinatX} onChange={(e) => setKoordinatUpdateX(e.target.value)} ></input>
                                <td></td>
                                </tr>

                                <tr>
                                <td>Long</td>
                                <input type="text" Value={plot2.koordinatY} onChange={(e) => setKoordinatUpdateY(e.target.value)}></input>
                                <td></td>
                                </tr>



                        
              
                            </table>
                                    <p align="left">                               
                                        <form onSubmit={handleUpdate} > 
                                            <button onClick={() => handleUpdate(plot2.id)} variant="danger" size="sm">UPDATE</button>                   
                                        </form>                                                                         
                                    </p>

                           
                   
                                    <p align="right">
                                        <form onSubmit={handleDelete} >
                                            <button onClick={() => handleDelete(plot2.id)} variant="danger" size="sm">DELETE</button>
                                        </form>
                                    </p>

                     
                        </Popup>      
                        </Marker>
                    </div>
                )
        })
  );
}

export default Plots;
