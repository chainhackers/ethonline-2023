import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VersionInfo from './components/versionInfo/VersionInfo';
import CreatePool from './components/createPool/CreatePool';

function App() {
  const versionGitTag = import.meta.env.VITE_REACT_APP_GIT_TAG;
  const gitDate = import.meta.env.VITE_REACT_APP_GIT_DATE;

  console.log('VITE_REACT_APP_GIT_TAG - ', versionGitTag);
  console.log('VITE_REACT_APP_GIT_DATE - ', gitDate);

  return (
    <div className='app'>
      <ConnectButton />
      <CreatePool />
      {versionGitTag && gitDate && <VersionInfo version={versionGitTag} versionDate={gitDate} />}
    </div>
  );
}

export default App;
