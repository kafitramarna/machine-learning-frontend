import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/core/dist/js/tabler.min.js';
import Home from './Pages/Home.jsx';
import LinearRegression from './Pages/Regression/LinearRegression.jsx';
const router = [
  {
    path: '/',
    component: <Home/>
  },
  {
    path:'/regression/linear-regression',
    component: <LinearRegression/>
  }

]
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {router.map((item, index) => (
          <Route key={index} path={item.path} element={item.component} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
