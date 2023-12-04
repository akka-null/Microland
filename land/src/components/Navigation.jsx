import React, { useState } from 'react';
import styled from '@emotion/styled';
import { menuItems } from '../utils/menuitems';
import MenuItems from './MenuItems'

const Container = styled.nav`
  
`
const Menus = styled.ul`
  
`
const Navigation = () => {

  return (
    <Container>
      <Menus>
        {
          menuItems.map((menu, index) => {
            const level = 0;
            return <MenuItems items={menu} key={index} level={level} />
          })
        }
      </Menus>
    </Container>
  );
};

export default Navigation;

