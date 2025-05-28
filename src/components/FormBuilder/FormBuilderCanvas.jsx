import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useForm } from '../../context/FormContext';
import SortableFormComponent from '../FormComponents/SortableFormComponent';
import { motion } from 'framer-motion';

const FormBuilderCanvas = () => {
  const { formState } = useForm();
  const { components } = formState;

  // Recursive renderer for nested components
  const renderComponent = (component, index) => {
    let content = null;
    if (component.type === 'tabs') {
      content = <TabsContainer component={component} renderComponent={renderComponent} />;
    } else if (component.type === 'columns') {
      content = <ColumnsContainer component={component} renderComponent={renderComponent} />;
    } else if (component.components) {
      content = (
        <PanelContainer component={component}>
          {component.components.map((child, idx) => renderComponent(child, idx))}
        </PanelContainer>
      );
    }

    return (
      <SortableFormComponent key={component.id} component={component} index={index}>
        {content}
      </SortableFormComponent>
    );
  };

  return (
    <div
      ref={useDroppable({ id: 'form-canvas' }).setNodeRef}
      className="flex-1 p-6 overflow-y-auto bg-gray-50"
    >
      <div className="mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[300px]">
          <SortableContext items={components.map((comp) => comp.id)} strategy={verticalListSortingStrategy}>
            {components.map((component, index) => renderComponent(component, index))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

// Tabs container
const TabsContainer = ({ component, renderComponent }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = component.tabs || [];
  return (
    <div className="mb-4">
      <div className="flex border-b border-gray-200 bg-gray-50 rounded-t">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            className={`px-4 py-2 text-sm font-medium border-r last:border-r-0 focus:outline-none ${
              idx === activeTab
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label || `Tab ${idx + 1}`}
          </button>
        ))}
      </div>
      <div className="p-4 border border-t-0 border-gray-200 rounded-b">
        <TabDroppable
          componentId={component.id}
          tabIdx={activeTab}
          tab={tabs[activeTab]}
          renderComponent={renderComponent}
        />
      </div>
    </div>
  );
};

// Columns container
const ColumnsContainer = ({ component, renderComponent }) => {
  const columns = component.columns || [];
  return (
    <div className="mb-4">
      <div className="flex -mx-2">
        {columns.map((column, idx) => (
          <div key={idx} className="px-2 flex-1">
            <div className="mb-2 text-xs text-gray-500">Column {idx + 1}</div>
            <ColumnDroppable
              componentId={component.id}
              columnIdx={idx}
              column={column}
              renderComponent={renderComponent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Panel or generic container
const PanelContainer = ({ component, children }) => {
  const { setNodeRef } = useDroppable({
    id: component.id,
    data: {
      type: 'container',
      componentId: component.id,
    },
  });
  return (
    <div ref={setNodeRef} className="mb-4 border border-dashed border-gray-200 rounded p-2 bg-gray-50">
      {children}
    </div>
  );
};

// Droppable area for a tab
const TabDroppable = ({ componentId, tabIdx, tab, renderComponent }) => {
  const { setNodeRef } = useDroppable({
    id: `tab-${componentId}-${tabIdx}`,
    data: {
      type: 'tab',
      componentId,
      tabIdx,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[60px] border-2 border-dashed border-gray-200 rounded-md p-2 bg-gray-50"
    >
      {(tab?.components || []).length > 0 ? (
        tab.components.map((child, i) => (
          <React.Fragment key={child.id || i}>
            {renderComponent(child, i)}
          </React.Fragment>
        ))
      ) : (
        <div className="text-gray-400 text-sm text-center py-4">Drop fields here</div>
      )}
    </div>
  );
};

// Droppable area for a column
const ColumnDroppable = ({ componentId, columnIdx, column, renderComponent }) => {
  const { setNodeRef } = useDroppable({
    id: `column-${componentId}-${columnIdx}`,
    data: {
      type: 'column',
      componentId,
      columnIdx,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[60px] border-2 border-dashed border-gray-200 rounded-md p-2 bg-gray-50"
    >
      {(column?.components || []).length > 0 ? (
        column.components.map((child, i) => (
          <React.Fragment key={child.id || i}>
            {renderComponent(child, i)}
          </React.Fragment>
        ))
      ) : (
        <div className="text-gray-400 text-sm text-center py-4">Drop fields here</div>
      )}
    </div>
  );
};

export default FormBuilderCanvas;