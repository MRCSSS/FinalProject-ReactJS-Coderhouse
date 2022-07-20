import React, { createContext, useState }from 'react';

export const NavbarMenuStateContext = createContext([]);

const { Provider } = NavbarMenuStateContext;

export default function NavbarMenuStateProvider({ children }) {
    const [active, setActive] = useState(false)

    const changeNavbarMenuStatus = (status) => {
        status !== true ? setActive(true) : setActive(false)
    }

    const hideNavbar = () => {
        setActive(false)
    }

    return (
        <Provider value={{active, changeNavbarMenuStatus, hideNavbar}}>{children}</Provider>
    )
}
