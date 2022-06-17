import Icon from '@ant-design/icons';

import { Layout, Menu,  } from 'antd';
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';

import {
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  SettingFilled,
  BarcodeOutlined,
  ShoppingCartOutlined,
  MedicineBoxOutlined,
  HomeOutlined
} from '@ant-design/icons';


import {    ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { CategoriasPage } from '../pages/categoriasPage';
import { MovimientosPage } from '../pages/movimientosPage';
import { ProductosPage } from '../pages/productosPage';
import { ClientesPage } from '../pages/clientesPage';
import { AuthContext } from '../context/AuthContext';
import { PacientesPage } from '../pages/pacientesPage';
import { HomePage } from '../pages/homePage';
import { CalendarioPage } from '../pages/calendarioPage';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = (props: ReactNode ) => <Icon component={HeartSvg} style={{ color: 'hotpink' }}   />;

export const AppRouter=()=>{
  
  const mostrarIcono=(icono:string):ReactNode=>{
    switch (icono) {
      case "UserOutlined":
        return <UserOutlined/>    
      case "DollarOutlined":
        return <DollarOutlined/>
      case "BarcodeOutlined":
        return <BarcodeOutlined />
      case "ShoppingCartOutlined":
        return <ShoppingCartOutlined />
      case "MedicineBoxOutlined":
        return <MedicineBoxOutlined/>
      case "HomeOutlined":
        return <HomeOutlined/>
      default:
        return <TeamOutlined/>
    }
    
  }
  const { logout, auth } = useContext( AuthContext );
  useEffect(()=>{
    console.log(auth)
 }, [auth] )
    const salirApp=()=>{
      logout();
    }
    const [colapsado, setcolapsado] = useState(false);
    const onCollapse = (collapsed:SetStateAction<boolean>) => {
        setcolapsado(collapsed );
      };
    return (
        <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={colapsado} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
            auth.opciones?.map((elemento)=>{
              return (elemento.clave.split("_").length===1) &&
              <SubMenu key={elemento.clave} icon= { mostrarIcono(elemento.ruta) } title={elemento.titulo }>
                {
                  auth.opciones?.filter(elementod=>{
                    return elementod.clave.startsWith(elemento.clave+'_');
                  }).map(opcion=>{
                    if (opcion.clave.split("_").length===2) 
                    {
                      if (opcion.ruta.includes("/")) 
                      { 
                        return <Menu.Item key={opcion.clave}><Link to={opcion.ruta}>{opcion.titulo}</Link></Menu.Item>
                      }
                      else
                      { 
                        return <SubMenu key={opcion.clave} icon= { mostrarIcono(opcion.ruta) } title={opcion.titulo }>
                          {
                          auth.opciones?.filter(elementoe=>{
                            return elementoe.clave.startsWith(opcion.clave+'_');
                          })
                          .map(opcionx=>{
                            return <Menu.Item key={opcionx.clave}><Link to={opcionx.ruta}>{opcionx.titulo}</Link></Menu.Item>
                          })
                          }
                        </SubMenu>
                      }
                    }
                    return <h1>ok</h1>
                  })
                }
              </SubMenu>
              
            })
            }
            <SubMenu key="sub3" icon={<SettingFilled />} title="Configurar">
              <Menu.Item key="11" onClick={salirApp} icon={<HeartIcon   />} >Salir de la App </Menu.Item>
            </SubMenu>
          </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '16px 16px' }}>
                <Switch>
                    <Route exact path="/app/home" component={HomePage }/>
                    <Route exact path="/app/categorias" component={CategoriasPage }/>
                    <Route exact path="/app/productos" component={ProductosPage }/>
                    <Route exact path="/app/clientes" component={ClientesPage }/>
                    <Route exact path="/app/movimientos" component={MovimientosPage }/>
                    <Route exact path="/app/pacientes" component={PacientesPage }/>
                    <Route exact path="/app/calendario" component={CalendarioPage }/>
                    

                    <Redirect to ="/app/movimientos"/>
                </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Software Manta ©2018 Created by ManTalents</Footer>
          </Layout>
        </Layout>
        </Router>
    )
}