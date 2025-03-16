import { ArchivoLog } from "../types/archivoLog.tipo";

export const generateLog = (log: ArchivoLog): void => {
    const activator: HTMLAnchorElement = document.createElement('a');
    
    let content: string = '';
    content += `Mensaje:\n${log.mensaje}\n`;
    content += `Detalles:\n${log.detalles}\n`;
    
    const file = new Blob([content], { type: 'text/plain' });
    
    activator.href = URL.createObjectURL(file);
    
    activator.download = `log-${new Date().toISOString()}.txt`;
    
    activator.click();
  };
  
  