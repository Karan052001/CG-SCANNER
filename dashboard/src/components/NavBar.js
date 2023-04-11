
import { AppBar, Toolbar, styled } from '@mui/material';

import { NavLink } from 'react-router-dom';


const Header = styled(AppBar)`
    background: #111111;
`;
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-left: 20px;
    text-decoration: none;
    font-size: 20px;
    text-align: right;

`;

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <p style={{fontSize: '20px',marginRight: '20px', fontWeight:'bolder'}}>SCANNER</p>
                <Tabs to="./" >View Scan Results</Tabs>
                <Tabs to="add" >Submit Scan Result</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;
