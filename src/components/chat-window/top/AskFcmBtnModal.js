import React from 'react';
import { IconButton, Icon, Modal, Button } from 'rsuite';
import { ref, remove, set } from 'firebase/database';
import { useParams } from 'react-router';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';
import { database, auth } from '../../../misc/firebase';

const AskFcmBtnModal = () => {
  const { chatId } = useParams();
  const isReceivingFcm = useCurrentRoom(v => v.isReceivingFcm);
  const { isOpen, close, open } = useModalState();

  const onAccept = () => {
    set(
      ref(database, `/rooms/${chatId}/fcmUsers/${auth.currentUser.uid}`),
      true
    );
  };

  const onCancel = () => {
    remove(ref(database, `/rooms/${chatId}/fcmUsers/${auth.currentUser.uid}`));
  };

  return (
    <>
      <IconButton
        icon={<Icon icon="podcast" />}
        color="blue"
        size="sm"
        circle
        appearance={isReceivingFcm ? 'default' : 'ghost'}
        onClick={open}
      />

      <Modal show={isOpen} onHide={close} size="xs" backdrop="static">
        <Modal.Header>
          <Modal.Title>Notifications permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isReceivingFcm ? (
            <div className="text-center">
              <Icon className="text-green mb-3" icon="check-circle" size="5x" />
              <h6>
                You are subscribed to broadcast messages sent by admins of this
                room.
              </h6>
            </div>
          ) : (
            <div className="text-center">
              <Icon
                className="text-blue mb-3"
                icon="question-circle"
                size="5x"
              />
              <h6>
                Do you want to subscribe to messages sent by admins of this
                room?
              </h6>
            </div>
          )}
          <p className="mt-2">
            To receive notifications make sure you allow Notifactions in your
            browser
          </p>
          <p>
            Permission:{' '}
            {Notification.permission === 'granted' ? (
              <span className="text-green">Granted</span>
            ) : (
              <span className="text-red">Denied</span>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {isReceivingFcm ? (
            <Button color="green" onClick={onCancel}>
              I changed my mind
            </Button>
          ) : (
            <Button color="green" onClick={onAccept}>
              Yes, I do
            </Button>
          )}
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AskFcmBtnModal;
