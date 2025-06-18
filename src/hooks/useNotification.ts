import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

type NotificationHooksType = () => [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  (type: NotificationType, message?: string, description?: string) => void
];

const useNotification: NotificationHooksType = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message?: string,
    description?: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  return [contextHolder, openNotification];
};

export default useNotification;
