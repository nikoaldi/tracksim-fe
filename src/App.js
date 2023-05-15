

import Form from './components/ownplatform/Form'
import Button_grup from './components/button_group';
import FormRadar from './components/Radar/RadarForm';
import CobaTabel from './components/Radar/CobaTabel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import RadarHome from './components/Radar/RadarHome';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/ownplatform' element={<Form />}></Route>
          <Route path='/radar' element={<RadarHome />}></Route>
          <Route path='/coba' element={<CobaTabel />}></Route>
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
