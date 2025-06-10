export const VALID_EXTENSIONS = {
    IMAGE: ['.png', '.jpg', '.gif'],
    SOURCE_CODE : ['.rar', '.zip'],
    CONFIG_FILE : ['.json', '.env'],
    EXCEL: ['.xlsx']
}


export function hasValidExtension(fileName: string, type: keyof typeof VALID_EXTENSIONS){
    for(const extension of VALID_EXTENSIONS[type]){
        if(fileName.endsWith(extension)) return true;
    }
    return false;
}


export const msgNoValidExtension = (type: keyof typeof VALID_EXTENSIONS) => {
    return `Únicamente se admiten las siguientes extensiones de archivo en este campo: ${VALID_EXTENSIONS[type].join(', ')}`
}