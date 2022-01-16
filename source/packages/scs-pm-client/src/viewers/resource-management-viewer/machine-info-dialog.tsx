import { Card, Col, Form, Row } from 'antd'
import { FastField } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import {
  CalendarPickerField,
  DateTimePickerField,
  ModalFormikProvider,
  MultilineTextField,
  SetField,
  TextField,
} from '../../components'
import { Department, getLabelValueFromEnum, MachineModelInformation } from '../../models'

interface Props {
  machineModelInfo: MachineModelInformation
  onOk: (updatedMachine: MachineModelInformation) => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  givenName: Yup.string().required('Internal Name is required'),
  machineId: Yup.string().required('Machine Id is required'),
  model: Yup.string().required('Model is required'),
  manufactureYear: Yup.string().required('Manufacturer Year is required'),
  manufacturerName: Yup.string().required('Manufacturer Name is required'),
  purchaseDate: Yup.string().required('Purchase Date is required'),
  inductionDate: Yup.string().required('Induction Date is required'),
  departmentName: Yup.string().required('Department Name is required'),
  description: Yup.string().required('Description is required'),
  operatingManualLink: Yup.string().required('Operating Manual Link is required'),
})

export class MachineInfoDialog extends React.Component<Props, never> {
  private modalFormikProvider = React.createRef<ModalFormikProvider>()

  toggleOpen = () => {
    if (this.modalFormikProvider.current) {
      this.modalFormikProvider.current.toggleOpen()
    }
  }

  render() {
    const { machineModelInfo, onOk } = this.props

    return (
      <ModalFormikProvider
        ref={this.modalFormikProvider}
        key={Math.random() * 1000}
        initialValues={machineModelInfo}
        validationSchema={validationSchema}
        titleHeader={`Add a new machine`}
        onOk={onOk}
      >
        {() => {
          return (
            <Form style={{ flex: 1 }}>
              <Card title={`Machine Information`}>
                <FastField
                  name={`name`}
                  type="text"
                  meta={{
                    label: 'Name',
                    isRequired: true,
                  }}
                  component={TextField}
                />
                <FastField
                  name={`givenName`}
                  type="text"
                  meta={{
                    label: 'Internal Name',
                    isRequired: true,
                  }}
                  component={TextField}
                />
                <FastField
                  name={`machineId`}
                  type="text"
                  meta={{
                    label: 'Machine Id',
                    isRequired: true,
                  }}
                  component={TextField}
                />
                <FastField
                  name={`model`}
                  type="text"
                  meta={{
                    label: 'Model',
                    isRequired: true,
                  }}
                  component={TextField}
                />
                <Row gutter={4}>
                  <Col span={12}>
                    <FastField
                      name={`manufacturerName`}
                      type="text"
                      meta={{
                        label: 'Manufacturer Name',
                        isRequired: true,
                      }}
                      component={TextField}
                    />
                  </Col>
                  <Col span={12}>
                    <FastField
                      name={`manufactureYear`}
                      type="text"
                      meta={{
                        label: 'Manufacturer Year',
                        isRequired: true,
                        picker: 'year',
                      }}
                      component={CalendarPickerField}
                    />
                  </Col>
                </Row>
                <Row gutter={4}>
                  <Col span={12}>
                    <FastField
                      name={`purchaseDate`}
                      type="text"
                      meta={{
                        label: 'Purchase Date',
                        isRequired: true,
                      }}
                      component={DateTimePickerField}
                    />
                  </Col>
                  <Col span={12}>
                    <FastField
                      name={`inductionDate`}
                      type="text"
                      meta={{
                        label: 'Induction Date',
                        isRequired: true,
                      }}
                      component={DateTimePickerField}
                    />
                  </Col>
                </Row>

                <FastField
                  name={`departmentName`}
                  type="text"
                  meta={{
                    label: 'Department Name',
                    isRequired: true,
                    possibleValues: getLabelValueFromEnum(Department),
                  }}
                  component={SetField}
                />

                <FastField
                  name={`description`}
                  placeholder="Enter description"
                  type="text"
                  meta={{
                    label: 'Description',
                    isRequired: true,
                  }}
                  component={MultilineTextField}
                />
                <FastField
                  name={`operatingManualLink`}
                  type="text"
                  meta={{
                    label: 'Operating Manual Link',
                    isRequired: true,
                  }}
                  component={TextField}
                />
              </Card>
            </Form>
          )
        }}
      </ModalFormikProvider>
    )
  }
}
