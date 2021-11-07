import { Table, Drawer, Button, Form, Input, message, Row, 
  Col, Divider, DatePicker, Select, Space, InputNumber, Spin  } from "antd";
import { SaveOutlined, PlusOutlined, EditOutlined, MinusCircleOutlined, CloudUploadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useMovimiento } from "../hooks/useMovimiento";
import { fetchDescargar, fetchelectronica, fetchUltimoMovimiento, postmovimiento } from "../helpers/serviceMovimientos";
import {  Movimiento } from "../interfaces/fetchMovimientos";
import { tableColumnTextFilterConfig } from "../helpers/tableUtils"
import { usePersona } from "../hooks/usePersona";
import { useProducto } from "../hooks/useProducto";
import { Persona } from "../interfaces/fetchPersonas";
import { Producto } from "../interfaces/fetchProductos";
import { Producto as Productom } from "../interfaces/fetchMovimientos";
import {Decimal} from "decimal.js-light";
import { PostProducto } from "../interfaces/postMovimiento";
import moment, { Moment } from "moment";
import { ClienteComponente } from "../components/cliente";

const { Option } = Select;

export const MovimientosPage= ()=>{

    const crearMovimiento=()=>{
      fetchUltimoMovimiento().then(respuesta=>{
        Forma.setFieldsValue({
          codigo:parseInt(respuesta.codigo)+1
        });
      })
      setformulario(true);
      setmovimiento({_id:"", fecha: new Date() , codigo:"", subtotal:0, iva:0, total:0, descuento:0});
      Forma.setFieldsValue({
        cliente: "",
        subtotal: 0,
        iva: 0,
        descuento: 0,
        total: 0,
        fecha: moment(new Date() , "YYYY-MM-DD") ,
        productos: [{ item:"" , cantidad:1, precio:0 }]
      })
    }
    const calcularTotal=(_:any ,values:{productos:PostProducto[]})=>{
      const rowsCopy = [...values.productos ];
      let totalAuxiliar=0;
      values.productos.forEach((fieldGroup, index) => {
        if (fieldGroup && fieldGroup.cantidad && fieldGroup.precio) {
          fieldGroup.total = fieldGroup.cantidad * fieldGroup.precio;
          totalAuxiliar+= fieldGroup.total;
          rowsCopy.splice(index, 1, fieldGroup)
          Forma.setFieldsValue({ productos: rowsCopy })
        }
      });
      let auxiliar =  new Decimal(totalAuxiliar);
      Forma.setFieldsValue(
        { 
          subtotal: auxiliar,
          iva:  auxiliar.mul(0.12),
          total: auxiliar.mul(1.12),
        });
    }
    const [Forma] = Form.useForm();
    const [Formac] = Form.useForm();
    const [persona, setpersona] = useState<Persona>({_id:'', identificacion:'', nombre:'', direccion:'', telefono:'', correoelectronico:''});
    const [formularioc, setformularioc] = useState(false);
    const [procesando, setprocesando] = useState(false);

    const crearPersona=()=>{
      setformularioc(true);
      setpersona({_id:"",identificacion:"", nombre:"", direccion:"", telefono:"", correoelectronico:""});
      Formac.setFieldsValue({
        identificacion: "",
        nombre: "",
        direccion: "",
        telefono: "",
        correoelectronico: "",
        
      })
    }

    const columns = [
        {
          title: 'Código',
          dataIndex: 'codigo',
          key: 'codigo',
          width:150,
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Movimiento>(),
          onFilter: (value: {}, record: Movimiento  ):boolean => {
            return record.codigo.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Movimiento, b:Movimiento) => a.codigo.length - b.codigo.length,
        },
        {
            title:'Fecha',
            dataIndex:'fecha',
            key:'fecha',
            width:200,
            render: (valor: any) =>  (typeof(valor)==="string")?valor.substr(0,10) : moment(valor).format("YYYY-MM-DD")  ,
        },
        {
          title: 'Cliente',
          dataIndex: ['cliente','nombre'],
          key: 'cliente',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          width:200,
          fixed:'right' as 'right',
          render: ( record: Movimiento) => 
          <Space>
          <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
          { ()=>
            
            {
              setformulario(true); 
              setmovimiento(record);
              let auxiliar: PostProducto[]=[] ;
              record.productos?.forEach(
                elemento=>{
                  auxiliar.push({ item:elemento.item._id,
                     cantidad: elemento.cantidad, precio: elemento.precio, total: elemento.cantidad*elemento.precio })
                }
              )
              Forma.setFieldsValue({
                codigo: record.codigo,
                cliente: record.cliente?._id,
                subtotal: record.subtotal,
                iva: record.iva,
                descuento: record.descuento,
                total: record.total,
                fecha: moment(record.fecha, "YYYY-MM-DD"),
                productos: auxiliar
              })
              
            } 
          }/>
          
          <Button type="primary" shape="circle" icon={ <CloudUploadOutlined /> } onClick={()=>{
            setprocesando(true);
            fetchelectronica(record._id).then(resultado=>{
              console.log(resultado.data[0]);
              let mensajeActual=""
              if (resultado.data[0].RespuestaRecepcionComprobante)
              {
                mensajeActual= resultado.data[0].RespuestaRecepcionComprobante.comprobantes.comprobante.mensajes.mensaje.mensaje;
              }
              else
              {
                mensajeActual= resultado.data[0].RespuestaAutorizacionComprobante.autorizaciones.autorizacion.numeroAutorizacion;
              }
              setprocesando(false);
              message.success(`Se presentaron los siguientes mensajes: ${mensajeActual} `);
            }).catch(err=>{
              console.log(err)
              setprocesando(false);
              message.error("Se presentaron los siguientes mensajes");
            })
          } }/>
          <Button type="primary" shape="circle" icon={ <CloudDownloadOutlined /> } onClick={()=>{
            fetchDescargar(record._id).then(resultado=>{
              console.log(resultado)
            })
          }}/>

          </Space>,
        },
      ];
      const { movimientos, setMovimientos, isLoading } = useMovimiento();
      const [movimiento, setmovimiento] = useState<Movimiento>({_id:'', fecha: new Date() , iva:0, descuento:0, subtotal:0, total:0, codigo:"",  });
      const { personas, setPersonas } = usePersona();
      const { productos } = useProducto();
      const [formulario, setformulario] = useState(false);
      const onFinish = (values: {codigo:string, fecha:Moment, subtotal:number, iva:number, descuento:number, cliente:string ,total:number, productos: PostProducto[]}) => {


        setmovimiento({
          _id: movimiento._id,
          codigo: values.codigo,
          fecha: new Date(values.fecha.toISOString().substr(0,10) ) ,
          subtotal:values.subtotal,
          iva:values.iva,
          descuento:values.descuento,
          total:values.total
        })
        let auxiliar:Productom[]=[];
        values.productos.forEach(ele=>{
          auxiliar.push(
            { 
              cantidad: ele.cantidad, precio: ele.precio,
               item:{ _id:ele.item , nombre:"", categoria:"", precio:0, estado:true }  ,
               _id:"" 
            })
        })


        let clienteAuxiliar:Persona= personas.filter(p=>{return p._id===values.cliente})[0];

        postmovimiento( movimiento._id, { codigo: values.codigo , fecha: values.fecha.format("YYYY-MM-DD")  , cliente: values.cliente, productos: values.productos, subtotal: values.subtotal , iva: values.iva, descuento:values.descuento, total: values.total   } ).then(respuesta=>{
          if (movimiento._id.length>0)
            setMovimientos( movimientos.map(ele=>{ if (ele._id===movimiento._id)
               return {
                      ...ele, codigo: values.codigo,
                      fecha: moment(values.fecha, "YYYY-MM-DD").toDate() ,
                      cliente: { _id: clienteAuxiliar._id, nombre: clienteAuxiliar.nombre
                      ,direccion: clienteAuxiliar.direccion, telefono:clienteAuxiliar.telefono
                    , identificacion: clienteAuxiliar.identificacion, correoelectronico: clienteAuxiliar.correoelectronico,
                     estado:true  }  ,
                      descuento: values.descuento ,
                      iva: values.iva, 
                      subtotal: values.subtotal, 
                      total: values.total ,
                      productos: auxiliar,
                      } ; else return ele;}) )
          else
            setMovimientos([...movimientos, {...respuesta, cliente:{ _id: clienteAuxiliar._id, nombre: clienteAuxiliar.nombre
              ,direccion: clienteAuxiliar.direccion, telefono:clienteAuxiliar.telefono
            , identificacion: clienteAuxiliar.identificacion, correoelectronico: clienteAuxiliar.correoelectronico,
             estado:true  }}])
          message.success("Se almacenó correctamente el movimiento");
          setformulario(false);
        }).catch(error=>{
          message.error("Se presentaron errores al intentar almacenar los movimientos");
        });
      };
    return (
      <>
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={crearMovimiento} />
          </Col>
        </Row>
        <Divider orientation="left">Movimientos</Divider>
        <Spin spinning={procesando} delay={500} size="large" tip="Procesando...">
          <Row gutter= {[16, 24]}>
          <Table tableLayout='fixed' 
            loading= {isLoading}
            rowKey='_id'
            key="_id"
            pagination={{ defaultPageSize: 5, showSizeChanger: true,
              pageSizeOptions: ['5','10', '20', '30']}} 
            scroll={{ x: 1300 }}
            dataSource={movimientos} columns={columns} />
          </Row>
        </Spin>
        <Drawer
          title="Movimiento"
          width={720}
          height={600}
          onClose={()=>{ setformulario(false); }}
          visible={formulario}
          bodyStyle={{ paddingBottom: 120 }}
          placement="bottom"
        >
          <Form
              form= {Forma}
              name="formmovimiento"
              //labelCol={{ span: 2 }}
              //wrapperCol={{ span: 6 }}
              initialValues={{ remember: true }}
              onValuesChange={calcularTotal}
              onFinish={ onFinish }
              onFinishFailed={()=>{}}
              autoComplete="off">
                <Form.Item
                  label="Código"
                  name="codigo"
                  style={{ width: 300 }}
                  rules={[{ required: true, message: 'Por favor ingrese el código' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Fecha" name="fecha">
                  <DatePicker/>
                </Form.Item>
                <Form.Item
                  label="Cliente"
                  name="cliente">
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Selecciona una persona"
                    optionFilterProp="children"
                    onChange={()=>{}}
                    onSearch={()=>{}}
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                      personas.map(({ _id, nombre }: Persona) =>{
                        return (
                          <Option key={_id} value={_id}>{nombre}</Option>
                        )
                      })
                    }
                  </Select>
                  
                </Form.Item>
                <Form.Item>
                <Button type="dashed" onClick={() => {  crearPersona() } }  icon={<PlusOutlined />}>
                      Agregar
                </Button>
                </Form.Item>
                
                <Form.List name="productos">
                {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}  align="baseline">
                    <Form.Item
                      name={[field.name, 'item']}
                      fieldKey={[field.fieldKey, 'item']}
                      >
                      <Select
                        showSearch
                        style={{ width: 400 }}
                        placeholder="Seleccione producto"
                        optionFilterProp="children"
                        onChange={()=>{}}
                        onSearch={()=>{}}
                        filterOption={(input, option) =>
                          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                          productos.map(({ _id, nombre }: Producto) =>{
                            return (
                              <Option key={_id} value={_id}>{nombre}</Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'cantidad']}
                      fieldKey={[field.fieldKey, 'cantidad']}
                      rules={[{ required: true, message: 'Debe ubicar el cantidad' }]}>
                      <InputNumber placeholder="Cantidad"  />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'precio']}
                      fieldKey={[field.fieldKey, 'precio']}
                      rules={[{ required: true, message: 'Debe ubicar el precio' }]}>
                      <InputNumber placeholder="Precio"  />
                    </Form.Item>
                    <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, 'total']}
                    fieldKey={[field.fieldKey, 'total']}
                  >
                    <Input disabled placeholder="Total" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => {remove(field.name);  } } />
                    </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Agregar
                    </Button>
                  </Form.Item>
                </>
                )}
                </Form.List>
                <Form.Item
                  label="Subtotal"
                  name="subtotal"
                  style={{ width: 300 }}
                  >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Iva"
                  name="iva"
                  style={{ width: 300 }}
                  >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Descuento"
                  name="descuento"
                  style={{ width: 300 }}
                  >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="total"
                  style={{ width: 300 }}
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
        <ClienteComponente Forma={Formac}
        persona={ persona} setpersona= {setpersona}
        personas= {personas} setPersonas={setPersonas}
         formulario={formularioc} setformulario={setformularioc}
         />
      </>
    )
}