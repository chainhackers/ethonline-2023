import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PoolsPage } from 'Pages';
import './index.scss';
import '@rainbow-me/rainbowkit/styles.css';
import CreatePool from './components/createPool/CreatePool';
import { ROUTES } from './constants/constants';
import { Header } from './components';
import { LandingPage } from 'Pages/LandingPage/LandingPage.tsx';

function App() {
  const versionGitTag = import.meta.env.VITE_REACT_APP_GIT_TAG;
  const gitDate = import.meta.env.VITE_REACT_APP_GIT_DATE;

  console.log('VITE_REACT_APP_GIT_TAG - ', versionGitTag);
  console.log('VITE_REACT_APP_GIT_DATE - ', gitDate);

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PoolsPage poolsType={'All Pools'} />} />
          <Route path={ROUTES.assetManagement} element={<CreatePool />} />
          <Route path={ROUTES.landing} element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
