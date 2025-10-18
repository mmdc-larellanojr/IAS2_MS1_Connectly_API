
import { useSnackbar as useNotistack } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistack();

  const showError = (message) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const showSuccess = (message) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  return { showError, showSuccess };
};
