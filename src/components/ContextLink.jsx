import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

/**
 * Component to create a link to a context page
 * Usage: <ContextLink slug="jacques-cartier">Jacques Cartier</ContextLink>
 */
const ContextLink = ({ slug, children, className = '' }) => {
  return (
    <Link
      to={`/context/${slug}`}
      className={`inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <ExternalLink className="w-3 h-3" />
    </Link>
  );
};

export default ContextLink;

