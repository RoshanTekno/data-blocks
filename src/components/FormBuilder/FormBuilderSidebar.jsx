import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';

const COMPONENT_CATEGORIES = [
	{
		name: 'Basic',
		components: [
			{ type: 'textfield', label: 'Text Field', icon: 'text-field' },
			{ type: 'textarea', label: 'Text Area', icon: 'text-area' },
			{ type: 'number', label: 'Number', icon: 'number' },
			{ type: 'checkbox', label: 'Checkbox', icon: 'checkbox' },
			{ type: 'selectboxes', label: 'Select Boxes', icon: 'select-boxes' },
			{ type: 'select', label: 'Select', icon: 'select' },
			{ type: 'radio', label: 'Radio', icon: 'radio' },
		],
	},
	{
		name: 'Advanced',
		components: [
			{ type: 'email', label: 'Email', icon: 'email' },
			{ type: 'phoneNumber', label: 'Phone Number', icon: 'phone' },
			{ type: 'datetime', label: 'Date / Time', icon: 'date' },
			{ type: 'address', label: 'Address', icon: 'address' },
			{ type: 'content', label: 'Content', icon: 'content' },
		],
	},
	{
		name: 'Layout',
		components: [
			{ type: 'button', label: 'Button', icon: 'button' },
			{ type: 'panel', label: 'Panel', icon: 'panel' },
			{ type: 'columns', label: 'Columns', icon: 'columns' },
			{ type: 'tabs', label: 'Tabs', icon: 'tabs' }, // <-- Add Tabs here
		],
	},
];

// Component that can be dragged from the sidebar
const DraggableComponent = ({ component }) => {
	// Use a stable id for sidebar draggables to avoid DnD-kit bugs
	const uniqueId = `sidebar-${component.type}`;
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: uniqueId,
		data: {
			type: component.type,
			label: component.label,
			suggestedKey: component.type, // e.g., "textfield"
			isNew: true,
		},
	});

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			tabIndex={0}
			className={`flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-md cursor-grab shadow-sm transition-all ${
				isDragging ? 'opacity-50' : 'hover:border-primary hover:shadow-md'
			}`}
		>
			<div className="mr-3 text-gray-500">
				<ComponentIcon type={component.icon} />
			</div>
			<div className="text-sm font-medium text-gray-700">
				{component.label}
			</div>
		</div>
	);
};

// Component to display appropriate icon based on component type
const ComponentIcon = ({ type }) => {
	// SVG icons for each component type
	const icons = {
		'text-field': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="4 7 4 4 20 4 20 7"></polyline>
				<line x1="9" y1="20" x2="15" y2="20"></line>
				<line x1="12" y1="4" x2="12" y2="20"></line>
			</svg>
		),
		'text-area': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
				<line x1="8" y1="8" x2="16" y2="8"></line>
				<line x1="8" y1="12" x2="16" y2="12"></line>
				<line x1="8" y1="16" x2="12" y2="16"></line>
			</svg>
		),
		'number': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="12" y1="1" x2="12" y2="23"></line>
				<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
			</svg>
		),
		'checkbox': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
				<path d="M9 12l2 2 4-4"></path>
			</svg>
		),
		'select-boxes': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="7" height="7"></rect>
				<rect x="14" y="3" width="7" height="7"></rect>
				<rect x="3" y="14" width="7" height="7"></rect>
				<rect x="14" y="14" width="7" height="7"></rect>
			</svg>
		),
		'select': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		),
		'radio': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<circle cx="12" cy="12" r="3"></circle>
			</svg>
		),
		'email': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
				<polyline points="22,6 12,13 2,6"></polyline>
			</svg>
		),
		'phone': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
			</svg>
		),
		'date': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
				<line x1="16" y1="2" x2="16" y2="6"></line>
				<line x1="8" y1="2" x2="8" y2="6"></line>
				<line x1="3" y1="10" x2="21" y2="10"></line>
			</svg>
		),
		'address': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
				<circle cx="12" cy="10" r="3"></circle>
			</svg>
		),
		'content': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="4 7 4 4 20 4 20 7"></polyline>
				<line x1="9" y1="20" x2="15" y2="20"></line>
				<line x1="12" y1="4" x2="12" y2="20"></line>
			</svg>
		),
		'button': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="8" width="18" height="8" rx="1" ry="1"></rect>
			</svg>
		),
		'panel': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
				<line x1="3" y1="9" x2="21" y2="9"></line>
			</svg>
		),
		'columns': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="7" height="18"></rect>
				<rect x="14" y="3" width="7" height="18"></rect>
			</svg>
		),
		'tabs': (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="7" width="18" height="13" rx="2" />
				<rect x="6" y="3" width="5" height="4" rx="1" />
				<rect x="13" y="3" width="5" height="4" rx="1" />
			</svg>
		),
	};

	return (
		icons[type] || (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
			</svg>
		)
	);
};

const FormBuilderSidebar = () => {
	const [expandedCategory, setExpandedCategory] = useState('Basic'); // Default expanded category

	const toggleCategory = (categoryName) => {
		if (expandedCategory === categoryName) {
			setExpandedCategory(null);
		} else {
			setExpandedCategory(categoryName);
		}
	};

	return (
		<div className="w-64 border-r border-gray-200 bg-gray-50 h-full overflow-y-auto">
			<div className="p-4">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Components
				</h2>

				{COMPONENT_CATEGORIES.map((category) => (
					<div key={category.name} className="mb-2">
						<button
							className="w-full flex items-center justify-between p-3 text-left bg-white border border-gray-200 rounded-md font-medium text-gray-700 hover:border-primary focus:outline-none transition-colors"
							onClick={() => toggleCategory(category.name)}
						>
							{category.name}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={`transform transition-transform ${
									expandedCategory === category.name ? 'rotate-180' : ''
								}`}
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>

						<AnimatePresence>
							{expandedCategory === category.name && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="overflow-hidden"
								>
									<div className="pt-2 pl-2">
										{category.components.map((component) => (
											<DraggableComponent
												key={component.type}
												component={component}
											/>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</div>
	);
};

export default FormBuilderSidebar;