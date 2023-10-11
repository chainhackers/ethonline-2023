import { useState } from 'react';
import '../index.scss';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DevModeToggle from '../components/devModeToggle/DevModeToggle';

function Root() {
    const [devModeState, setDevModeState] = useState(false);
    const versionGitTag = import.meta.env.VITE_REACT_APP_GIT_TAG;
    const gitDate = import.meta.env.VITE_REACT_APP_GIT_DATE;

    console.log('VITE_REACT_APP_GIT_TAG - ', versionGitTag);
    console.log('VITE_REACT_APP_GIT_DATE - ', gitDate);

    const handleToggleDevMode = (value: boolean) => {
        setDevModeState(value);
    };

    return (
        <>
            <h1>root page</h1>
            {versionGitTag && gitDate && (
                <div>
                    <DevModeToggle isDevMode={devModeState} handleToggleDevMode={handleToggleDevMode} />
                    {devModeState && (
                        <div>
                            <p>Version: {versionGitTag}</p>
                            <p>Date: {gitDate}</p>
                        </div>
                    )}
                </div>
            )}
            <ConnectButton />
        </>
    );
}

export default Root;
