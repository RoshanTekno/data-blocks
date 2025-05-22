import React from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import FormBuilderHeader from './FormBuilderHeader';
import FormBuilderSidebar from './FormBuilderSidebar';
import FormBuilderCanvas from './FormBuilderCanvas';
import FormBuilderProperties from './FormBuilderProperties';
import { useForm } from '../../context/FormContext';
import ComponentPreview from '../FormComponents/ComponentPreview';

const FormBuilder = () => {
  const { 
    formState, 
    draggedComponent, 
    setDraggedComponent,
    addComponent,
    reorderComponents
  } = useForm();

  // Configure DnD sensors with lower activation constraints
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // Reduced from 10 to make dragging more sensitive
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100, // Reduced from 250 to make touch dragging more responsive
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data?.current) {
      setDraggedComponent(active.data.current);
    }
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setDraggedComponent(null);
      return;
    }

    // Always resolve index from latest components array
    const activeId = active.id;
    const overId = over.id;
    const components = formState.components;

    const oldIndex = components.findIndex(c => c.id === activeId);
    const newIndex = components.findIndex(c => c.id === overId);

    if (active.data?.current?.isNew) {
      // New component from sidebar
      // Use type, label, and suggestedKey from drag data
      const { type, label, suggestedKey } = active.data.current;
      addComponent(
        type,
        newIndex === -1 ? components.length : newIndex,
        { label, suggestedKey }
      );
    } else if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      reorderComponents(oldIndex, newIndex);
    }

    setDraggedComponent(null);
  };

  // Handle drag cancel
  const handleDragCancel = () => {
    setDraggedComponent(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col h-full">
        <FormBuilderHeader />
        
        <div className="flex flex-1 overflow-hidden">
          <FormBuilderSidebar />
          
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
            <FormBuilderCanvas />
            <FormBuilderProperties />
          </div>
        </div>
        
        <DragOverlay dropAnimation={null}>
          {draggedComponent ? (
            <div className="opacity-70 w-full max-w-lg">
              <ComponentPreview component={draggedComponent} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default FormBuilder;