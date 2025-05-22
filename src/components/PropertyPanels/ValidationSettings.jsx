import React from 'react';
import { useForm } from '../../context/FormContext';

const ValidationSettings = ({ component }) => {
  const { updateComponent } = useForm();
  
  // Initialize validate object if it doesn't exist
  const validate = component.validate || {};
  
  const handleValidationChange = (field, value) => {
    const newValidate = { ...validate, [field]: value };
    updateComponent(component.id, { validate: newValidate });
  };

  // No validation for certain components
  if (['content', 'button', 'panel', 'columns'].includes(component.type)) {
    return (
      <div className="text-center text-sm text-gray-500 py-4">
        No validation settings available for this component type.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label htmlFor="validateOn" className="block text-sm font-medium text-gray-700 mb-1">
          Validate On
        </label>
        <select
          id="validateOn"
          value={component.validateOn || 'change'}
          onChange={(e) => updateComponent(component.id, { validateOn: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
        >
          <option value="change">Change</option>
          <option value="blur">Blur</option>
          <option value="submit">Submit</option>
        </select>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={validate.required || false}
            onChange={(e) => handleValidationChange('required', e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Required</span>
        </label>
      </div>

      {/* Text length validations for text-based fields */}
      {['textfield', 'textarea', 'email', 'phoneNumber'].includes(component.type) && (
        <>
          <div>
            <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Length
            </label>
            <input
              type="number"
              id="minLength"
              value={validate.minLength || ''}
              onChange={(e) => handleValidationChange('minLength', e.target.value)}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Length
            </label>
            <input
              type="number"
              id="maxLength"
              value={validate.maxLength || ''}
              onChange={(e) => handleValidationChange('maxLength', e.target.value)}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>
        </>
      )}

      {/* Min/max for number field */}
      {component.type === 'number' && (
        <>
          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Value
            </label>
            <input
              type="number"
              id="min"
              value={validate.min || ''}
              onChange={(e) => handleValidationChange('min', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Value
            </label>
            <input
              type="number"
              id="max"
              value={validate.max || ''}
              onChange={(e) => handleValidationChange('max', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>
        </>
      )}

      {/* Min/max date */}
      {component.type === 'datetime' && (
        <>
          <div>
            <label htmlFor="minDate" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Date
            </label>
            <input
              type="date"
              id="minDate"
              value={validate.min || ''}
              onChange={(e) => handleValidationChange('min', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label htmlFor="maxDate" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Date
            </label>
            <input
              type="date"
              id="maxDate"
              value={validate.max || ''}
              onChange={(e) => handleValidationChange('max', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>
        </>
      )}

      {/* Regex pattern for text inputs */}
      {['textfield', 'email', 'phoneNumber'].includes(component.type) && (
        <div>
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-1">
            Regular Expression Pattern
          </label>
          <input
            type="text"
            id="pattern"
            value={validate.pattern || ''}
            onChange={(e) => handleValidationChange('pattern', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
            placeholder="e.g. ^[a-zA-Z0-9]+$"
          />
          <p className="text-xs text-gray-500 mt-1">
            A regular expression pattern to validate input.
          </p>
        </div>
      )}

      {/* Custom validation */}
      <div>
        <label htmlFor="custom" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Validation
        </label>
        <textarea
          id="custom"
          value={validate.custom || ''}
          onChange={(e) => handleValidationChange('custom', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
          rows="3"
          placeholder="// input is the value to validate&#10;// valid should return true or false&#10;valid = (input == 'valid');&#10;return valid;"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          Write custom JavaScript code to validate the input.
        </p>
      </div>

      <div>
        <label htmlFor="errorMessage" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Error Message
        </label>
        <input
          type="text"
          id="errorMessage"
          value={validate.customMessage || ''}
          onChange={(e) => handleValidationChange('customMessage', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          placeholder="Please enter a valid value"
        />
        <p className="text-xs text-gray-500 mt-1">
          Custom error message to display when validation fails.
        </p>
      </div>
    </div>
  );
};

export default ValidationSettings;