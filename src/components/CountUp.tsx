import React, { useEffect, useMemo, useRef, useState } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { isBrowser } from '@/utils';
import { isNil } from 'lodash';

interface CountUpProps {
  startNum?: number;
  num?: number;
  children?: number;
  decimals?: number;
}

const CountUpCom: React.FC<CountUpProps> = ({
  startNum = 0,
  num = 0,
  children,
  decimals = undefined,
}) => {
  const [startNumState, setStartNumState] = useState(startNum);
  const numData = useRef(num || 0);
  const childrenNum = Number(children);
  const defaultNum = useMemo(() => {
    if (childrenNum) {
      return Number(childrenNum);
    }
    return num;
  }, [num, childrenNum]);
  useEffect(() => {
    if (childrenNum) {
      numData.current = Number(childrenNum);
      return;
    }
    if (num) numData.current = num;
  }, [num, childrenNum]);

  const showDecimalsNum = useMemo(() => {
    if (!isNil(decimals)) {
      return decimals;
    }
    const numString = String(defaultNum);
    if (numString.indexOf('.') > -1) {
      const str = numString.split('.')[1];
      return str.length;
    }
    return 0;
  }, [defaultNum]);
  const startNumRef = useRef(0);
  if (!isBrowser) return null;

  function onEnd() {
    startNumRef.current = defaultNum;
  }

  return (
    <CountUp
      start={startNumRef.current}
      end={defaultNum}
      delay={0}
      decimals={showDecimalsNum}
      separator=","
      duration={0.8}
      onEnd={onEnd}
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
};

export default CountUpCom;
