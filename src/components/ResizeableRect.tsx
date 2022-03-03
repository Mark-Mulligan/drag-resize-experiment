import { useState, useCallback, useEffect } from 'react';

const ResizeableRect = () => {
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStartingPos, setMouseStartingPos] = useState({ x: 0, y: 0 });

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        let xDiff = e.screenX - mouseStartingPos.x;
        let yDiff = e.screenY - mouseStartingPos.y;

        const lastPosition = { ...position };
        setPosition({ top: lastPosition.top + yDiff, left: lastPosition.left + xDiff });
      }
    },
    [mouseStartingPos.x, mouseStartingPos.y, isDragging],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseStartingPos({ x: e.screenX, y: e.screenY });
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    setIsDragging(false);
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
        height: 100,
        width: 200,
        border: '2px solid green',
      }}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      <div
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
