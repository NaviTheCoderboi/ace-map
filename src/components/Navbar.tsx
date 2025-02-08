import Logo from '@assets/Logo';
import * as Navbar from '@heroui/navbar';
import ThemeSwitch from './ThemeSwitch';
import { BsGithub } from 'react-icons/bs';

const Nav = () => {
    return (
        <Navbar.Navbar>
            <Navbar.NavbarBrand>
                <Logo />
                <a href="/" className="text-xl font-medium">
                    Ace Map
                </a>
            </Navbar.NavbarBrand>
            <Navbar.NavbarContent justify="end">
                <Navbar.NavbarItem>
                    <a href="https://github.com/navithecoderboi">
                        <BsGithub className="size-6" />
                    </a>
                </Navbar.NavbarItem>
                <Navbar.NavbarItem>
                    <ThemeSwitch />
                </Navbar.NavbarItem>
            </Navbar.NavbarContent>
        </Navbar.Navbar>
    );
};

export default Nav;
