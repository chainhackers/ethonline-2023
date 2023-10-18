import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PoolsPage } from 'Pages';
import './index.scss';
import '@rainbow-me/rainbowkit/styles.css';
import CreatePool from './components/createPool/CreatePool';
import { ROUTES } from './constants/constants';
import { Header } from './components';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PoolsPage poolsType={'All Pools'} />} />
          <Route path={ROUTES.assetManagement} element={<CreatePool />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
