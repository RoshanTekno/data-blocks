import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useForm } from '../../context/FormContext';
import SortableFormComponent from '../FormComponents/SortableFormComponent';
import { motion } from 'framer-motion';

const FormBuilderCanvas = () => {
  const { formState } = useForm();
  const { components } = formState;
  
  // Create droppable area with explicit data
  const { setNodeRef } = useDroppable({
    id: 'form-canvas',
    data: {
      type: 'canvas',
      index: components.length, // Default to end of list
    }
  });
  
  // Generate unique IDs for SortableContext
  const itemIds = components.map((comp) => comp.id);

  // Empty state when no components have been added
  if (components.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50"
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto"
          >
            <div className="text-gray-400 mb-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Building Your Form</h3>
            <p className="text-gray-500 mb-4">
              Drag and drop components from the sidebar to create your form. 
              Add fields, layout elements, and more to build your perfect form.
            </p>
            <div className="border-2 border-dashed border-gray-200 rounded-md p-4 bg-gray-50 text-gray-400">
              Drop components here
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className="flex-1 p-6 overflow-y-auto bg-gray-50"
    >
      <div className="mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[300px]">
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {components.map((component, index) => (
              <SortableFormComponent
                key={component.id}
                component={component}
                index={index}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderCanvas;