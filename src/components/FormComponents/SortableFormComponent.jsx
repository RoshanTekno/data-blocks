import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableFormComponent = ({ component }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    background: isDragging ? '#f3f4f6' : undefined,
    marginLeft: component.depth ? component.depth * 16 : 0, // Indent for nesting
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* Render your component UI here */}
      <div>{component.type}</div>
      {/* Render children recursively */}
      {component.children && component.children.length > 0 && (
        <div className="pl-4">
          {component.children.map(child => (
            <SortableFormComponent key={child.id} component={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SortableFormComponent;