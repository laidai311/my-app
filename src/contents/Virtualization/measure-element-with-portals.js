import React from 'react';
import ReactDOM from 'react-dom';

const measureElement = (element, layerId = 'measure-layer') => {
  const measureLayer = document.getElementById(layerId);

  const renderedElement = ReactDOM.createPortal(element, measureLayer);

  const height = renderedElement.clientHeight;
  const width = renderedElement.clientWidth;

  ReactDOM.unmountComponentAtNode(measureLayer);

  return { height, width };
};

export default measureElement;
