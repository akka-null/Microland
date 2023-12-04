import React from 'react'
import { logo } from '../utils/constants'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Badge, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { AccountBalance, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';


const Container= styled.div``

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
`
const Left = styled.div`
  flex: 1;
  `
const Center = styled.div`
  flex:1;
  display: flex;
`

const Image = styled.img`
  height: 10em;

`
const SearchContainer = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid red;
  width: 75%;
  border-radius: 23px;
`

const Input = styled.input`
border: none;
width: 80%;
`

const Right = styled.div`
  flex:1;
  display: flex;
`
const MenuItem = styled.div`
  padding: 20px;
  color: gray;
  
`
const Navbar = () => {
  return (
   <Container>
      <Wrapper>
        <Left>
          <Image src={logo}/>
        </Left>
        <Center>
        <SearchContainer>
            <Input placeholder='Search' style={{outline:"none", margin:0 }}></Input>
            <IconButton type='sumbit'   style={{padding:'10px', color:'white', background:'red' }}>
             <Search style={{}}/>
            </IconButton>
          </SearchContainer>
  
        </Center>
        <Right>
              <MenuItem>
                <Link >
                  <FavoriteBorderOutlinedIcon/>
              </Link>
             </MenuItem>
              <MenuItem>
              <Link to={'/register'}>
                 <PersonOutlineOutlinedIcon/>
               </Link>
             </MenuItem>
              <MenuItem>
               <Link>
               <Badge badgeContent={4} color="primary">
                 <ShoppingBagOutlinedIcon/>
                </Badge>
                </Link>
            </MenuItem>
        </Right>
      </Wrapper>
      <Navigation/>
   </Container>
  )
}

export default Navbar
