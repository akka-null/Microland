export const BASE_URL = 'http://localhost:3030';
export const PRODUCT_URL = '/api/product';
export const PRODUCTS_URL = '/api/products';
export const ORDER_URL = '';

const PART_URL = '/products/Part';
const COMPUTER_URL = '/products/Computer';
const PERIPHERAL_URL = '/products/Peripheral';

export const NavigationItems = [
    {
        type:
            { title: 'parts', href: `${PART_URL}`, path: 'Part' },
        category:
            [
                { title: 'graphic card', href: `${PART_URL}/Gpu`, path: 'Gpu' },
                { title: 'processor', href: `${PART_URL}/Cpu`, path: 'Cpu' },
                { title: 'memory', href: `${PART_URL}/Ram`, path: 'Ram' },
                { title: 'storage', href: `${PART_URL}/Storage`, path: 'Storage'},
                { title: 'case', href: `${PART_URL}/Case`, path: 'Case' },
                { title: 'cpu cooler', href: `${PART_URL}/Cooler`, path: 'Cooler' },
                { title: 'power supply', href: `${PART_URL}/Psu`, path: 'Psu' },
                ]
    },
    {
        type:
            { title: 'Computer', href: `${COMPUTER_URL}`, path: 'Computer' },
        category:
            [
                { title: 'Desktop', href: `${COMPUTER_URL}/Desktop`, path: 'Desktop' },
                { title: 'Laptop', href: `${COMPUTER_URL}/Laptop`, path: 'Laptop' },
                { title: 'Tablet', href: `${COMPUTER_URL}/Tablet`, path: 'Tablet' },
                { title: 'AllInOne', href: `${COMPUTER_URL}/AllInOne`, path: 'AllInOne' },
                ]
    },
    {
        type:
            { title: 'Peripheral', href: `${PERIPHERAL_URL}`, path: 'Peripheral' },
        category:
            [
                { title: 'Monitors', href: `${PERIPHERAL_URL}/Monitor`, path: 'Monitor' },
                { title: 'Mouse', href: `${PERIPHERAL_URL}/Mouse`, path: 'Mouse' },
                { title: 'Keyboards', href: `${PERIPHERAL_URL}/Keyboard`, path: 'Keyboard' },
                { title: 'Headset and Mic', href: `${PERIPHERAL_URL}/Headset-Mic`, path: 'Headset-Mic' },
                { title: 'Mouse Pad', href: `${PERIPHERAL_URL}/MousePad`, path: 'MousePad' },
                { title: 'Keyboard and Mouse', href: `${PERIPHERAL_URL}/Keyboard-Mouse`, path: 'Keyboard-Mouse' },
                { title: 'Thermal Paste', href: `${PERIPHERAL_URL}/ThermalPaste`, path: 'ThermalPaste' },
            ]
    }
]
