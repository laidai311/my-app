import { Button } from '..';
import { useAuth } from '.';
import { useEffect, useRef } from 'react';
import { useToggle } from 'ahooks';
import Modal from '../Modal';

const useRefreshToken = (isRefresh) => {
  const { refreshToken } = useAuth();
  const [open, { toggle }] = useToggle();
  const contextHolder = useRef();
  useEffect(() => {
    if (isRefresh) {
      toggle();
    }
  }, [isRefresh]);
  contextHolder.current = (
    <Modal open={open} onClose={toggle}>
      <div className="bg-white p-5 rounded-lg space-y-3">
        <div className="font-medium">
          You'll need to refresh the access token!
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" color="default" onClick={toggle}>
            Đóng
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              refreshToken();
              toggle();
            }}
          >
            Refetch token
          </Button>
        </div>
      </div>
    </Modal>
  );
  return [contextHolder.current];
};

export default useRefreshToken;
