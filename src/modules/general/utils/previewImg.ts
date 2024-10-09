export const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<string | null>) => {
    const file = event.target.files?.[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando el archivo ha sido leído, se guarda en el estado
        setter(reader.result as string);
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL
    }
};