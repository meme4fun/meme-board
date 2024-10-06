import React, { useEffect, useImperativeHandle, useMemo } from 'react';
import { useState, useRef, useContext } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { createStyles, Space, Table, TableProps } from '@asuikit/core';
import { useScroll, useSize } from 'ahooks';

type StylesType = {
  tdColor?: string;
  tdHoverColor?: string;
};

const useStyles = createStyles(
  (
    theme,
    props: {
      fixedLeft: number;
      fixedRight: number;
      column: ColumnType[];
      styles?: StylesType;
    },
  ) => {
    const { styles } = props;
    const colors = theme.other.colors;

    const { fixedLeft = 0, fixedRight = 0 } = props;

    const _table = {};
    if (fixedLeft > 0) {
      const fixedLeftStyle = {};

      _table['.virtual-table-header-table,.virtual-table-table'] = {
        'td,th': fixedLeftStyle,
      };

      for (let i = 0; i < fixedLeft; i++) {
        fixedLeftStyle[`&:nth-of-type(${i + 1})`] = {
          background: styles?.tdColor || colors.Black4,
          zIndex: 2,
          position: 'sticky',
          left: i === 0 ? 0 : props.column[i - 1].width,
        };
      }

      const length = props.column.length;
      for (let i = 0; i < fixedRight; i++) {
        fixedLeftStyle[`&:nth-last-of-type(${i + 1})`] = {
          background: styles?.tdColor || colors.Black4,
          zIndex: 2,
          position: 'sticky',
          right: i === 0 ? 0 : props.column[length - i].width,
        };
      }

      _table['&.scroll-horizontal'] = {
        '.virtual-table-header-table,.virtual-table-table': {
          'td,th': {
            [`&:nth-of-type(${props.fixedLeft})`]: props.fixedLeft
              ? {
                  '&:before': {
                    content: '""',
                    height: '100%',
                    width: '1px',
                    background: colors.Black1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                  },
                  '&:after': {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: '-1px',
                    width: 30,
                    transform: 'translateX(100%)',
                    transition: 'box-shadow 0.3s',
                    content: '""',
                    pointerEvents: 'none',
                    boxShadow: 'inset 10px 0 8px -8px rgb(253 253 253 / 12%)',
                  },
                }
              : {},
          },
        },
      };

      _table['&.horizontal-scroll-bar:not(.scroll-horizontal-end)'] = {
        '.virtual-table-header-table,.virtual-table-table': {
          'td,th': {
            [`&:nth-last-of-type(${props.fixedRight}) `]: props.fixedRight
              ? {
                  '&:before': {
                    content: '""',
                    height: '100%',
                    width: '1px',
                    background: colors.Black1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                  },
                  '&:after': {
                    position: 'absolute',
                    top: 0,
                    left: -30,
                    bottom: '-1px',
                    width: 30,
                    // transform: 'translateX(100%)',
                    transition: 'box-shadow 0.3s',
                    content: '""',
                    pointerEvents: 'none',
                    boxShadow: 'inset -10px 0 8px -8px rgb(253 253 253 / 12%)',
                  },
                }
              : {},
          },
        },
      };
    }

    return {
      table: {
        ..._table,
        '&.fixed-header': {
          '.virtual-table-header-table': {
            position: 'sticky',
            top: 0,
            zIndex: 101,
          },
        },
        '.virtual-table-inner-box': {
          position: 'relative',
        },
        table: {
          tableLayout: 'fixed',
          'thead tr th': {
            background: styles?.tdColor || colors.Black4,
            zIndex: 1,
          },
          'tbody tr td': {
            background: styles?.tdColor || colors.Black4,
          },
        },
        'table[data-hover]': {
          'tbody tr': {
            ...theme.fn.hover({
              background: styles?.tdHoverColor || colors.Black2,
              td: {
                background: styles?.tdHoverColor || colors.Black2,
              },
            }),
          },
        },
      },
    };
  },
);

type ColumnType = { width?: number; minWidth?: number };

/** Context for cross component communication */
const VirtualTableContext = React.createContext<{
  top: number;
  setTop: (top: number) => void;
  header: React.ReactNode;
  footer: React.ReactNode;
  tableProps?: TableProps;
  column: ColumnType[];
  noDataRender?: () => React.ReactNode;
  isNoData?: boolean;
}>({
  top: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTop: (value: number) => {},
  header: <></>,
  footer: <></>,
  column: [],
  noDataRender: () => null,
  isNoData: false,
});

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/
function VirtualTable(
  {
    row,
    header,
    footer,
    tableProps,
    column = [],
    fixedLeft = 0,
    fixedRight = 0,
    styles,
    noDataRender,
    isNoData,
    ...rest
  }: {
    column?: ColumnType[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
    tableProps?: TableProps;
    fixedLeft?: number;
    fixedRight?: number;
    styles?: StylesType;
    row: FixedSizeListProps['children'];
    noDataRender?: () => React.ReactNode;
    isNoData?: boolean;
  } & Omit<FixedSizeListProps, 'children' | 'innerElementType'>,
  ref,
) {
  const { cx, classes } = useStyles({ fixedLeft, fixedRight, column, styles });
  const listRef = useRef<FixedSizeList | null>();
  const [top, setTop] = useState(0);

  const outerRef: HTMLDivElement = (listRef.current as any)?._outerRef;
  const hasHorizontalBar = outerRef?.scrollWidth > outerRef?.clientWidth;
  const size = useSize(outerRef);

  const scroll = useScroll(outerRef);

  const extraClassNames = useMemo(
    () => ({
      'fixed-header': 1,
      'horizontal-scroll-bar': hasHorizontalBar,
      'scroll-horizontal': (scroll?.left ?? 0) > 0,
      'scroll-horizontal-end':
        (scroll?.left ?? 0) + (size?.width ?? 0) >=
        (outerRef?.scrollWidth ?? 0),
    }),
    [outerRef?.scrollWidth, scroll?.left, size?.width],
  );

  return (
    <VirtualTableContext.Provider
      value={{
        top,
        setTop,
        header,
        footer,
        tableProps,
        column,
        noDataRender,
        isNoData,
      }}
    >
      <FixedSizeList
        {...rest}
        className={cx(
          'virtual-table',
          extraClassNames,
          classes.table,
          rest.className,
        )}
        innerElementType={Inner}
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            // @ts-ignore private method access
            listRef.current._getItemStyle(props.overscanStartIndex);
          if (style && style.top != null) {
            setTop(style.top);
          }

          // Call the original callback
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
        ref={(el) => {
          listRef.current = el;
          ref?.(el);
        }}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
}

export default React.forwardRef(VirtualTable);

/**
 * The Inner component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * Other than that, render an optional header and footer.
 **/
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Inner({ children, ...rest }, ref) {
    const { header, footer, top, tableProps, column, noDataRender, isNoData } =
      useContext(VirtualTableContext);

    const renderColGroup = () => (
      <colgroup>
        {column.map((c, index) => (
          <col key={index} style={c} />
        ))}
      </colgroup>
    );

    const headerRef = useRef<HTMLTableElement>(null);
    const headerSize = useSize(headerRef);

    const style = useMemo(
      () => ({
        ...rest.style,
        height: isNoData
          ? 'auto'
          : Number(rest.style?.height ?? 0) + (headerSize?.height ?? 0),
      }),
      [headerSize?.height, isNoData, rest.style],
    );

    return (
      <div
        {...rest}
        style={style}
        ref={ref}
        className={'virtual-table-inner-box'}
      >
        <Table ref={headerRef} className="virtual-table-header-table">
          {renderColGroup()}
          {header}
        </Table>

        <div
          style={{
            top,
            position: 'absolute',
            paddingTop: headerSize?.height ?? 0,
            willChange: 'auto',
            width: '100%',
            zIndex: 100,
          }}
        >
          {!isNoData && (
            <Table {...tableProps} className="virtual-table-table">
              {renderColGroup()}
              {/* {header} */}
              <tbody className="virtual-table-tbody">{children}</tbody>
              {footer}
            </Table>
          )}

          {isNoData && noDataRender?.()}
        </div>
      </div>
    );
  },
);
