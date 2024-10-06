import { ethers } from 'ethers';
import { useMemo, useState } from 'react';
import slice from 'lodash/slice';
import { chunk } from 'lodash';

export const usePagination = <TList>(
  list: TList[],
  pageSize = 10,
  currentPageNum = 1,
): {
  currentPageList: TList[];
  currentPage: number;
  setCurrentPage: (number) => void;
  pageTotalNum: number;
  pageSize: number;
} => {
  const [currentPage, setCurrentPage] = useState<number>(currentPageNum);

  const pageTotalNum = useMemo<number>(() => {
    const length = list?.length || 0;
    return Math.ceil(length / pageSize);
  }, [pageSize, list]);

  const currentPageList = useMemo(() => {
    const chunks = chunk(list, pageSize);
    return chunks[currentPage - 1] || [];
  }, [list, pageSize, currentPage]);

  return {
    currentPageList,
    currentPage,
    setCurrentPage,
    pageTotalNum,
    pageSize,
  };
};
