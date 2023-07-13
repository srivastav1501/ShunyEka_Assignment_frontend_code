import './App.css';
import Table from './components/Main';
import Form from './components/Form';
import Read from './components/Read';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [id,setId] = useState();
  return (
    <>
      <BrowserRouter >
      <Routes>
      <Route path='/' element={<Table setId={setId}/>} />
        <Route path='/add' element={<Form />} />
        <Route path='/read' element={<Read id={id}/>} />
      </Routes>
      </BrowserRouter>
          </>
  );
}

export default App;
