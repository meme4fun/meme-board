import { omit } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';

interface SVGProps {
  id: string;
  children: React.ReactElement;
}

const initedIds = new Set<string>();

const SVG: React.FC<SVGProps> = ({ id, children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!initedIds.has(id)) {
      initedIds.add(id);
      console.log('🚀 ~ file: index.tsx ~ line 11 ~ children', children);
      const symbolHTML = ReactDOMServer.renderToString(
        React.createElement(
          'symbol',
          {
            viewBox: children.props.viewBox,
            id,
          },
          [children.props.children],
        ),
      );
      // const template = document.createElement('template');
      // template.innerHTML = symbolHTML;
      const gsvg = document.querySelector('#__svg');
      if (gsvg) {
        gsvg.innerHTML += symbolHTML;
      }
    }
    setTimeout(() => setReady(true), 100);
  }, [children, id]);

  // if (!ready) return null;

  return (
    <svg
      xmlns="http://ww.w3.org/2000/svg"
      {...omit(children.props, 'children')}
    >
      <use xlinkHref={`#${id}`} />
    </svg>
  );
};

export default memo(SVG);
