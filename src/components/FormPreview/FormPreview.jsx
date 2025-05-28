import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const getValidationRules = (component) => {
  const rules = {};
  const validate = component.validate || {};

  if (component.required || validate.required) {
    rules.required = 'This field is required';
  }
  if (validate.minLength) {
    rules.minLength = { value: parseInt(validate.minLength, 10), message: `Minimum length is ${validate.minLength}` };
  }
  if (validate.maxLength) {
    rules.maxLength = { value: parseInt(validate.maxLength, 10), message: `Maximum length is ${validate.maxLength}` };
  }
  if (validate.min) {
    rules.min = { value: parseFloat(validate.min), message: `Minimum value is ${validate.min}` };
  }
  if (validate.max) {
    rules.max = { value: parseFloat(validate.max), message: `Maximum value is ${validate.max}` };
  }
  if (validate.pattern) {
    try {
      rules.pattern = { value: new RegExp(validate.pattern), message: 'Invalid format' };
    } catch {
      // Ignore invalid regex patterns
    }
  }

  return rules;
};

const TabsContainer = ({ component, path, renderComponent }) => {
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
              idx === activeTab ? 'text-primary border-b-2 border-primary bg-white' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label || `Tab ${idx + 1}`}
          </button>
        ))}
      </div>
      <div className="p-4 border border-t-0 border-gray-200 rounded-b">
        {tabs[activeTab] && (tabs[activeTab].components || []).map((child) => (
          <div key={child.id} className="mb-4">
            {renderComponent(child, path)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ColumnsContainer = ({ component, path, renderComponent }) => (
  <div className="flex gap-4 mb-4">
    {(component.columns || []).map((column, idx) => (
      <div key={idx} className="flex-1 space-y-4">
        {(column.components || []).map((child) => (
          <div key={child.id}>{renderComponent(child, path)}</div>
        ))}
      </div>
    ))}
  </div>
);

const PanelContainer = ({ component, path, renderComponent }) => (
  <div className="border border-gray-300 rounded-md mb-4">
    {component.title && (
      <div className="bg-gray-50 border-b border-gray-200 p-2 text-sm font-medium">
        {component.title}
      </div>
    )}
    <div className="p-4 space-y-4">
      {(component.components || []).map((child) => (
        <div key={child.id}>{renderComponent(child, path)}</div>
      ))}
    </div>
  </div>
);

const FormPreview = ({ form }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    setSubmitted(true);
    console.log('Form data:', data); // eslint-disable-line no-console
    reset();
  };

  const renderComponent = (component, parentPath = '') => {
    const name = parentPath ? `${parentPath}.${component.key}` : component.key;

    switch (component.type) {
      case 'textfield':
      case 'email':
      case 'phoneNumber':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {component.label}
            </label>
            <input
              id={name}
              type={component.inputType || component.type === 'email' ? 'email' : component.type === 'phoneNumber' ? 'tel' : 'text'}
              placeholder={component.placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              {...register(name, getValidationRules(component))}
            />
            {component.description && <p className="text-xs text-gray-500 mt-1">{component.description}</p>}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {component.label}
            </label>
            <textarea
              id={name}
              rows={component.rows || 3}
              placeholder={component.placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              {...register(name, getValidationRules(component))}
            />
            {component.description && <p className="text-xs text-gray-500 mt-1">{component.description}</p>}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'number':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {component.label}
            </label>
            <input
              id={name}
              type="number"
              placeholder={component.placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              {...register(name, getValidationRules(component))}
            />
            {component.description && <p className="text-xs text-gray-500 mt-1">{component.description}</p>}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              {...register(name, getValidationRules(component))}
            />
            <span className="text-sm text-gray-700">{component.label}</span>
            {errors[name] && <p className="text-error text-xs ml-2">{errors[name].message}</p>}
          </label>
        );
      case 'selectboxes':
        return (
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">{component.label}</span>
            <div className={`space-y-2 ${component.inline ? 'flex flex-wrap gap-4' : ''}`}>
              {(component.values || []).map((option, idx) => (
                <label key={idx} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
                    {...register(`${name}.${option.value}`)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'select':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {component.label}
            </label>
            <select
              id={name}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              {...register(name, getValidationRules(component))}
            >
              <option value="">{component.placeholder || 'Select...'}</option>
              {(component.data?.values || []).map((opt, idx) => (
                <option key={idx} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {component.description && <p className="text-xs text-gray-500 mt-1">{component.description}</p>}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'radio':
        return (
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">{component.label}</span>
            <div className={`space-y-2 ${component.inline ? 'flex flex-wrap gap-4' : ''}`}>
              {(component.values || []).map((opt, idx) => (
                <label key={idx} className="flex items-center text-sm">
                  <input
                    type="radio"
                    value={opt.value}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
                    {...register(name, getValidationRules(component))}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'datetime':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {component.label}
            </label>
            <input
              id={name}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              {...register(name, getValidationRules(component))}
            />
            {component.description && <p className="text-xs text-gray-500 mt-1">{component.description}</p>}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'address':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            {Object.entries(component.components || {}).map(([key, cfg]) => (
              <input
                key={key}
                placeholder={cfg.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                {...register(`${name}.${cfg.key}`, getValidationRules(cfg))}
              />
            ))}
            {errors[name] && <p className="text-error text-xs mt-1">{errors[name].message}</p>}
          </div>
        );
      case 'content':
        return (
          <div dangerouslySetInnerHTML={{ __html: component.html || '' }} />
        );
      case 'panel':
        return <PanelContainer component={component} path={name} renderComponent={renderComponent} />;
      case 'columns':
        return <ColumnsContainer component={component} path={name} renderComponent={renderComponent} />;
      case 'tabs':
        return <TabsContainer component={component} path={name} renderComponent={renderComponent} />;
      default:
        return <div>Unsupported component: {component.type}</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(form.components || []).map((comp) => (
        <div key={comp.id}>{renderComponent(comp)}</div>
      ))}
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
        {form?.settings?.submitButton?.text || 'Submit'}
      </button>
      {submitted && (
        <p className="text-success mt-2">Form submitted successfully!</p>
      )}
    </form>
  );
};

export default FormPreview;
