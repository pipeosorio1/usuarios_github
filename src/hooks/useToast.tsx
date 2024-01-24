import { messages } from 'constantes';
import { useMemo } from 'react';
import Toast from 'react-native-toast-message';

function useToast() {
  const appSuccess = (message = '') => {
    Toast.show({
      text1: messages.alert.success,
      text2: message,
      type: 'success',
      position: 'bottom',
      buttonText: 'Cerrar',
      duration: 7500,
    });
  };

  const appError = (message = '') => {
    Toast.show({
      text1: messages.alert.error,
      text2: message,
      type: 'error',
      position: 'bottom',
      buttonText: 'Cerrar',
      duration: 7500,
    });
  };

  const appInfo = (message = '') => {
    Toast.show({
      text1: messages.alert.success,
      text2: message,
      type: 'info',
      position: 'bottom',
      buttonText: 'Cerrar',
      duration: 7500,
    });
  };

  return useMemo(() => ({ appSuccess, appError, appInfo }));
}

export default useToast;
