import NotifireDissmissButton from "../../../components/MessageToaster/NotifireDissmissButton";
export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;
  function generateKey() {
    return key || new Date().getTime() + Math.random();
  }
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...{
        ...notification,
        options: {
          action: (key) => <NotifireDissmissButton key={generateKey()} />,
          ...notification.options,
        },
      },
      key: generateKey(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});
