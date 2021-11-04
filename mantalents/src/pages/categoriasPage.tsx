import { Table, Drawer, Button, Form, Input, message, Row, Col, Divider } from "antd";
import { SaveOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useCafe } from "../hooks/useCafe";
import { postcategoria } from "../helpers/serviceCategorias";
import { Categoria } from "../interfaces/fetchCategorias";
import { tableColumnTextFilterConfig } from "../helpers/tableUtils"


export const CategoriasPage= ()=>{
    const crearCategoria=()=>{
      setformulario(true);
      setcategoria({_id:"", nombre:""});
      Forma.setFieldsValue({
        nombre: ""
      })
    }
    const [Forma] = Form.useForm();

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Categoria>(),
          onFilter: (value: {}, record: Categoria  ):boolean => {
            return record.nombre.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Categoria, b:Categoria) => a.nombre.length - b.nombre.length,
        },
        {
          title: 'Usuario',
          dataIndex: ['usuario','nombre'],
          key: 'usuario',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          width:200,
          fixed:'right' as 'right',
          render: ( record: Categoria) => <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
          { ()=>
          
            { 
              setformulario(true); 
              setcategoria(record);
              Forma.setFieldsValue({
                nombre: record.nombre
              })
              
            } 
          }/>,
        },
      ];
      const { categorias, setCategorias, isLoading } = useCafe();
      const [categoria, setcategoria] = useState<Categoria>({_id:'', nombre:''});
      const [formulario, setformulario] = useState(false);
      const onFinish = (values: {nombre:string}) => {
        setcategoria({
          _id: categoria._id,
          nombre: values.nombre
        })
        postcategoria({...values, _id:categoria._id }).then(respuesta=>{
          if (categoria._id.length>0)
            setCategorias( categorias.map(ele=>{ if (ele._id===categoria._id) return {...ele, nombre: values.nombre  } ; else return ele;}) )
          else
            setCategorias([...categorias, respuesta])
          message.success("Se almacenó correctamente la categoría");
          setformulario(false);
        }).catch(error=>{
          message.error("Se presentaron errores al intentar almacenar las categorias");
        });
      };
    return (
      <>
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={crearCategoria} />
          </Col>
        </Row>
        <Divider orientation="left">Categorias/Grupos</Divider>
        <Row gutter= {[16, 24]}>
        <Table tableLayout='fixed'
           loading= {isLoading}
           rowKey='_id'
           pagination={{ defaultPageSize: 5, showSizeChanger: true,
           pageSizeOptions: ['5','10', '20', '30']}} 
           scroll={{ x: 1300 }}
           dataSource={categorias} columns={columns} />
        </Row>
        <Drawer
          title="Categoría"
          width={720}
          height={300}
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
                  label="Descripción"
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}>
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Guardar
                  </Button>
                </Form.Item>
              </Form>
        </Drawer>
      </>
    )
}