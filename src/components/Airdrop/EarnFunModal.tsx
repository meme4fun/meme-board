import { List, Modal, Text } from '@asuikit/core';
import { useTranslation } from 'react-i18next';
import { STATIC_BASEURL } from '@/constants';

function EarnFunModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      overlayProps={{
        opacity: 0.6,
        blur: 10,
      }}
      padding={40}
      radius="md"
      size={640}
      title={t('earn.title')}
      styles={(theme) => {
        return {
          header: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: 20,
            backgroundColor: '#A2CFF9',
          },
          title: {
            fontSize: 32,
            fontWeight: 600,
          },
          content: {
            boxShadow: '8px 8px 0px 0px #000000',
            borderRadius: 24,
            width: 420,
            backgroundColor: '#A2CFF9',
            border: '2px solid #000',
            // height: 334,
          },
          close: {
            color: '#000',
          },
        };
      }}
    >
      <div className="flex flex-col gap-6">
        <img height={225} src={`/images/meme/earn-bg.png`} alt="" />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 font-normal">
            <Text>·</Text>
            {t('earn.text_1')}
          </div>
          <div className="flex gap-2 font-normal">
            <Text>·</Text>
            {t('earn.text_2')}
          </div>
          <div className="flex gap-2 font-normal">
            <Text>·</Text>
            {t('earn.text_3')}
          </div>
        </div>
        <div
          className="yellow-btn flex h-[54px] justify-center"
          onClick={() => onClose()}
        >
          <img src="/images/meme/learn-more.svg" alt="" />
        </div>
      </div>
    </Modal>
  );
}

export default EarnFunModal;
