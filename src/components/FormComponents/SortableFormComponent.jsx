import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useForm } from '../../context/FormContext';
import ComponentPreview from './ComponentPreview';

const SortableFormComponent = ({ component, index, children }) => {
  const { selectedComponent, setSelectedComponent } = useForm();
  const isSelected = selectedComponent && selectedComponent.id === component.id;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    data: {
      type: component.type,
      index,
      id: component.id,
      isNew: false,
    },
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    position: 'relative',
    zIndex: isSelected ? 1 : 'auto',
  };
  
  const handleSelect = (e) => {
    e.stopPropagation();
    setSelectedComponent(component);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleSelect}
      className={`mb-4 relative form-component ${isSelected ? 'selected' : ''}`}
      data-component-id={component.id}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start group">
        <div
          className="cursor-grab p-2 text-gray-400 hover:text-gray-600 drag-handle opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="1"></circle>
            <circle cx="8" cy="16" r="1"></circle>
            <circle cx="16" cy="8" r="1"></circle>
            <circle cx="16" cy="16" r="1"></circle>
          </svg>
        </div>
        
        <div className="flex-1">
          <ComponentPreview component={component} isSelected={isSelected} />
          {/* Show tab info if this is a tab */}
          {component.type === 'tabs' && component.tabs && (
            <div className="mt-2 text-xs text-gray-500">
              {component.tabs.length} tab{component.tabs.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default SortableFormComponent;