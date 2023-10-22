import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './ModalLayout.module.css';
import { IModal } from '../../../../types/types';
import { ANIMATION_MS } from '../../../../constants/constants';

export const ModalLayout = (props: IModal) => {
  const { isOpen, children, onClose } = props;

  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const [animIn, setAnimIn] = useState(false);

  const overlayAnimClassNames = {
    enter: styles.overlayAnimEnter,
    enterActive: styles.overlayAnimEnterActive,
    exit: styles.overlayAnimExit,
    exitActive: styles.overlayAnimExitActive,
  };

  const windowAnimClassNames = {
    enter: styles.windowAnimEnter,
    enterActive: styles.windowAnimEnterActive,
    exit: styles.windowAnimExit,
    exitActive: styles.windowAnimExitActive,
  };

  useEffect(() => {
    setAnimIn(isOpen);
  }, [isOpen]);

  return (
    <>
      <CSSTransition
        nodeRef={overlayRef}
        in={animIn}
        timeout={ANIMATION_MS}
        classNames={overlayAnimClassNames}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.overlayBg} ref={overlayRef} />
      </CSSTransition>
      <div className={styles.windowOverlay} onClick={onClose} tabIndex={0} role='button'>
        <div className={styles.windowOverlayInner}>
          <CSSTransition
            nodeRef={windowRef}
            in={animIn}
            timeout={ANIMATION_MS}
            classNames={windowAnimClassNames}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={styles.window}
              ref={windowRef}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
              <button className={styles.closeBtn} type='button' onClick={onClose}></button>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
};
