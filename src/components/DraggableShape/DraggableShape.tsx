import React, { useState, MouseEvent, WheelEvent } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';


interface Shape {
  id: string;
  type: 'rectangle' | 'circle';
}

interface Position {
  x: number;
  y: number;
}

interface DraggableShapeProps {
  shape: Shape;
  position: Position;
  onShapeDrag: (id: string, position: Position) => void;
  color?: string;
  editMenu: boolean;
}

const DraggableShape = ({ shape, position, onShapeDrag, color, editMenu }: DraggableShapeProps) => {
  const [sizeRectangle, setSizeRectangle] = useState<{ width: number; height: number }>({ width: 100, height: 50 });
  const [sizeCircle, setSizeCircle] = useState<{ width: number; height: number }>({ width: 70, height: 70 });

  const handleDrag: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
  if (onShapeDrag !== null) {
    onShapeDrag(shape.id, { x: data.x, y: data.y });
  }
};

  const handleMouseScroll = (e: WheelEvent) => {
    const delta = Math.max(-1, Math.min(1, e.deltaY));
    setSizeCircle((prevSize) => ({
      width: prevSize.width + delta * 10,
      height: prevSize.height + delta * 10,
    }));
    setSizeRectangle((prevSize) => ({
      width: prevSize.width + delta * 10,
      height: prevSize.height + delta * 10,
    }));
  };

  return (
    <Draggable handle=".shape" position={position} onDrag={handleDrag}>
      <div className="shape" onWheel={editMenu ? handleMouseScroll : undefined}>
        {shape.type === 'rectangle' && (
          <div
            style={{
              zIndex: '1000',
              position: 'absolute',
              width: sizeRectangle.width,
              height: sizeRectangle.height,
              backgroundColor: color ? color : 'red',
              borderRadius: '5px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        {shape.type === 'circle' && (
          <div
            style={{
              zIndex: '1000',
              position: 'absolute',
              width: sizeCircle.width,
              height: sizeCircle.height,
              backgroundColor: color ? color : 'blue',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>
    </Draggable>
  );
};

export default DraggableShape;
