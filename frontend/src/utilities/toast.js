import {NotificationManager} from "react-notifications";
import "react-notifications/lib/notifications.css";

export const Toast = ({type = "success", message, time = 3000}) => {
  NotificationManager[type](message, "", time);
};
