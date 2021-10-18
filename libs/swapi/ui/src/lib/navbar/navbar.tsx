import { Link } from 'react-router-dom';
import './navbar.module.css';

/* eslint-disable-next-line */
export interface NavbarProps {
  activeIndex: number;
}

export function Navbar({ activeIndex }: NavbarProps) {
  return (
    <nav className="flex justify-end py-8">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/people"
            className={activeIndex === 0 ? 'font-medium' : 'opacity-40'}
          >
            People
          </Link>
        </li>
        <li>
          <Link
            to="/species"
            className={activeIndex === 1 ? 'font-medium' : 'opacity-40'}
          >
            Species
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
