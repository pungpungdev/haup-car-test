import { notification } from "antd";

export default function ContextNoti() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, desc) => {
    api[type]({
      message: message,
      description: desc,
    });
  };
  return {
    contextHolder,
    openNotification
  };
}
