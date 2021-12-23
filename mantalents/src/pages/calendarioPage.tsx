import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'moment/locale/es';
import { messages } from  '../helpers/calendarMessagesEs';
import { CalendarEvent } from '../components/calendarEvent';
import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Row, Form, DatePicker, Input, Select, message } from 'antd';
import { PlusOutlined, SaveOutlined, SolutionOutlined } from '@ant-design/icons';
import moment, { Moment } from "moment";
import { Cita, Paciente } from '../interfaces/fetchPacientes';
import { usePaciente } from "../hooks/usePaciente";
import { useCitaprevia } from "../hooks/useCitaprevia";
import { postcitaprevia } from '../helpers/serviceCitasprevias';
import { ConsultaComponente } from '../components/consulta';
import { postcita, postFileCita } from '../helpers/servicePacientes';
import { Citasprevias, Citaspreviasplanas } from '../interfaces/fetchCitasPrevias';

//FIXME que al modificar una cita no se duplique.
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
  const [adjunto, setadjunto] = useState<File>();

  const cambiarAdjuntoBefore = (adjunto: File)=>{
    setadjunto(adjunto);
  }

  const [FormaCita] = Form.useForm();
  const [FormaCitaf] = Form.useForm();
    const [citav, setcitav] = useState(false);
    const [citav2, setcitav2] = useState(false);
    const { citasprevias, setCitasprevias } = useCitaprevia();
    
    const [cita2] = useState<Cita>({ _id:"", imc:"", anamnesis:"", diagnostico:""
  , estatura:"", fecha:new Date(), fechaproximaatencion:new Date(), medicamento:"", motivo:""
, peso:"", presionalterial:"", pulso:"",saturacion:"", temperatura:"", tratamiento:"",
hemo:""  })

const [paciente,setpaciente] =  useState<Paciente>({
  _id:"", alergia:"", email:"", fechanacimiento:new Date(),
  nacionalidad:"", nombre:"", otrosdatos:"", previsionsalud:"",rut:"",sexo:"",
  direccion:"", telefono:""
});
const [citaprevia, setCitaprevia]= useState<Citasprevias>({
  _id:"", desde:new Date(), hasta:new Date(), motivo:"",paciente: paciente
});
    
    const [eventlist, seteventlist] =  useState<ievento[]>([
    ]);
    useEffect(()=>{
      if (citasprevias && citasprevias.length>0)
      {
        let auxeventos:ievento[]=[] ;
        citasprevias.map(ele=>{
          auxeventos.push({
            title:ele.motivo,
            //
            start: ele.desde ,
            end:   ele.hasta ,
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
    setcitav(true);
    FormaCita.setFieldsValue({
      id:resultado?._id ,
      motivo:resultado?.motivo ,
      paciente:resultado?.paciente._id,
      
      desde: moment(new Date(resultado?.desde!), "YYYY-MM-DD hh:mm:ss a"),
      hasta: moment(new Date(resultado?.hasta!), "YYYY-MM-DD hh:mm:ss a"),
    });
    setpaciente({
      _id:resultado?.paciente._id||"", alergia:"", email:"", fechanacimiento:new Date(),
      nacionalidad:"", nombre:"", otrosdatos:"", previsionsalud:"",rut:"",sexo:"",
      direccion:"", telefono:""
    });
    
    setCitaprevia(resultado! );
  }
  const onViewChange = (e:any)=>{
    setlastview(e);
    localStorage.setItem('lastView', e);
  }
  const agregarEvento= ()=>{

    setcitav(true);
    FormaCita.setFieldsValue({
      id:"",
      motivo:"",
      paciente:"",
      desde:moment(new Date() , "YYYY-MM-DD"),
      hasta:moment(new Date() , "YYYY-MM-DD"),
    })
      
      
  }
  const onFinishCita = async (values:{id:string, desde:Moment, hasta:Moment, motivo:string , paciente: string })=>{
    
    postcitaprevia({...values, _id: values.id, desde: new Date(values.desde.toDate().toISOString() ),
       hasta: new Date(values.hasta.toDate().toISOString() )  })
    .then(respuesta=>{
      seteventlist([...eventlist, {
        title:respuesta.motivo ,
        start: respuesta.desde,
        end: respuesta.hasta,
        bgcolor:"#fafafa",
        name:respuesta.paciente.nombre,
        id:respuesta._id
      }])
      if (values.id.length===0)
      {
        setCitasprevias([...citasprevias, respuesta ]);
      }
      else
      {
        setCitasprevias(citasprevias.map(ele=>{
          if (ele._id=== values.id)
            return {
              ...ele,
              motivo: values.motivo,
              desde: values.desde.toDate(),
              hasta: values.hasta.toDate() ,

             };
          else
            return ele;
        }) );
      }
      message.success("Se almacenó correctamente la cita previa");
      setcitav(false);
    })
  }
  const onFinishConsulta =async (values: {peso:string, estatura:string, temperatura:string, 
    presionalterial:string, imc:string, pulso:string, hemo:string, fecha:Moment, 
  anamnesis:string, diagnostico:string , tratamiento:string, medicamento:string, motivo:string,
  saturacion:string,
  fechaproximaatencion:Moment})=>
  {
    const citax = {
      _id: citaprevia.cita?citaprevia.cita!._id:"",
      peso: values.peso,
      estatura: values.estatura,
      temperatura: values.temperatura,
      presionalterial: values.presionalterial,
      imc: values.imc,
      pulso: values.pulso,
      hemo: values.hemo,
      fecha:  new Date(values.fecha.toDate().toISOString() ),
      anamnesis: values.anamnesis,
      diagnostico: values.diagnostico,
      tratamiento: values.tratamiento,
      medicamento: values.medicamento,
      motivo:values.motivo,
      saturacion: values.saturacion,
      fechaproximaatencion: new Date(values.fechaproximaatencion.toISOString() ),
    };
    let respuesta:Cita =  await postcita({...citax}, paciente._id );
    let respuestaConAdjunto:Cita = { ...respuesta };
    if (adjunto)
    {
      respuestaConAdjunto= await postFileCita(respuesta._id , adjunto! );
      message.success(`Consulta realizada en fecha ${respuestaConAdjunto.fecha.toString() } ahora tiene adjunto`)
    }
    const citap: Citaspreviasplanas={
      _id: FormaCita.getFieldValue("id") ,
      cita: respuestaConAdjunto._id ,
      desde:FormaCita.getFieldValue("desde").toDate() ,
      hasta: FormaCita.getFieldValue("hasta").toDate(),
      motivo:FormaCita.getFieldValue("motivo"),
      paciente: FormaCita.getFieldValue("paciente") ,
    } 
    //console.log(citap)
    await postcitaprevia(citap);
    message.success("Se almacenó correctamente la consulta");
    setcitav2(false);


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
    onClose={()=>{ setcitav(false); }}
    visible={citav}
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
        <Form.Item label="cita" name="idcita" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16,  }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} disabled={ !!(citaprevia.cita) } >
            Guardar cita
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16,  }}>
          <Button type="primary" htmlType="button"  icon={<SolutionOutlined />} onClick={()=>{
            
            setcitav2(true);
            if (citaprevia.cita)
            {
              FormaCitaf.setFieldsValue({
                fecha: moment(new Date(citaprevia.cita.fecha), "YYYY-MM-DD hh:mm:ss a"),
                fechaproximaatencion: moment(new Date(citaprevia.cita.fechaproximaatencion ), "YYYY-MM-DD hh:mm:ss a"),
                motivo: citaprevia.cita.motivo ,
                anamnesis: citaprevia.cita.anamnesis ,
                presionalterial: citaprevia.cita.presionalterial ,
                pulso:  citaprevia.cita.presionalterial,
                estatura: citaprevia.cita.estatura ,
                peso: citaprevia.cita.peso,
                imc: citaprevia.cita.imc ,
                temperatura: citaprevia.cita.temperatura,
                hemo: citaprevia.cita.hemo,
                medicamento: citaprevia.cita.medicamento ,
                diagnostico:citaprevia.cita.diagnostico,
                tratamiento: citaprevia.cita.tratamiento ,
                saturacion: citaprevia.cita.saturacion
              })
            }
            else
            {
              FormaCitaf.setFieldsValue({
                fecha: moment(new Date() , "YYYY-MM-DD"),
                fechaproximaatencion: moment(new Date() , "YYYY-MM-DD"),
                motivo:"",
                anamnesis:"",
                presionalterial:"",
                pulso:"",
                estatura:"",
                peso:"",
                imc:"",
                temperatura:"",
                hemo:"",
                medicamento:"",
                diagnostico:"",
                tratamiento:"",
                saturacion:""
              })
            }
          }} >
            {!citaprevia.cita ? "Generar consulta": "Mostrar consulta"}
          </Button>
        </Form.Item>
      </Form>
  </Drawer>
  <ConsultaComponente paciente={paciente} citaactual={ cita2  } 
        cita={citav2} setcita={ setcitav2 } FormaCita={ FormaCitaf } 
        onFinishCita={ onFinishConsulta } cambiarAdjuntoBefore={cambiarAdjuntoBefore}  />
  </>
  )
}