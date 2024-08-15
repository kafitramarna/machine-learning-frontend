import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/core/dist/js/tabler.min.js';
import Home from './Pages/Home.jsx';
import LinearRegression from './Pages/Regression/LinearRegression.jsx';
import PolynomialRegression from './Pages/Regression/PolynomialRegression.jsx';
import SupportVectorRegression from './Pages/Regression/SupportVectorRegression.jsx';
import KNearestNeighborsRegression from './Pages/Regression/KNearestNeighborsRegression.jsx';
import DecisionTreeRegression from './Pages/Regression/DecisionTreeRegression.jsx';
import RandomForestRegression from './Pages/Regression/RandomForestRegression.jsx';
import GradientBoostingRegression from './Pages/Regression/GradientBoostingRegression.jsx';
const router = [
  {
    path: '/',
    component: <Home/>
  },
  {
    path:'/regression/linear-regression',
    component: <LinearRegression/>
  },
  {
    path:'/regression/polynomial-regression',
    component: <PolynomialRegression/>
  },
  {
    path:'/regression/support-vector-regression',
    component: <SupportVectorRegression/>
  },
  {
    path:'/regression/k-nearest-neighbors',
    component: <KNearestNeighborsRegression/>
  },
  {
    path:'/regression/decision-tree-regression',
    component: <DecisionTreeRegression/>
  },
  {
    path:'/regression/random-forest-regression',
    component: <RandomForestRegression/>
  },{
    path: '/regression/gradient-boosting-regression',
    component: <GradientBoostingRegression/>
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
