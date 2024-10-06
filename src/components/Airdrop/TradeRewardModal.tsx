import { Modal, Text } from '@asuikit/core';
import { useTranslation } from 'react-i18next';
import { mantissaNumber } from '@/utils';

function TradeRewardModal({ opened, onClose }) {
  const { t } = useTranslation();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      overlayProps={{
        opacity: 0.6,
        blur: 10,
      }}
      padding={24}
      radius="md"
      size={600}
      title={t('reward.underline_text')}
      styles={(theme) => {
        return {
          header: {
            backgroundColor: '#FFFFFF',
            paddingBottom: 16,
          },
          title: {
            fontSize: 20,
            fontWeight: 700,
          },
          content: {
            boxShadow: '8px 8px 0px 0px #000000',
            borderRadius: 24,
            width: 420,
            backgroundColor: '#FFFFFF',
            border: '2px solid #000',
            // height: 334,
          },
          close: {
            color: '#000',
          },
        };
      }}
    >
      <div>
        <Text align="center" size={22} weight={700}>
          {t('reward.modal_sub_title')}
          <Text component={'span'}>{mantissaNumber(100134123)}$FUN</Text>
        </Text>
      </div>
    </Modal>
  );
}

export default TradeRewardModal;
