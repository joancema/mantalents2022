import { Table, Drawer, Button, Form, Input, message, Row, Col, Divider,
   DatePicker, Upload, Image, InputNumber } from "antd";
   import { SaveOutlined, PlusOutlined, EditOutlined, UploadOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
   import { tableColumnTextFilterConfig } from "../helpers/tableUtils";
   import { Paciente, Cita } from "../interfaces/fetchPacientes";
   import { usePaciente } from "../hooks/usePaciente";
   import { useState } from "react";
   import moment, { Moment } from "moment";

   import { Document, Page } from 'react-pdf';
   import { pdfjs } from 'react-pdf';

   import { fetchDescargar, fetchPacienteCita, getFilePaciente, postcita, postFileCita, postFilePaciente, postpaciente } from "../helpers/servicePacientes";
   import { ConsultaComponente } from "../components/consulta";

   const { TextArea } = Input;

export const PacientesPage= ( )=>{
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  function onDocumentLoadSuccess() {
    
  }
  const devolverEdad=(parametro:Moment|null )=>{
    const fechaActual= new Date();
    let edadActual= (fechaActual.getFullYear()- (parametro?.year()??0)   )
    Forma.setFieldsValue({
      edad: edadActual
    })
  }
  const cambiarFotoBefore=( archivo: File )=>{
    setarchivo(archivo);
  }
  const cambiarAdjuntoBefore = (adjunto: File)=>{
    setadjunto(adjunto);
  }
  const crearPaciente=()=>{
      setarchivo(undefined);
      Forma.resetFields();
      setformulario(true);
      setpaciente({_id:"", rut:"",nombre:"", direccion:"", telefono:""
     , alergia:"", citas:[], fechanacimiento: new Date(), sexo:"", nacionalidad:""
    , email:"", previsionsalud:"", otrosdatos:"", estadocivil:"" });
    setCitas([]);
      Forma.setFieldsValue({
        rut:"",
        nombre: "",
        direccion:"",
        telefono:"",
        alergia:"",
        citas:[],
        fechanacimiento: moment(new Date() , "YYYY-MM-DD"),
        sexo:"",
        nacionalidad:"",
        email:"",
        previsionsalud:"",
        otrosdatos:"",
        estadocivil:"",
      })
  }
  const crearCita=()=>{
      setadjunto(undefined);
      FormaCita.resetFields();
      setidcita("");
      setcita(true);
      setcitaactual({
        _id:"", anamnesis:"", diagnostico:"", estatura:"", fechaproximaatencion:new Date(),
        imc:"", medicamento:"", peso:'', presionalterial:'',pulso:'',temperatura:'', tratamiento:"",
        fecha:new Date(), hemo:"", img:undefined, motivo:"", saturacion:""
      });
      FormaCita.setFieldsValue({
        estatura:"",
        peso: "",
        temperatura: "",
        presionalterial: "",
        imc: "",
        pulso: "",
        hemo: "",
        fecha: moment(new Date() , "YYYY-MM-DD"),
        anamnesis: "",
        diagnostico: "",
        tratamiento: "",
        medicamento: "",
        fechaproximaatencion: moment(new Date() , "YYYY-MM-DD"),
      });
      

  }
    const [Forma] = Form.useForm();
    const [FormaCita] = Form.useForm();
    const { pacientes, setPacientes, isLoading, citas, setCitas } = usePaciente();
    const [archivo, setarchivo] = useState<File>();
    const [adjunto, setadjunto] = useState<File>();
    
      const [paciente, setpaciente] = useState<Paciente>({_id:'', nombre:'', rut:'',direccion:'', telefono:''
      , citas:[], fechanacimiento: new Date(), alergia:'', sexo:'', email:'', nacionalidad:'', previsionsalud:'', otrosdatos:'', estadocivil:''  });
      const [citaactual, setcitaactual]= useState<Cita>({
        _id:"", anamnesis:"", diagnostico:"", estatura:"", fechaproximaatencion:new Date(),
        imc:"", medicamento:"", peso:'', presionalterial:'',pulso:'',temperatura:'', tratamiento:"",
        fecha:new Date(), hemo:"", motivo:"", saturacion:""
      });
      const [formulario, setformulario] = useState(false);
      const [cita, setcita] = useState(false);
      const [visor, setvisor] = useState(false);
      const [idcita, setidcita]= useState<string>("");
      const [reportepdf, setreportepdf]= useState<string>("http://localhost/uploads/consultas/61ad47a7684b9b03d15a1a2d.pdf");
    const onFinishCita = async (values: {peso:string, estatura:string, temperatura:string, 
      presionalterial:string, imc:string, pulso:string, hemo:string, fecha:Moment, 
    anamnesis:string, diagnostico:string , tratamiento:string, medicamento:string, motivo:string,
    saturacion:string,
    fechaproximaatencion:Moment}) => {
      const citax = {
        _id: idcita,
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
          message.success(`Cita realizada en fecha ${respuestaConAdjunto.fecha.toString() } ahora tiene adjunto`)
        }
          if (idcita.length>0)
          {
            setPacientes( pacientes.map(ele =>{ 
              if (ele._id===paciente._id)
              return {
                ...ele, citas: ele.citas?.map(eled=>
                  {
                    if (eled._id===idcita) { return  {...eled, anamnesis: citax.anamnesis, fecha: citax.fecha  }} else { return eled;}
                  })
              } ;
              else
              return ele;
            }) );
            setCitas(citas.map(ele=>{ if (ele._id=== idcita) 
              return {...ele, anamnesis: citax.anamnesis, fecha: citax.fecha 
                , medicamento: values.medicamento, peso: values.peso,
                presionalterial: values.presionalterial, estatura: values.estatura
                , temperatura: values.temperatura, imc: values.imc, pulso: values.pulso
                ,hemo: values.hemo,  fechaproximaatencion: new Date(values.fechaproximaatencion.toISOString().substr(0,10) ) 
              , img: respuestaConAdjunto.img  }; else return ele; }));
          }
          else
          {
            setPacientes( pacientes.map(ele =>{ 
              if (ele._id===paciente._id)
              return {
                ...ele, citas: [...ele.citas!, respuesta ]
              } ;
              else
              return ele;
            }) );
            setCitas([ ...citas, respuestaConAdjunto  ]);
          }
          message.success("Se almacenó correctamente la cita");
          setcita(false);
      }
    const onFinish= async (values:{ rut:string, nombre:string, direccion:string, 
        telefono:string, alergia:string, sexo:string, email:string,
      previsionsalud:string, otrosdatos:string, fechanacimiento:Moment, nacionalidad:string, estadocivil:string })=>{
        const pacientex = {
          _id: paciente._id,
          rut: values.rut,
          nombre: values.nombre,
          direccion:values.direccion,
          telefono: values.telefono,
          fechanacimiento: new Date(values.fechanacimiento.toISOString().substr(0,10) ),
          previsionsalud: values.previsionsalud,
          otrosdatos: values.otrosdatos,
          alergia:values.alergia,
          sexo: values.sexo,
          email: values.email,
          nacionalidad: values.nacionalidad,
          estadocivil: values.estadocivil,
        };
        setpaciente(pacientex);
        let respuesta:Paciente = await  postpaciente(pacientex);
        let respuestaConFoto:Paciente = { ...respuesta };
        if (archivo)
        {
          respuestaConFoto= await postFilePaciente(respuesta._id , archivo! );
          message.success(` ${respuestaConFoto.nombre} ahora tiene nueva foto`)
        }
        if (pacientex._id.length>0)
        {
          setPacientes( pacientes.map(ele=>{ if (ele._id===pacientex._id)
            return {
              ...ele, nombre: values.nombre, direccion: values.direccion,
              telefono: values.telefono, otrosdatos:values.otrosdatos,
              alergia: values.alergia, rut: values.rut
              , fechanacimiento: new Date(values.fechanacimiento.toISOString().substr(0,10) ) ,
              previsionsalud: values.previsionsalud, sexo: values.sexo,
              nacionalidad: values.nacionalidad, email: values.email, estadocivil: values.estadocivil,
              img: respuestaConFoto.img,
            } ; else return ele;}) )
        }
        else
        {
          setPacientes([...pacientes, {...respuestaConFoto  }])
        }
        message.success("Se almacenó correctamente el paciente");
        setformulario(false);
      }

    const columnsc=[
      {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
        width: "10%",
        render: (valor: any) =>  (typeof(valor)==="string")?valor.substr(0,16).replace("T"," ") : moment(valor).format("YYYY-MM-DD hh:mm")  ,
      },
      {
        title: 'Usuario doctor',
        dataIndex: ['usuario','nombre'],
        key: 'usuario',
        width: '10%',
      },
      {
        title: 'Anamnesis',
        dataIndex: 'anamnesis',
        key: 'anamnesis',
        width: '50%',
      },
      {
        title: 'Acciones',
        key: 'acciones',
        width: "10%" ,
        fixed:'right' as 'right',
        render: ( record: Cita) => 
        <><Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
        { ()=>
          { 
              setadjunto(undefined);
              FormaCita.resetFields();
              setidcita(record._id);
              setcitaactual(record);
              setcita(true);
              FormaCita.setFieldsValue({
              estatura:record.estatura,
              peso: record.peso,
              temperatura: record.temperatura,
              presionalterial: record.presionalterial,
              imc: record.imc,
              pulso: record.pulso,
              hemo: record.hemo,
              fecha: moment(new Date(record.fecha), "YYYY-MM-DD hh:mm:ss a"),
              anamnesis: record.anamnesis,
              diagnostico: record.diagnostico,
              tratamiento: record.tratamiento,
              medicamento: record.medicamento,
              saturacion: record.saturacion,
              motivo: record.motivo,
              fechaproximaatencion: moment(new Date(record.fechaproximaatencion), "YYYY-MM-DD hh:mm:ss a"),
            });
          } 
        }/>
        <Button type="primary" shape="circle" icon={ <DownloadOutlined /> } onClick={()=>{
          fetchPacienteCita(record._id).then(respuesta=>{
            //window.open(`http://localhost/uploads/consultas/${record._id}.pdf`,'_blank');
            fetchDescargar(record._id)
          })
        }}/>
        
        <Button type="primary" shape="circle" icon={ <EyeOutlined /> } onClick={()=>{
          fetchPacienteCita(record._id).then(respuesta=>{
            setreportepdf(`http://localhost/uploads/consultas/${record._id}.pdf`);
            setvisor(true);            
          })
        }}/>

        </>,
      },

    ]
    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          width: "20%",
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Paciente>(),
          onFilter: (value: {}, record: Paciente  ):boolean => {
            return record.nombre.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Paciente, b:Paciente) => a.nombre.length - b.nombre.length,
        },
        {
          title: 'Nro. Identificación',
          dataIndex: 'rut',
          key: 'rut',
          width: "20%",
          render: (text: string) => text,
          ...tableColumnTextFilterConfig<Paciente>(),
          onFilter: (value: {}, record: Paciente  ):boolean => {
            return record.rut.toLowerCase().includes(value.toString().toLowerCase())
          },
          sorter: (a:Paciente, b:Paciente) => a.rut.length - b.rut.length,
        },
        {
          title: 'Usuario',
          dataIndex: ['usuario','nombre'],
          key: 'usuario',
          width: '10%',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          width:"10%",
          fixed:'right' as 'right',
          render: ( record: Paciente) => <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick=
          { ()=>
          
            { 
              console.log(record.fechanacimiento);
              setformulario(true); 
              setpaciente(record);
              setarchivo(undefined);
              Forma.resetFields();
              setCitas(record.citas!);
              Forma.setFieldsValue({
                rut: record.rut,
                nombre: record.nombre,
                direccion: record.direccion,
                telefono: record.telefono,
                email: record.email,
                sexo: record.sexo,
                nacionalidad: record.nacionalidad,
                alergia: record.alergia,
                previsionsalud: record.previsionsalud,
                otrosdatos: record.otrosdatos,
                fechanacimiento: moment(new Date(record.fechanacimiento), "YYYY-MM-DD"),
                edad: moment(new Date()).year() - moment(new Date(record.fechanacimiento), "YYYY-MM-DD").year() ,
                estadocivil:record.estadocivil
              })
              
              
            } 
          }/>,
        },
      ];
    return (
        <>
        <Row gutter={12} >
          <Col span={12} offset={12}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} onClick={crearPaciente} />
          </Col>
        </Row>
        <Divider orientation="left">Pacientes</Divider>
        <Row gutter= {[16, 24]}>
        <Table tableLayout='fixed'
           loading= {isLoading}
           rowKey='_id'
           pagination={{ defaultPageSize: 5, showSizeChanger: true,
           pageSizeOptions: ['5','10', '20', '30']}} 
           scroll={{ x: 1300 }}
           dataSource={pacientes} columns={columns} />
        </Row>
        <Drawer
          title="Datos del Paciente"
          width={720}
          height={650}
          onClose={()=>{ setformulario(false); }}
          visible={formulario}
          bodyStyle={{ paddingBottom: 60 }}
          placement="bottom"
        >
          <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
          <Form
              form= {Forma}
              name="formpaciente"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              size={"small"}
              initialValues={{ remember: true }}
              onFinish={ onFinish }
              onFinishFailed={()=>{}}
              autoComplete="off">
                <Form.Item label="Foto" name="foto">
                    <Upload
                      listType="picture"
                      maxCount={1}
                      showUploadList={true}
                      beforeUpload= {cambiarFotoBefore}
                      >
                      <Button icon={<UploadOutlined />}>Subir (Max: 1)</Button>
                    </Upload>
                  </Form.Item>
                  {
                    paciente.img && 
                    <Form.Item>
                      <Image
                        width={200}
                        src={  getFilePaciente(paciente.img)  }
                      />
                    </Form.Item>
                    }
              <Form.Item  style={{ marginBottom: 0 }}  label="Nro. Identificación">
                <Form.Item
                  name="rut"
                  rules={[{ required: true, message: 'Por favor ingrese el RUT' }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                  >
                  <Input style={{width:"80%", display:"inline-block" }} placeholder="RUT:(Ej. 12345678-9)" />
                </Form.Item>
                <span
                  style={{ display: 'inline-block', width: '200px', lineHeight: '32px', textAlign: 'left' }}
                >
                  (DNI, RUN, RUT, CI, PAS, etc.)
                </span>
              </Form.Item>
                <Form.Item
                  label="Nombre Completo"
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese el Nombre' }]}>
                  <Input style={{ width:"70%", textTransform: 'uppercase' }} placeholder="ESCRIBIR APELLIDOS LUEGO NOMBRES" />
                </Form.Item>
                <Form.Item label="Fecha de Nacimiento"
                 name="fechanacimiento"
                 rules={[{ required: true, message: 'Por favor ingrese fecha de nacimiento' }]}>
                  <DatePicker onChange={ devolverEdad } />
                </Form.Item>
                <Form.Item label="Edad" name="edad">
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="Sexo"
                  name="sexo"
                  rules={[{ required: true, message: 'Por favor ingrese el sexo del paciente' }]}>
                  <Input style={{width:"10%", textTransform: 'capitalize'}} />
                </Form.Item>
                <Form.Item
                  label="Estado Civil"
                  name="estadocivil">
                  <Input style={{width:"20%", textTransform:"capitalize"}} />
                </Form.Item>
                <Form.Item
                  label="Provisión de Salud"
                  name="previsionsalud">
                  <TextArea style={{width:"80%", textTransform: 'uppercase'}} />
                </Form.Item>
                <Form.Item
                  label="e-mail"
                  name="email"
                  rules={
                    [
                      { required: true, message: 'Por favor ingrese el correo electrónico' },
                      { type: 'email', message:'Debe ser un correo electrónico válido'}
                      ]}>
                  <Input style={{width:"40%"}} />
                </Form.Item>
                <Form.Item
                  label="Dirección"
                  name="direccion"
                  rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}>
                  <TextArea style={{width:"80%"}} />
                </Form.Item>
                <Form.Item
                  label="Teléfono"
                  name="telefono"
                  rules={[{ required: true, message: 'Por favor ingrese teléfono' }]}>
                  <TextArea style={{width:"50%"}} />
                </Form.Item>
                <Form.Item
                  label="Nacionalidad"
                  name="nacionalidad">
                  <Input style={{width:"50%", textTransform:'capitalize'}}  />
                </Form.Item>
                <Form.Item
                  label="Alergia"
                  name="alergia">
                  <TextArea style={{width:"80%", textTransform: 'uppercase', color:"red"  }} />
                </Form.Item>
                
                <Form.Item
                  label="Otros Datos"
                  name="otrosdatos">
                  <TextArea style={{width:"80%", textTransform: 'uppercase'}} />
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Guardar
                  </Button>
                </Form.Item>
          </Form>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <Row gutter={12} >
            <Col span={12} offset={12}>
              <Button type="primary" shape="circle" disabled={paciente._id.length===0} icon={<PlusOutlined />} size={'large'} onClick={crearCita} />
            </Col>
          </Row>
          <Divider orientation="left">Consultas</Divider>
          <Row gutter= {[16, 24]}>
          <Table tableLayout='fixed'
          size="small"
           loading= {isLoading}
           rowKey='_id'
           pagination={{ defaultPageSize: 5, showSizeChanger: true,
           pageSizeOptions: ['5','10', '20', '30']}} 
           scroll={{ x: 1300 }}
           dataSource={citas} columns={columnsc} />
           </Row>
          </Col>
          </Row>
        </Drawer>
        <ConsultaComponente paciente={paciente} citaactual={ citaactual  } 
        cita={cita} setcita={ setcita } FormaCita={ FormaCita } 
        onFinishCita={ onFinishCita } cambiarAdjuntoBefore={cambiarAdjuntoBefore}  />
        <Drawer
          title="Reporte"
          width={720}
          height={650}
          onClose={()=>{ setvisor(false); }}
          visible={visor}
          bodyStyle={{ paddingBottom: 60 }}
          placement="bottom">
            <Document
            file={reportepdf}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
            </Document>
        </Drawer>
        
        </>
    )
}


