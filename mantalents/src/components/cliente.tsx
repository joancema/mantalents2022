import {  Drawer, Button, Form, Input, message } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import { postpersona } from "../helpers/servicePersonas";
import { Persona } from "../interfaces/fetchPersonas";

type PersonaProps = {
    persona: any,
    setpersona: any,
    personas?:Persona[],
    setPersonas?:any,
    formulario:any,
    setformulario:any,
    Forma:any,
  }

export const ClienteComponente= ({ Forma, persona, setpersona, personas=[], setPersonas,formulario, setformulario }: PersonaProps)=>{




const onFinish = (values: {identificacion:string,nombre:string,direccion:string, telefono:string, correoelectronico:string }) => {
    setpersona({
        _id: persona._id,
        identificacion:values.identificacion,
        nombre: values.nombre,
        direccion:values.direccion,
        telefono: values.telefono,
        correoelectronico:values.correoelectronico,
      })
      postpersona({...values  ,  _id: persona._id }).then(respuesta=>{
        if (persona._id.length>0)
        {
          setPersonas( 
            personas.map(ele=>{ if (ele._id===persona._id)
               return {...ele, identificacion:values.identificacion,
                 nombre: values.nombre, direccion: values.direccion,
                  telefono:values.telefono, correoelectronico:values.correoelectronico ,
                  } ; else return ele;}) )
        }
        else
        {
          console.log(respuesta)
          setPersonas([...personas, respuesta])
          console.log(personas)
        }
        message.success("Se almacenó correctamente el producto");
        setformulario(false);
      }).catch(error=>{
        message.error("Se presentaron errores al intentar almacenar los productos");
      });
}

return (
<Drawer
          title="Crear/Modificar Cliente"
          width={720}
          height={400}
          onClose={()=>{ setformulario(false); }}
          visible={formulario}
          bodyStyle={{ paddingBottom: 120 }}
          placement="bottom"
        >
          <Form
              form= {Forma}
              name="formcategoria"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={ onFinish }
              onFinishFailed={()=>{}}
              autoComplete="off">
                <Form.Item
                  label="Identificación"
                  name="identificacion"
                  rules={[{ required: true, message: 'Por favor ingrese la identificación' }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Descripción"
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}>
                  <Input />
                </Form.Item>
                
                <Form.Item
                  label="Dirección"
                  name="direccion"
                  >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Teléfono"
                  name="telefono"
                  >
                  <Input />
                  </Form.Item>
                  <Form.Item
                  label="Correo Electrónico"
                  name="correoelectronico"
                  >
                  <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Guardar
                  </Button>
                </Form.Item>
              </Form>
        </Drawer>
)
}