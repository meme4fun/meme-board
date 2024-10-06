import { useForm } from '@asuikit/form';
import {
  Center,
  Group,
  Stack,
  Textarea,
  TextInput,
  Text,
  Image,
  Collapse,
  SegmentedControl,
} from '@asuikit/core';
import { memo, useState } from 'react';
import PrimaryButton from '@/components/page/PrimaryButton';
import { Dropzone, IMAGE_MIME_TYPE } from '@asuikit/dropzone';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiImageAddFill,
  RiTelegramLine,
  RiTwitterXLine,
} from 'react-icons/ri';
import { MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const InputLabel = ({ icon, label, valueLen, limit }: any) => {
  return (
    <div className="mb-[10px] flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        {icon}
        <Text>{label}</Text>
      </div>
      <div className="flex items-center">
        {limit > 0 ?? (
          <>
            <Text>{valueLen}</Text>/<Text>{limit}</Text>
          </>
        )}
      </div>
    </div>
  );
};

const CreateTokenForm = () => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      imgUrl: '',
      name: '',
      ticker: '',
      description: '',
      solOption: '30sol',
    },

    validate: {
      name: (value) =>
        value.length > 12 ? 'Name must be 12 characters or less' : null,
      ticker: (value) =>
        value.length > 8 ? 'Ticker must be 8 characters or less' : null,
    },
  });

  const [files, setFiles] = useState([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        alt="Preview"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} // Revoke after load
        width={184}
        height={184}
        fit="contain"
      />
    );
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack px={32} py={40} spacing={24} justify="center">
        <Group spacing={16}>
          {/* 文件上传 */}
          <Dropzone
            onDrop={(acceptedFiles: []) => setFiles(acceptedFiles)}
            {...form.getInputProps('imgUrl')}
            accept={IMAGE_MIME_TYPE}
            maxSize={4 * 1024 ** 2} // 4MB limit
            styles={{
              root: {
                width: 186,
                height: 186,
                border: '2px solid #000000',
                borderRadius: '8px',
                padding: 0,
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
              },
            }}
          >
            {previews.length > 0 ? (
              previews[0]
            ) : (
              <>
                <Group position="center">
                  <RiImageAddFill size={28} />
                </Group>
                <Text size="md" align="center">
                  {t('create.form_upload_l')}
                </Text>
                <Text size="md" color="#00000066" align="center" mt={20}>
                  {t('create.form_upload_p')}
                  <br />
                  {t('create.form_upload_limit')}
                </Text>
              </>
            )}
          </Dropzone>
          <Stack className="h-[186px] flex-1" justify="space-between">
            {/* 名称输入 */}
            <TextInput
              label={
                <InputLabel
                  label={t('create.form_name_l')}
                  valueLen={0}
                  limit={12}
                />
              }
              placeholder={t('create.form_name_p')}
              {...form.getInputProps('name')}
              styles={{
                input: {
                  height: 50,
                  border: '2px solid #000000',
                },
                label: {
                  width: '100%',
                },
              }}
            />

            {/* Ticker 输入 */}
            <TextInput
              label={
                <InputLabel
                  label={t('create.form_ticker_l')}
                  valueLen={0}
                  limit={8}
                />
              }
              placeholder={t('create.form_ticker_p')}
              {...form.getInputProps('ticker')}
              styles={{
                input: {
                  height: 50,
                  border: '2px solid #000000',
                },
                label: {
                  width: '100%',
                },
              }}
            />
          </Stack>
        </Group>

        {/* 描述输入 */}
        <Textarea
          label={
            <InputLabel
              label={t('create.form_desc_l')}
              valueLen={0}
              limit={0}
            />
          }
          placeholder={t('create.form_desc_p')}
          {...form.getInputProps('description')}
          styles={{
            input: {
              height: 120,
              border: '2px solid #000000',
            },
          }}
        />

        {/* 展开 */}
        <Center
          className="text-md flex cursor-pointer items-center font-medium"
          onClick={() => setOpened((prev) => !prev)}
        >
          <Text size="md">{t('create.link_optional')}</Text>
          {opened ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </Center>
        <Collapse in={opened}>
          <Stack>
            <TextInput
              label={
                <InputLabel
                  label={t('create.form_tw_l')}
                  icon={<RiTwitterXLine />}
                />
              }
              placeholder={t('create.form_tw_p')}
              {...form.getInputProps('name')}
              styles={{
                input: {
                  height: 50,
                  border: '1px solid #000000',
                },
                label: {
                  width: '100%',
                },
              }}
            />
            <TextInput
              label={
                <InputLabel
                  label={t('create.form_tg_l')}
                  icon={<RiTelegramLine />}
                />
              }
              placeholder={t('create.form_tg_p')}
              {...form.getInputProps('name')}
              styles={{
                input: {
                  height: 50,
                  border: '1px solid #000000',
                },
                label: {
                  width: '100%',
                },
              }}
            />
            <TextInput
              label={
                <InputLabel
                  label={t('create.form_web_l')}
                  icon={<MdOutlineLanguage />}
                />
              }
              placeholder={t('create.form_web_p')}
              {...form.getInputProps('name')}
              styles={{
                input: {
                  height: 50,
                  border: '1px solid #000000',
                },
                label: {
                  width: '100%',
                },
              }}
            />
          </Stack>
        </Collapse>

        {/* 选择 Launch 选项 */}
        <div className="flex flex-col gap-[10px]">
          <Text fw={500}>{t('create.raydium_t')}</Text>
          <SegmentedControl
            {...form.getInputProps('solOption')}
            data={[
              { label: '30sol', value: t('create.raydium_t') },
              { label: '85sol', value: '85sol' },
              { label: '200sol', value: '200sol' },
            ]}
            transitionDuration={0}
            radius="0"
            styles={(theme) => ({
              root: {
                backgroundColor: 'transparent',
                display: 'flex',
                gap: 16,
                padding: 0,
              },
              label: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
                fontWeight: 500,
                fontSize: 14,
                height: 46,
                padding: 0,
                border: '2px solid #000000 !important',
              },
              indicator: {
                display: 'none',
              },
              controlActive: {
                backgroundColor: '#BAFF26',
              },
              control: {
                backgroundColor: '#FFFFFF',
              },
            })}
          />
          <Text color="#000000B2">{t('create.raydium_sub')}</Text>
        </div>
        <Center>
          <PrimaryButton h={72} fullWidth={false} type="submit">
            <Text color="#FFFFFF" size={32}>
              Create Your Meme
            </Text>
          </PrimaryButton>
        </Center>
        {/* 连接钱包按钮 */}
        <Center>
          <PrimaryButton h={72} fullWidth={false}>
            Connect Wallet
          </PrimaryButton>
        </Center>
      </Stack>
    </form>
  );
};

export default memo(CreateTokenForm);
