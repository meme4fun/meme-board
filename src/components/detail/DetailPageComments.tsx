import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RiEditLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useRequest } from 'ahooks';
import { getTickerComments } from '@/services/api/meme4fun.api';
import { truncateAddress } from '@/utils';
import { ScrollArea } from '@asuikit/core';

interface DetailPageCommentsProps {
  _?: any;
}

const DetailPageComments: React.FC<DetailPageCommentsProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug }: any = router.query || '';
  console.log(slug);

  const { data } = useRequest(async () => {
    return await getTickerComments(slug);
  });

  return (
    <div className="custom-scrollbar relative max-h-[320px] overflow-y-scroll px-6 py-3">
      <div className="center absolute right-6 top-3 size-[34px] cursor-pointer border-2 border-black bg-[#BAFF26] p-2">
        <RiEditLine size={18} />
      </div>
      {data?.list?.map((comment, index) => (
        <div key={index} className="py-2">
          <div className="flex items-center gap-2">
            <img
              src={comment.user_avatar}
              alt=""
              className="block size-6 rounded-full border-2 border-black"
            />
            <div className="border-2 border-black px-2 py-1 text-sm leading-none">
              {truncateAddress(comment.user_account)}
            </div>
          </div>
          <div className="mt-2 bg-[#95A6FF33]/20 p-2 text-sm">
            {comment.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(DetailPageComments);
