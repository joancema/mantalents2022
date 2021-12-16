import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'moment/locale/es';
import { messages } from  '../helpers/calendarMessagesEs';
import { CalendarEvent } from '../components/calendarEvent';
import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Row, Form, DatePicker, Input, Select, message } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import moment, { Moment } from "moment";
import { Paciente } from '../interfaces/fetchPacientes';
import { usePaciente } from "../hooks/usePaciente";
import { useCitaprevia } from "../hooks/useCitaprevia";
import { postcitaprevia } from '../helpers/serviceCitasprevias';

  const  {TextArea} = Input;
  const { Option } = Select;
  const localizer = momentLocalizer(moment);
  moment.locale('es');
  const vistaActual = (parametro:String)=>{
    switch (parametro.toUpperCase()) {
        case "WEEK":
            return Views.WEEK;
        case "MONTH":
            return Views.MONTH;
        case "AGENDA":
            return Views.AGENDA;
        case "WORK_WEEK":
            return Views.WORK_WEEK;
        default:
            return  Views.DAY
    }
    
  }

interface ievento {
  title:string
  start: Date
  end: Date
  bgcolor:string
  name:string
  id:string
}
export const CalendarioPage= ()=>{
  const [FormaCita] = Form.useForm();
    const [cita, setcita] = useState(false);
    const { citasprevias, setCitasprevias } = useCitaprevia();
    
    const [eventlist, seteventlist] =  useState<ievento[]>([
    ]);
    useEffect(()=>{
      if (citasprevias && citasprevias.length>0)
      {
        let auxeventos:ievento[]=[] ;
        citasprevias.map(ele=>{
          auxeventos.push({
            title:ele.motivo,
            start: new Date(ele.desde.toString()) ,
            end:   new Date(ele.hasta.toString()) ,
            bgcolor:"#fafafa",
            name:ele.paciente.nombre,
            id:ele._id
          })
          return true;
        })
        seteventlist(auxeventos);
      }

    },[citasprevias])
    const [lastview, setlastview] = useState( localStorage.getItem('lastview')||'MONTH' );
    const { pacientes } = usePaciente();


  const onDoubleClick=(e:any) =>{
    console.log(e);
  }
  const onSelectEvent = (e:any)=>{
    let resultado =  citasprevias.find(p=>{return p._id=== e.id});
    console.log(resultado)
    setcita(true);
    FormaCita.setFieldsValue({
      id:resultado?._id ,
      motivo:resultado?.motivo ,
      paciente:resultado?.paciente._id,
      desde: moment(resultado?.desde , "YYYY-MM-DD HH:mm"),
      hasta:moment(resultado?.hasta , "YYYY-MM-DD HH:mm"),
    })
  }
  const onViewChange = (e:any)=>{
    setlastview(e);
    localStorage.setItem('lastView', e);
  }
  const agregarEvento= ()=>{

    setcita(true);
    FormaCita.setFieldsValue({
      id:"",
      motivo:"",
      paciente:"",
      desde:moment(new Date() , "YYYY-MM-DD"),
      hasta:moment(new Date() , "YYYY-MM-DD"),
    })
      
      
  }
  const onFinishCita = async (values:{id:string, desde:Moment, hasta:Moment, motivo:string , paciente: string })=>{
    //console.log({...values, _id: values.id, desde: values.desde.toDate(), hasta: values.hasta.toDate()  })
    postcitaprevia({...values, _id: values.id, desde: values.desde.toDate(), hasta: values.hasta.toDate()  })
    .then(respuesta=>{
      seteventlist([...eventlist, {
        title:respuesta.motivo ,
        start: respuesta.desde,
        end: respuesta.hasta,
        bgcolor:"#fafafa",
        name:respuesta.paciente.nombre,
        id:respuesta._id
      }])
      setCitasprevias([...citasprevias, respuesta ]);
      message.success("Se almacenó correctamente la cita previa");
      setcita(false);
    })
  }
  const cambiaDesde=(valor:Moment|null)=>{
    if (valor)
    {
      FormaCita.setFieldsValue({
        hasta:valor.clone().add(30,"minutes")
      })
    }
  }
  const eventStyleGetter = (event:any , start:any, end:any,isSelected:Boolean)=> {

    const style={
        backgroundColor:"yellow",
        borderRadius:"0px",
        opacity:0.8,
        display:"block",
        color:"red"
      }
      return {
        style
      }
  }
  const abrirCita=()=>{
    agregarEvento()
  }
  return (
    <>
    <div className="calendar-screen">
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={abrirCita} />
          </Col>
        </Row>
    <Calendar localizer={localizer}
    events={eventlist}
    startAccessor="start"
    endAccessor="end"
    messages={messages}
    eventPropGetter= {eventStyleGetter}
    onDoubleClickEvent={onDoubleClick}
    onSelectEvent = {onSelectEvent}
    onView = {onViewChange}
    view= { vistaActual(lastview) }
    components = { {
      event: CalendarEvent
    } }
    />
  </div>
  <Drawer
    title="Cita"
    width={720}
    height={500}
    onClose={()=>{ setcita(false); }}
    visible={cita}
    bodyStyle={{ paddingBottom: 60 }}
    placement="bottom"
  >
      <Form
      form= {FormaCita}
      name="formcita"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 16 }}
      size={"small"}
      initialValues={{ remember: true }}
      onFinish={ onFinishCita }
      onFinishFailed={()=>{}}
      autoComplete="off">
        <Form.Item
                  label="Paciente"
                  name="paciente">
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Selecciona un paciente"
                    optionFilterProp="children"
                    onChange={()=>{}}
                    onSearch={()=>{}}
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                      pacientes.map(({ _id, nombre }: Paciente) =>{
                        return (
                          <Option key={_id} value={_id}>{nombre}</Option>
                        )
                      })
                    }
                  </Select>
                  
                </Form.Item>
        <Form.Item label="Desde" name="desde">
          <DatePicker 
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={cambiaDesde}
          />
        </Form.Item>
        <Form.Item label="Hasta" name="hasta">
          <DatePicker 
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item label="Motivo" name="motivo"
        rules={[{ required: true, message: 'Por favor ingrese motivo de consulta' }]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="ID" name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Guardar cita
          </Button>
        </Form.Item>
      </Form>
  </Drawer>
  </>
  )
}