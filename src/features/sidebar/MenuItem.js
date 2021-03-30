import Icon from '../../components/Icon';
import {  Link } from "react-router-dom";


function MenuItem ({ icon, text, state, darkMode, path }) {

  const className = `menu-item ${state}`;

  return(
    <li className={className}>
      <Icon iconName={icon} state={state} darkMode={darkMode} />
      <Link to={ path }>
        <span className="text font-m">{text}</span>
      </Link>
    </li>
  )
}

export default MenuItem;
