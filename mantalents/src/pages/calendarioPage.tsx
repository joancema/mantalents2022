import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'moment/locale/es';
import { messages } from  '../helpers/calendarMessagesEs';
import { CalendarEvent } from '../components/calendarEvent';
import { useState } from 'react';
import { Button, Col, Drawer, Row, Form, DatePicker, Input } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import moment, { Moment } from "moment";

  const { RangePicker } = DatePicker;
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
export const CalendarioPage= ()=>{
  const [FormaCita] = Form.useForm();
    const [cita, setcita] = useState(false);
    const [eventlist, seteventlist] =  useState([{
        title:'Compraron un pastel',
        start:moment().toDate(),
        end: moment().add(2,"hours").toDate(),
        bgcolor:"#fafafa",
        name:"joancema"
      }]);
    const [lastview, setlastview] = useState( localStorage.getItem('lastview')||'MONTH' );
  const onDoubleClick=(e:any) =>{
    console.log(e);
  }
  const onSelectEvent = (e:any)=>{
    console.log(e);
  }
  const onViewChange = (e:any)=>{
    setlastview(e);
    localStorage.setItem('lastView', e);
  }
  const agregarEvento= ()=>{

    setcita(true);
      // seteventlist([...eventlist, {
      //   title:'Prueba',
      //   start:moment().add(1,'days').toDate(),
      //   end: moment().add(1,'days').toDate(),
      //   bgcolor:"#fafafa",
      //   name:"joancemin"
      // }])
      
  }
  const onFinishCita = async (values:{fecha:Moment})=>{
  }
  function onChange(value:any, dateString:[string,string]) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  function onOk(value:any) {
    console.log('onOk: ', value);
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
        <Form.Item label="Paciente" name="paciente"
        rules={[{ required: true, message: 'Por favor ingrese paciente' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Fecha" name="fecha">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item label="Motivo" name="motivo"
        rules={[{ required: true, message: 'Por favor ingrese motivo de consulta' }]}>
          <Input />
        </Form.Item>
      </Form>
  </Drawer>
  </>
  )
}