import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  // Form state with initial form structure
  const [formState, setFormState] = useState({
    title: 'Untitled Form',
    description: '',
    components: [],
    display: 'form',
    settings: {
      submitButton: {
        text: 'Submit',
        action: 'submit',
        theme: 'primary',
      },
    },
  });

  // History for undo/redo functionality
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Selected component
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Component being dragged
  const [draggedComponent, setDraggedComponent] = useState(null);

  // Add form state to history
  const addToHistory = useCallback((state) => {
    setHistory(prev => {
      // If we've gone back in history and made a change, remove future states
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, state];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Update form state with history tracking
  const updateFormState = useCallback((updater) => {
    const newState = produce(formState, updater);
    setFormState(newState);
    addToHistory(newState);
  }, [formState, addToHistory]);

  // Initialize history with initial state
  useEffect(() => {
    if (history.length === 0) {
      addToHistory(formState);
    }
  }, [formState, history.length, addToHistory]);

  // Undo changes
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setFormState(history[historyIndex - 1]);
      toast.info('Undo successful');
    } else {
      toast.info('Nothing to undo');
    }
  }, [history, historyIndex]);

  // Redo changes
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setFormState(history[historyIndex + 1]);
      toast.info('Redo successful');
    } else {
      toast.info('Nothing to redo');
    }
  }, [history, historyIndex]);

  // Add a component to the form
  const addComponent = useCallback((componentType, index = -1) => {
    updateFormState(draft => {
      const newComponent = createComponent(componentType);
      
      if (index === -1) {
        // Add to the end
        draft.components.push(newComponent);
      } else {
        // Insert at specific index
        draft.components.splice(index, 0, newComponent);
      }
    });
    
    toast.success(`Added ${componentType} component`);
  }, [updateFormState]);

  // Remove a component from the form
  const removeComponent = useCallback((componentId) => {
    updateFormState(draft => {
      const index = draft.components.findIndex(c => c.id === componentId);
      if (index !== -1) {
        draft.components.splice(index, 1);
      }
    });
    
    // Deselect if the removed component was selected
    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(null);
    }
    
    toast.success('Component removed');
  }, [updateFormState, selectedComponent]);

  // Update a component's properties
  const updateComponent = useCallback((componentId, updates) => {
    updateFormState(draft => {
      const component = draft.components.find(c => c.id === componentId);
      if (component) {
        Object.assign(component, updates);
      }
    });
    
    // Update selected component if it's the one being modified
    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(prev => ({
        ...prev,
        ...updates,
      }));
    }
  }, [updateFormState, selectedComponent]);

  // Reorder components (drag and drop)
  const reorderComponents = useCallback((startIndex, endIndex) => {
    if (startIndex === endIndex) return;
    
    updateFormState(draft => {
      const [removed] = draft.components.splice(startIndex, 1);
      draft.components.splice(endIndex, 0, removed);
    });
  }, [updateFormState]);

  // Update form metadata
  const updateFormMetadata = useCallback((updates) => {
    updateFormState(draft => {
      Object.assign(draft, updates);
    });
  }, [updateFormState]);

  // Export form schema as JSON
  const exportFormSchema = useCallback(() => {
    return JSON.stringify(formState, null, 2);
  }, [formState]);

  // Import form schema from JSON
  const importFormSchema = useCallback((jsonSchema) => {
    try {
      const parsedSchema = JSON.parse(jsonSchema);
      setFormState(parsedSchema);
      addToHistory(parsedSchema);
      toast.success('Form imported successfully');
      return true;
    } catch (error) {
      toast.error('Failed to import form: Invalid JSON');
      console.error('Import error:', error);
      return false;
    }
  }, [addToHistory]);

  // Helper function to create a new component based on type
  const createComponent = (type) => {
    const baseComponent = {
      id: nanoid(),
      type,
      key: `${type}${Math.floor(Math.random() * 1000)}`,
      label: getDefaultLabel(type),
      placeholder: '',
      description: '',
      required: false,
    };

    // Add type-specific properties
    switch (type) {
      case 'textfield':
        return {
          ...baseComponent,
          inputType: 'text',
          validateOn: 'change',
          validate: {
            required: false,
            minLength: '',
            maxLength: '',
            pattern: '',
            custom: '',
          }
        };
      case 'textarea':
        return {
          ...baseComponent,
          autoExpand: false,
          rows: 3,
          validate: {
            required: false,
            minLength: '',
            maxLength: '',
          }
        };
      case 'number':
        return {
          ...baseComponent,
          validate: {
            required: false,
            min: '',
            max: '',
          }
        };
      case 'checkbox':
        return {
          ...baseComponent,
          value: false,
          defaultValue: false,
        };
      case 'selectboxes':
        return {
          ...baseComponent,
          values: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ],
          defaultValue: {},
          inline: false,
        };
      case 'select':
        return {
          ...baseComponent,
          data: {
            values: [
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ],
          },
          dataSrc: 'values',
          defaultValue: '',
          multiple: false,
        };
      case 'radio':
        return {
          ...baseComponent,
          values: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ],
          defaultValue: '',
          inline: false,
        };
      case 'email':
        return {
          ...baseComponent,
          validateOn: 'change',
          validate: {
            required: false,
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          }
        };
      case 'phoneNumber':
        return {
          ...baseComponent,
          validateOn: 'change',
          validate: {
            required: false,
            pattern: '^[0-9]{10}$',
          }
        };
      case 'datetime':
        return {
          ...baseComponent,
          format: 'yyyy-MM-dd',
          enableTime: false,
          enableDate: true,
          defaultValue: '',
          datepickerMode: 'day',
          validate: {
            required: false,
            min: '',
            max: '',
          }
        };
      case 'address':
        return {
          ...baseComponent,
          provider: 'google',
          manualMode: false,
          components: {
            address1: {
              label: 'Address 1',
              key: 'address1',
              placeholder: 'Enter your address',
              required: false,
            },
            address2: {
              label: 'Address 2',
              key: 'address2',
              placeholder: 'Apartment, suite, etc.',
              required: false,
            },
            city: {
              label: 'City',
              key: 'city',
              placeholder: 'Enter your city',
              required: false,
            },
            state: {
              label: 'State/Province',
              key: 'state',
              placeholder: 'Enter your state/province',
              required: false,
            },
            zip: {
              label: 'Postal Code',
              key: 'zip',
              placeholder: 'Enter your postal code',
              required: false,
            },
            country: {
              label: 'Country',
              key: 'country',
              placeholder: 'Enter your country',
              required: false,
            },
          }
        };
      case 'content':
        return {
          ...baseComponent,
          html: '<p>Content goes here</p>',
        };
      case 'button':
        return {
          ...baseComponent,
          action: 'submit',
          theme: 'primary',
          size: 'md',
          block: false,
          disableOnInvalid: true,
        };
      case 'panel':
        return {
          ...baseComponent,
          title: 'Panel',
          collapsible: false,
          collapsed: false,
          components: [],
        };
      case 'columns':
        return {
          ...baseComponent,
          columns: [
            { components: [], width: 6, offset: 0, push: 0, pull: 0 },
            { components: [], width: 6, offset: 0, push: 0, pull: 0 },
          ],
        };
      default:
        return baseComponent;
    }
  };

  // Helper function to get default label based on component type
  const getDefaultLabel = (type) => {
    const labels = {
      textfield: 'Text Field',
      textarea: 'Text Area',
      number: 'Number',
      checkbox: 'Checkbox',
      selectboxes: 'Select Boxes',
      select: 'Select',
      radio: 'Radio',
      email: 'Email',
      phoneNumber: 'Phone Number',
      datetime: 'Date / Time',
      address: 'Address',
      content: 'Content',
      button: 'Button',
      panel: 'Panel',
      columns: 'Columns',
    };
    
    return labels[type] || 'Untitled';
  };

  const value = {
    formState,
    selectedComponent,
    draggedComponent,
    setSelectedComponent,
    setDraggedComponent,
    addComponent,
    removeComponent,
    updateComponent,
    reorderComponents,
    updateFormMetadata,
    exportFormSchema,
    importFormSchema,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};