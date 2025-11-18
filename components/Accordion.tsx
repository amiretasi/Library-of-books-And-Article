
import React, { useState, ReactNode } from 'react';

interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    startOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div
                className="bg-slate-50 p-4 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                onClick={toggleAccordion}
            >
                {title}
                <span className="accordion-toggle-icon text-2xl font-bold text-teal-600" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    {isOpen ? '−' : '+'}
                </span>
            </div>
            <div
                className="collapsible-content bg-white"
                style={{ maxHeight: isOpen ? '10000px' : '0' }}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;
