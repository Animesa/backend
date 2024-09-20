import bcryp from 'bcryptjs';

export const encrypt = async (textPlain) => {
    return await bcryp.hash(textPlain, 5);
}

export const compare = async (passwordPlain, passwordEncryp) => {
    return await bcryp.compare(passwordPlain, passwordEncryp);
}

export const validateFormatter = ({ path, msg }) => {
    return `${path}: ${msg}`;
}