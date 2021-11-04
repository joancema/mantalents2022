import { Table, Button, Form, Row, Col, Divider } from "antd";
import {  PlusOutlined, EditOutlined } from '@ant-design/icons';
import { usePersona } from "../hooks/usePersona";
import { Persona } from "../interfaces/fetchPersonas";
import { tableColumnTextFilterConfig } from "../helpers/tableUtils";
import { useState } from "react";
import { ClienteComponente } from "../components/cliente";


export const ClientesPage= ( )=>{

    const [Forma] = Form.useForm();

    const crearPersona=()=>{
        setformulario(true);
        setpersona({_id:"",identificacion:"", nombre:"", direccion:"", telefono:"", correoelectronico:""});
        Forma.setFieldsValue({
         
          identificacion: "",
          nombre: "",
          direccion: "",
          telefono: "",
          correoelectronico: "",
          
        })
      }

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Persona>(),
          onFilter: (value: {}, record: Persona  ):boolean => {
            return record.nombre.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Persona, b:Persona) => a.nombre.length - b.nombre.length,
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
          render: ( record: Persona) => <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
          { ()=>
          
            { 
              setformulario(true); 
              setpersona(record);
              Forma.setFieldsValue({
                identificacion: record.identificacion,
                nombre: record.nombre,
                direccion: record.direccion,
                telefono: record.telefono,
                correoelectronico: record.correoelectronico,
              })
              
            } 
          }/>,
        },
      ];

    const {  isLoading,personas, setPersonas } = usePersona();
    const [persona, setpersona] = useState<Persona>({_id:'', identificacion:'', nombre:'', direccion:'', telefono:'', correoelectronico:''});
    const [formulario, setformulario] = useState(false);
    
    return (
        <>
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={crearPersona} />
          </Col>
        </Row>
        <Divider orientation="left">Clientes</Divider>
        <Row gutter= {[16, 24]}>
        <Table tableLayout='fixed'
           loading= {isLoading}
           rowKey='_id'
           pagination={{ defaultPageSize: 5, showSizeChanger: true,
           pageSizeOptions: ['5','10', '20', '30']}} 
           scroll={{ x: 1300 }}
           dataSource={personas} columns={columns} />
        </Row>
        <ClienteComponente Forma={Forma}
        persona={ persona} setpersona= {setpersona}
         personas = {personas} setPersonas={setPersonas} 
         formulario={formulario} setformulario={setformulario}
         />
        
      </>
    )
}