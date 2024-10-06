import React from 'react';
import { observer } from 'mobx-react-lite';
import PrimaryButton from '@/components/page/PrimaryButton';
import { Center, Modal, Text } from '@asuikit/core';

interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  type?: 'success' | 'failed';
  text: string;
  link?: string;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  opened,
  onClose,
  type = 'success',
  text,
  link,
  onConfirm,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      overlayProps={{
        opacity: 0.6,
        blur: 3,
      }}
      padding={24}
      radius="md"
      size={320}
      styles={(theme) => {
        return {
          root: {},
          content: {
            boxShadow: '8px 8px 0px 0px #000000',
            borderRadius: 24,
            padding: 0,
            width: 420,
            // height: 334,
          },
          close: {
            color: '#000',
          },
        };
      }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <img
          width={72}
          height={72}
          src={
            type === 'success'
              ? `/images/meme/success.svg`
              : `/images/meme/failed.svg`
          }
          alt=""
        />
        <Text size={24} weight={700} align="center">
          {type === 'success' ? 'Success' : 'Failed'}
        </Text>
        <Text weight={400} color={'#00000099'}>
          {text}
          <Text size={14} weight={400} color={'#3C38F5'} align={'center'}>
            {link}
          </Text>
        </Text>
      </div>
      <Center mt={28}>
        <div className="w-[160px]">
          <PrimaryButton
            fullWidth
            h={44}
            shadowOffset={2}
            activeShadowOffset={2}
            bg={`${type === 'success' ? '#8EF59B' : '#F9D607'}`}
            onClick={() => {
              onConfirm();
            }}
          >
            <Text size={24} weight={700}>
              OK
            </Text>
          </PrimaryButton>
        </div>
      </Center>
    </Modal>
  );
};

export default observer(CustomModal);
