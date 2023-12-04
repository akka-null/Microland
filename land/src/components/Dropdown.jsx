import React from 'react'
import MenuItems from './MenuItems'
const Dropdown = ({submens, dropdown,level}) => {

    level = level +1;
    const dropdownClass= level > 1 ? 'dropdown-submenu':'';
  return (
    <ul className={`dropown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
        {
            submens.map((submenu, index) => (
                <MenuItems items={submens} key={index} level={level}/>
            ))
        }
    </ul>
  )
}

export default Dropdown
