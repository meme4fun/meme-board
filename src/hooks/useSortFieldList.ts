import { get, orderBy, sortBy } from 'lodash';
import { useMemo, useState } from 'react';

export function useSortFieldList<T>(
  list?: T[],
  options?: {
    nilFixedBottom: boolean;
  },
) {
  const [[sortField = '', sortType = ''], setSort] = useState<
    [string, '' | 'asc' | 'desc']
  >(['', '']);

  const sortList = useMemo(() => {
    const nullPlaceholder =
      sortType === 'asc' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
    if (!sortField || !sortType) return list || [];
    return orderBy(
      list,
      (item) =>
        get(item, sortField) || (options?.nilFixedBottom ? nullPlaceholder : 0),
      sortType,
    );
  }, [list, options?.nilFixedBottom, sortField, sortType]);

  return {
    sortField,
    sortType,
    sortList,
    getSortFieldValue: (_field: string) => {
      if (_field === sortField) {
        return sortType;
      }
      return '';
    },
    makeSortChange: (_field: string, inputType?: 'asc' | 'desc') => () => {
      setSort(([field, type]) => {
        if (inputType) {
          return [_field, inputType];
        }

        if (field !== _field || type === '') {
          return [_field, 'asc'];
        }
        if (type === 'asc') {
          return [_field, 'desc'];
        }
        if (type === 'desc') {
          return [_field, ''];
        }
        return ['', ''];
      });
    },
  };
}
