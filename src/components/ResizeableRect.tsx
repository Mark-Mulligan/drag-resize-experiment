import { HtmlHTMLAttributes, MouseEvent, useState } from 'react';
import styles from '../styles/ResizeableRect.module.scss';

const ResizeableRect = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
    setIsDragging(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
    setIsDragging(false);
  };

  return (
    <div
      className={isDragging ? 'dragging' : 'draggable'}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        height: 100,
        width: 200,
        border: '2px solid green',
      }}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    ></div>
  );
};

export default ResizeableRect;
