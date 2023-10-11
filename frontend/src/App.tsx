import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.scss';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VersionInfo from './components/versionInfo/VersionInfo';

function App() {
  const [count, setCount] = useState(0);
  const versionGitTag = import.meta.env.VITE_REACT_APP_GIT_TAG;
  const gitDate = import.meta.env.VITE_REACT_APP_GIT_DATE;

  console.log('VITE_REACT_APP_GIT_TAG - ', versionGitTag);
  console.log('VITE_REACT_APP_GIT_DATE - ', gitDate);

  return (
    <div className='app appBox'>
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
      {versionGitTag && gitDate && <VersionInfo version={versionGitTag} versionDate={gitDate} />}
    </div>
  );
}

export default App;
