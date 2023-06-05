import Form from './components/ownplatform/Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RadarHome from './components/Radar/RadarHome';
import AISHome from './components/AIS/AisForm';
import ADSBHome from './components/ADSB/AdsbHome';
import OwnshipForm from './components/OwnShip/OwnshipForm';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/ownplatform' element={<Form />}></Route>
          <Route path='/radar' element={<RadarHome />}></Route>
          <Route path='/ais' element={<AISHome />}></Route>
          <Route path='/ownship' element={<OwnshipForm />}></Route>
          <Route path='/adsb' element={<ADSBHome />}></Route>
        </Routes>
      </BrowserRouter>



      {/* <Button_grup /> */}
      {/* <Form /> */}
      {/* <FormRadar /> */}
      {/* <CobaTabel /> */}
    </div>
  );
}

export default App;
