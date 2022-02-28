import { toast } from 'react-toastify';

/**
 * Danger popup template
 */
export const toastDanger = (message) => toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
    });

/**
 * Success popup template
 */    
export const toastSuccess = (message) => toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
    });
