import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RiEditLine } from 'react-icons/ri';

interface DetailPageHolderProps {
  _?: any;
}

const DetailPageHolder: React.FC<DetailPageHolderProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="custom-scrollbar relative grid max-h-[320px] grid-cols-10 gap-2 overflow-y-auto p-6">
      {Array(20)
        .fill('')
        .map((_, index) => (
          <div key={index} className="col-span-2 border-2 border-black">
            <div className="bg-[#95A6FF]/20 px-3 py-2">
              <div>
                <div className="inline-block border-2 border-black bg-[#BAFF26] px-2 py-1 font-semibold">
                  # 01
                </div>
              </div>
              <div className="center mt-1">
                <img
                  src="https://img.reservoir.tools/images/v2/mainnet/z9JRSpLYGu7%2BCZoKWtAuAN8iFUBquMVkdFDiFCj3JpbzDu9xTFxPpSBODSki%2FlUPBVfTQpVzNPyAnijwVYrUXBFjhw32P%2FHRDoFkQFKJ7fjibaeGFEfYML5Fg8MS6UsVk2gPfIc%2Blv%2F6DWy47KZBET2%2BI5OAsueD51TDcPISxdDic6wGT5qJBJwT2Z4rJpDqKMbLuGKjUlcSPSFpvalbL4ZcZV4bHggg5L22Wl2xSQLnOERwTE0hG0mGmd5UEvr%2BbJTjbQphICehEe1e4tcumi1DOmA8DnC7FNWoTAFiuSQ%3D?width=250"
                  alt=""
                  className="block size-[60px] rounded-full border-[3px] border-solid border-black"
                />
              </div>
              <div className="center font-semibold">0xff12...C4638f</div>
            </div>
            <div className="mt-1 text-center text-sm opacity-60">
              {t('meme4fun.percentage')}
            </div>
            <div className="mt-1 text-center text-sm">60%</div>
          </div>
        ))}
    </div>
  );
};

export default memo(DetailPageHolder);
