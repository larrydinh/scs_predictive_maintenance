import { Drawer } from 'antd'
import * as React from 'react'

type DrawerPosition = 'right' | 'top' | 'bottom' | 'left'

interface Props {
  title: string
  children: React.ReactNode | React.ReactNode[]
  width?: string | number | undefined
  isRelativePosition?: boolean
  onClose?: () => void
  placement?: DrawerPosition
}

interface State {
  isConfigDocumentVisible: boolean
}

export class DrawerProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isConfigDocumentVisible: false,
    }
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      isConfigDocumentVisible: !prevState.isConfigDocumentVisible,
    }))
  }

  closeDrawer = () => {
    this.setState({ isConfigDocumentVisible: false })
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    const { title, children, width, isRelativePosition, placement } = this.props
    const dPosition = isRelativePosition === undefined || isRelativePosition === false ? 'absolute' : undefined
    return (
      <Drawer
        title={title}
        placement={placement || 'right'}
        bodyStyle={{ overflowY: 'auto', overflowX: 'auto' }}
        closable={false}
        onClose={this.closeDrawer}
        visible={this.state.isConfigDocumentVisible}
        getContainer={false}
        width={width}
        style={{ position: dPosition }}
      >
        {Array.isArray(children) ? children.map(child => child) : children}
      </Drawer>
    )
  }
}
