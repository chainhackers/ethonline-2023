/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IPortal {
  children: React.ReactNode;
}

function Portal(props: IPortal) {
  const [portalContainer] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.appendChild(portalContainer);

    return () => {
      document.body.style.overflow = 'unset';
      document.body.removeChild(portalContainer);
    };
  }, []);

  return ReactDOM.createPortal(props.children, portalContainer);
}

export default Portal;
