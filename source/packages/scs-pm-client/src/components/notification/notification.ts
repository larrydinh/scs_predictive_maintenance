import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'

type NotificationType = 'Success' | 'Error' | 'Warn' | 'Info'
const DEFAULT_NOTIFICATION_DURATION = 4.5

const defaultNotificationStyle: React.CSSProperties = {
  borderRadius: 10,
}

export function notifyUser(
  description: string,
  notificationType: NotificationType,
  typeName?: string,
  onClose?: () => void,
  duration?: number,
) {
  const defaultNotificationObj: ArgsProps = {
    message: 'No Content',
    description,
    duration: duration ? duration : DEFAULT_NOTIFICATION_DURATION,
    onClose,
    style: defaultNotificationStyle,
  }
  switch (notificationType) {
    case 'Error':
      notification.error({
        ...defaultNotificationObj,
        message: typeName ? `${typeName} Error` : `Error`,
      })
      break
    case 'Success':
      notification.success({
        ...defaultNotificationObj,
        message: typeName ? `${typeName} Success` : `Success`,
      })
      break
    case 'Warn':
      notification.warn({
        ...defaultNotificationObj,
        message: typeName ? `${typeName} Warn` : `Warn`,
      })
      break
    default:
      notification.info({
        ...defaultNotificationObj,
        message: typeName ? `${typeName} Information` : `Information`,
      })
      break
  }
}
