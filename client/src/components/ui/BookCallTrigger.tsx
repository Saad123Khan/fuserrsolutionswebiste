import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { company } from '@/data/company';

interface BookCallTriggerProps {
  children: ReactNode;
  className?: string;
  /** Called when the link is clicked (e.g. to close the mobile menu). */
  onOpen?: () => void;
}

/**
 * "Book a call" link: opens the Calendly booking page in a new tab when a
 * booking link is configured (data/company.ts), otherwise goes to /contact.
 */
export default function BookCallTrigger({ children, className, onOpen }: BookCallTriggerProps) {
  if (!company.calendlyUrl) {
    return (
      <Link to="/contact" className={className} onClick={onOpen}>
        {children}
      </Link>
    );
  }

  return (
    <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer" className={className} onClick={onOpen}>
      {children}
    </a>
  );
}
