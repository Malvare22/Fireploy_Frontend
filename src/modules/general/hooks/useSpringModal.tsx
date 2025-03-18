import { useState } from "react";

export default function useSpringModal() {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { open, handleOpen, handleClose };
};
