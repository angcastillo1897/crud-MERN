import { ConfigProvider, theme , FloatButton } from "antd";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Moon, Sun } from "lucide-react";


export const ProvideDarkTheme = ({ children }) => {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        const root = document.documentElement;
        if (root.getAttribute('data-theme') === 'dark') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
        }
    }

    return (
        <ConfigProvider
            theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}>
            {children}
            <FloatButton tooltip={<div>Modo oscuro</div>} onClick={toggleDarkMode} icon={isDarkMode ? <Sun height={20} width={20} /> : <Moon height={20} width={20} /> }>
            </FloatButton>
        </ConfigProvider>
    )
}

ProvideDarkTheme.propTypes = {
    children: PropTypes.node.isRequired
}