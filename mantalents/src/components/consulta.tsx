import {  Drawer, Button, Form, Input, Row, Col, DatePicker, Upload } from "antd";
import { SaveOutlined,  UploadOutlined } from '@ant-design/icons';
import { getFileCita } from "../helpers/servicePacientes";

const { TextArea } = Input;

type PersonaProps = {
    paciente: any,
    citaactual: any,
    cita?:boolean,
    setcita?:any,
    FormaCita:any,
    onFinishCita:any,
    cambiarAdjuntoBefore:any
  }

export const ConsultaComponente= (
  {  paciente, citaactual, cita, setcita, FormaCita, onFinishCita, cambiarAdjuntoBefore }
  : PersonaProps)=>{



return (
  <Drawer
            title={ "Consultas de: " + paciente.nombre  }
            width={720}
            height={650}
            onClose={()=>{ setcita(false); }}
            visible={cita}
            bodyStyle={{ paddingBottom: 60 }}
            placement="bottom"
          >
            <Form
                form= {FormaCita}
                name="formcita"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                size={"small"}
                initialValues={{ remember: true }}
                onFinish={ onFinishCita }
                onFinishFailed={()=>{}}
                autoComplete="off">
                  <Row>
                  <Col xs={2} sm={4} md={6} lg={8} xl={12}>
                  <Form.Item label="Fecha" name="fecha">
                    <DatePicker 
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Motivo de la Consulta"
                    name="motivo"
                    rules={[{ required: true, message: 'Por favor ingrese motivo de la consulta' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Anamnesis"
                    name="anamnesis"
                    rules={[{ required: true, message: 'Por favor ingrese anamnesis' }]}>
                    <TextArea />
                  </Form.Item>
                  <Form.Item
                    label="Presión Arterial"
                    name="presionalterial"
                    rules={[{ required: true, message: 'Por favor ingrese presión alterial' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Pulso"
                    name="pulso"
                    rules={[{ required: true, message: 'Por favor ingrese pulso' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Estatura"
                    name="estatura"
                    rules={[{ required: true, message: 'Por favor ingrese estatura' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Peso"
                    name="peso"
                    rules={[{ required: true, message: 'Por favor ingrese peso' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="IMC"
                    name="imc"
                    rules={[{ required: true, message: 'Por favor ingrese IMC' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Temperatura"
                    name="temperatura"
                    rules={[{ required: true, message: 'Por favor ingrese temperatura' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Hemoglucotest"
                    name="hemo">
                    <Input />
                  </Form.Item>
                  
                  </Col>
                  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <Form.Item
                    label="Saturación de Oxígeno"
                    name="saturacion">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Examen Físico"
                    name="medicamento"
                    rules={[{ required: true, message: 'Por favor ingrese medicamento' }]}>
                    <TextArea />
                  </Form.Item>
                  <Form.Item
                    label="Diagnóstico"
                    name="diagnostico"
                    rules={[{ required: true, message: 'Por favor ingrese diagnóstico' }]}>
                    <TextArea />
                  </Form.Item>
                  <Form.Item
                    label="Tratamiento"
                    name="tratamiento"
                    rules={[{ required: true, message: 'Por favor ingrese tratamiento' }]}>
                    <TextArea />
                  </Form.Item>
                  <Form.Item label="Próxima Atención" name="fechaproximaatencion">
                    <DatePicker 
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    />
                  </Form.Item>
                  <Form.Item label="Adjunto" name="adjunto">
                      <Upload
                        listType="text"
                        maxCount={1}
                        showUploadList={true}
                        beforeUpload= {cambiarAdjuntoBefore}
                        >
                        <Button icon={<UploadOutlined />}>Subir (Max: 1)</Button>
                      </Upload>
                    </Form.Item>
                    {
                      citaactual.img && 
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="link" href={getFileCita(citaactual.img)}>Dar click</Button>
                      </Form.Item>
                    }
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                      Guardar cita
                    </Button>
                  </Form.Item>
                  </Col>
                  </Row>
            </Form>
  </Drawer>
)
}