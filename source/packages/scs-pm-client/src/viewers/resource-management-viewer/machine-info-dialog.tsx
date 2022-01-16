import { Card, Col, Form, Row } from 'antd'
import { FastField } from 'formik'
import * as React from 'react'
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
                  name={`giveName`}
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
