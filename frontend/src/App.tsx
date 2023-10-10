import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.scss';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DevModeToggle from './components/devModeToggle/DevModeToggle';

function App() {
  const [count, setCount] = useState(0);
  const [devModeState, setDevModeState] = useState(false);
  const versionDeploy = import.meta.env.VITE_REACT_APP_GIT_TAG;
  const dateDeploy = import.meta.env.VITE_REACT_APP_GIT_DATE;

  const handleToggleDevMode = (value: boolean) => {
    setDevModeState(value);
  };

  return (
    <div className='app appBox'>
      {versionDeploy && dateDeploy && (
        <div>
          <DevModeToggle isDevMode={devModeState} handleToggleDevMode={handleToggleDevMode} />
          {devModeState && (
            <div>
              <p>Version: {versionDeploy}</p>
              <p>Date: {dateDeploy}</p>
            </div>
          )}
        </div>
      )}
      <div className='logoBox'>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>New</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <ConnectButton />
    </div>
  );
}

export default App;
