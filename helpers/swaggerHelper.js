import { readFileSync } from 'fs';
import path from "path";

const getSwaggerDocument = () => {
    const swaggerPath = path.resolve("swagger.json");

    return JSON.parse(
        readFileSync(swaggerPath)
    );
};

export default getSwaggerDocument;
