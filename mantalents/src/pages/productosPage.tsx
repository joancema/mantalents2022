import { Table, Drawer, Button, Form, Input, message, Row, Col, Divider, 
  InputNumber, Select, Upload, Avatar, Image } from "antd";
import { SaveOutlined, PlusOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { getFileProducto, postFileProducto, postproducto } from "../helpers/serviceProductos";
import { Producto } from "../interfaces/fetchProductos";
import { tableColumnTextFilterConfig } from "../helpers/tableUtils"
import { useProducto } from "../hooks/useProducto";
import { Categoria } from "../interfaces/fetchCategorias";
import { useCafe } from "../hooks/useCafe";
const { Option } = Select;


export const ProductosPage= ()=>{
  
  const cambiarFotoBefore=( archivo: File )=>{
    setarchivo(archivo);
  }

    
    const crearProducto=()=>{
      setformulario(true);
      setproducto({_id:"", nombre:"", precio:0, costo:0, minimo:0, categoria:{_id:"", nombre:""}});
      Forma.setFieldsValue({
        nombre: "",
        precio:0,
        costo:0,
        minimo:0,
        categoria:""
      })

      setProductos( 
        productos.map(ele=>{ 
          return {...ele,  idaux: ele._id,  } ;
          }));
      
    }
    const [Forma] = Form.useForm();

    const columns = [
        {
          title:'Foto',
          key:'foto',
          render: (record: Producto)=>  
          <>
            <Avatar key={record._id} src={getFileProducto( record.img||"" )} />
          </>
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Producto>(),
          onFilter: (value: {}, record: Producto  ):boolean => {
            return record.nombre.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Producto, b:Producto) => a.nombre.length - b.nombre.length,
        },
        {
            title: 'Categoria',
            dataIndex: ['categoria','nombre'],
            key: 'categoria',
        },
        {
          title: 'Precio',
          dataIndex: 'precio',
          key: 'precio',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          width:200,
          fixed:'right' as 'right',
          render: ( record: Producto) => <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
          { ()=>
          
            { 
              setformulario(true); 
              setproducto(record);
              Forma.setFieldsValue({
                nombre: record.nombre,
                precio: record.precio,
                costo: record.costo,
                minimo: record.minimo,
                categoria: record.categoria._id
              })
              
            } 
          }/>,
        },
      ];
      const { productos, setProductos, isLoading } = useProducto();
      const { categorias } = useCafe();
      const [archivo, setarchivo] = useState<File>();
      const [producto, setproducto] = useState<Producto>({_id:'', nombre:'', precio:0, categoria:{_id:"", nombre:""}});
      const [formulario, setformulario] = useState(false);
      let auxiliarProductos:Producto[]=[];
      const onFinish = async (values: {nombre:string, precio:number,costo:number, minimo:number, categoria: string}) => {
        setproducto({
          _id: producto._id,
          nombre: values.nombre,
          precio:values.precio,
          costo: values.costo,
          minimo:values.minimo,
          categoria:{_id: values.categoria , nombre:""}
        })
        let nombreCategoria="";
        if (values.categoria && values.categoria.length>0 )
        {
          nombreCategoria= categorias.filter(ele=>{
            return ele._id=== values.categoria;
          })[0].nombre;
        }
        let respuesta = await postproducto({...values , categoria :values.categoria ,  id:producto._id });
          if (producto._id.length>0)
          {
            auxiliarProductos=
              productos.map(ele=>{ 
                if (ele._id===producto._id)
                return {...ele, nombre: values.nombre, precio: values.precio, 
                  costo:values.costo, minimo:values.minimo , idaux:"", img: respuesta.img,
                  categoria: {_id:values.categoria, nombre:nombreCategoria}  } ; 
                  else
                return ele;});
            
            

          }
          else
          {
            auxiliarProductos=   [...productos, respuesta] ;
          }
          let respuestaConFoto= await postFileProducto(respuesta._id , archivo! );
          
           auxiliarProductos = auxiliarProductos.map(elex=>{
             if ( elex._id===respuestaConFoto._id ) return { ...elex, img: respuestaConFoto.img  }
             else return elex;
           })

          setProductos(auxiliarProductos);
          message.success("Se almacenó correctamente el producto");
          setformulario(false);
      };
      
      
    return (
      <>
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={crearProducto} />
          </Col>
        </Row>
        <Divider orientation="left">Productos</Divider>
        <Row gutter= {[16, 24]}>
        <Table tableLayout='fixed'
           loading= {isLoading}
           rowKey='_id'
           key="_id"
           pagination={{ defaultPageSize: 5, showSizeChanger: true,
           pageSizeOptions: ['5','10', '20', '30']}} 
           scroll={{ x: 1300 }}
           dataSource={productos} columns={columns} />
        </Row>
        <Drawer
          title="Items"
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
                  label="Descripción"
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Costo" name="costo">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Mínimo" name="minimo">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Precio" name="precio">
                    <InputNumber min="0.01"/>
                </Form.Item>
                <Form.Item label="Categoria" name="categoria">
                <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={()=>{}}
                    onSearch={()=>{}}
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                      categorias.map(({ _id, nombre }: Categoria) =>{
                        return (
                          <Option key={_id} value={_id}>{nombre}</Option>
                        )
                      })
                    }
                  </Select>
                  
                  </Form.Item>
                  <Form.Item label="Foto" name="foto">
                    <Upload
                      listType="picture"
                      maxCount={1}
                      beforeUpload= {cambiarFotoBefore}
                      >
                      <Button icon={<UploadOutlined />}>Subir (Max: 1)</Button>
                    </Upload>
                  </Form.Item>
                  {
                    producto.img && 
                    <Form.Item>
                      <Image
                        width={200}
                        src={  getFileProducto(producto.img)  }
                      />
                    </Form.Item>
                  }
                  
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