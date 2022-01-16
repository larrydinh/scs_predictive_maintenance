import { Button, Modal } from 'antd'
import { Formik, FormikErrors, FormikHelpers, FormikProps, FormikValues } from 'formik'
import * as React from 'react'
import { SubHeader } from '../layout/sub-header'

interface Props {
  initialValues: FormikValues
  validationSchema?: any | (() => any)
  children?: (props: FormikProps<any>) => React.ReactNode
  titleHeader?: string
  title?: string | React.ReactNode
  okText?: string
  okBtnDisabled?: boolean
  hideFooter?: boolean
  initialErrors?: FormikErrors<any>
  onOk: (values: any) => void
  onClose?: () => void
}

interface State {
  open: boolean
}

export class ModalFormikProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  closeDialog = (formikProps: FormikProps<any>) => {
    this.setState({ open: false })
    formikProps.resetForm()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  clickedOk = (item: any, actions: FormikHelpers<any>) => {
    this.setState({ open: false })
    try {
      this.props.onOk(item)
      actions.resetForm()
    } catch (err) {
      console.error(err)
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      initialValues,
      validationSchema,
      title,
      titleHeader,
      okText,
      children,
      okBtnDisabled,
      hideFooter,
      initialErrors,
      ...rest
    } = this.props
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        initialErrors={initialErrors}
        onSubmit={this.clickedOk}
        enableReinitialize={true}
      >
        {formikProps => {
          return (
            <Modal
              {...rest}
              destroyOnClose={true}
              width="70%"
              className="site-drawer-render-in-current-wrapper"
              title={title ? title : <SubHeader name={titleHeader || 'Title Header'} />}
              visible={this.state.open}
              onCancel={() => this.closeDialog(formikProps)}
              maskClosable={false}
              closable={false}
              footer={
                hideFooter === true
                  ? null
                  : [
                      <Button htmlType="button" key="back" onClick={() => this.closeDialog(formikProps)}>
                        Cancel
                      </Button>,
                      <Button
                        htmlType="button"
                        key="submit"
                        type="primary"
                        disabled={!formikProps.isValid || formikProps.isSubmitting || okBtnDisabled}
                        onClick={formikProps.submitForm}
                      >
                        {okText ? okText : 'Ok'}
                      </Button>,
                    ]
              }
            >
              <div style={{ maxHeight: 600, overflowY: 'auto' }}>{children && children(formikProps)}</div>
            </Modal>
          )
        }}
      </Formik>
    )
  }
}
