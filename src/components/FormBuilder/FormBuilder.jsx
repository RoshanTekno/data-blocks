import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useForm } from '../../context/FormContext';
import ComponentPreview from '../FormComponents/ComponentPreview';
import FormBuilderCanvas from './FormBuilderCanvas';
import FormBuilderHeader from './FormBuilderHeader';
import FormBuilderProperties from './FormBuilderProperties';
import FormBuilderSidebar from './FormBuilderSidebar';

const FormBuilder = () => {
  const {
    formState,
    draggedComponent,
    setDraggedComponent,
    addComponent,
    reorderComponents,
    addComponentToTab,      // already present
    addComponentToColumn    // <-- implement this in your context/provider
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

    const activeId = active.id;
    const overId = over.id;
    const components = formState.components;

    // Handle drop into a tab
    if (overId && typeof overId === 'string' && overId.startsWith('tab-')) {
      // overId format: tab-<tabsComponentId>-<tabIdx>
      const [, tabsComponentId, tabIdxStr] = overId.split('-');
      const tabIdx = parseInt(tabIdxStr, 10);

      if (active.data?.current?.isNew) {
        const { type, label, suggestedKey } = active.data.current;
        addComponentToTab(
          tabsComponentId,
          tabIdx,
          type,
          { label, suggestedKey }
        );
      }
      // Optionally: handle reordering/moving existing fields between tabs here

      setDraggedComponent(null);
      return;
    }

    // Handle drop into a column
    if (overId && typeof overId === 'string' && overId.startsWith('column-')) {
      // overId format: column-<columnsComponentId>-<columnIdx>
      const [, columnsComponentId, columnIdxStr] = overId.split('-');
      const columnIdx = parseInt(columnIdxStr, 10);

      if (active.data?.current?.isNew) {
        const { type, label, suggestedKey } = active.data.current;
        addComponentToColumn(
          columnsComponentId,
          columnIdx,
          type,
          { label, suggestedKey }
        );
      }
      // Optionally: handle reordering/moving existing fields between columns here

      setDraggedComponent(null);
      return;
    }

    // Default: drop on main canvas
    const oldIndex = components.findIndex(c => c.id === activeId);
    const newIndex = components.findIndex(c => c.id === overId);

    if (active.data?.current?.isNew) {
      const { type, label, suggestedKey } = active.data.current;
      let options = { label, suggestedKey };
      if (type === 'tabs') {
        options.tabs = [
          { label: 'Tab 1', components: [] },
          { label: 'Tab 2', components: [] }
        ];
      }
      addComponent(
        type,
        newIndex === -1 ? components.length : newIndex,
        options
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