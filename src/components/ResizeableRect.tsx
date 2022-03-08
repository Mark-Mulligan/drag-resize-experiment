import React, { useState, useCallback, useEffect } from 'react';

const ResizeableRect = () => {
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const [rectDimensions, setRectDimensions] = useState({ height: 100, width: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeType, setResizeType] = useState('');
  const [mouseStartingPos, setMouseStartingPos] = useState({ x: 0, y: 0 });

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging || resizeType) {
        let xDiff = e.screenX - mouseStartingPos.x;
        let yDiff = e.screenY - mouseStartingPos.y;

        if (isDragging) {
          const lastPosition = { ...position };
          setPosition({ top: lastPosition.top + yDiff, left: lastPosition.left + xDiff });
        } else if (resizeType === 'bottomRight') {
          const lastDimensions = { ...rectDimensions };
          setRectDimensions({ height: lastDimensions.height + yDiff, width: lastDimensions.width + xDiff });
        } else if (resizeType === 'topLeft') {
          const lastDimensions = { ...rectDimensions };
          setRectDimensions({ height: lastDimensions.height - yDiff, width: lastDimensions.width - xDiff });
          setPosition({ top: position.top + yDiff, left: position.left + xDiff });
        }
      }
    },
    [mouseStartingPos.x, mouseStartingPos.y, isDragging, resizeType],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseStartingPos({ x: e.screenX, y: e.screenY });
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement>, resizeName: string) => {
    e.stopPropagation();
    setMouseStartingPos({ x: e.screenX, y: e.screenY });
    setResizeType(resizeName);
  };

  const handleCornerRelease = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResizeType('');
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag);

    return () => window.removeEventListener('mousemove', handleDrag);
  }, [handleDrag]);

  return (
    <div
      className={isDragging ? 'dragging' : 'draggable'}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        height: rectDimensions.height,
        width: rectDimensions.width,
        border: '2px solid green',
      }}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      <div
        className="topLeftBottomRightResize"
        onMouseDown={(e) => handleResize(e, 'topLeft')}
        onMouseUp={(e) => handleCornerRelease(e)}
        style={{
          position: 'absolute',
          top: -6,
          left: -6,
          height: 12,
          width: 12,
          border: '1px solid black',
          background: 'white',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          height: 12,
          width: 12,
          border: '1px solid black',
          background: 'white',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          left: -6,
          height: 12,
          width: 12,
          border: '1px solid black',
          background: 'white',
        }}
      />
      <div
        className="topLeftBottomRightResize"
        onMouseDown={(e) => handleResize(e, 'bottomRight')}
        onMouseUp={(e) => handleCornerRelease(e)}
        style={{
          position: 'absolute',
          bottom: -6,
          right: -6,
          height: 12,
          width: 12,
          border: '1px solid black',
          background: 'white',
        }}
      />
    </div>
  );
};

export default ResizeableRect;
