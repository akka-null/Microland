import { RequestHandler } from "express";

const match: RequestHandler = async (req, res, next) => {
    const ComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const PartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case', 'Storage', 'Cooler'];
    const PeripheralCategory = ['Monitor', 'Mouse', 'Keyboard', 'Keyboard-Mouse', 'MousePad', 'Headset-Mic', 'Webcam', 'ThermalPaste'];
    const type = req.params.productType;
    const category = req.params.productCategory;

    if (type && category) {
        if (type === 'Computer' && ComputerCategory.includes(category)) {
            next();
        }
        else if (type === 'Part' && PartCategory.includes(category)) {
            next();
        }
        else if (type === 'Peripheral' && PeripheralCategory.includes(category)) {
            next();
        }
        else {
            res.status(404);
            next(Error('Page Not Found'));
        }
    }
}

// }, "Type does not match Category");


export default match;
