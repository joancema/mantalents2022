import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

import { faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons'



import "../build/css/estilos.css";
import logo from '../img/MANTALENTS.png';
import ensa from '../img/logo_ensaladas.png';


import wave from '../img/wave (2).svg';
import wave2 from '../img/wave (3).svg';
import wave5 from '../img/wave (5).svg';

import wave1 from '../img/wave.svg';
import wavew from '../img/wavew.svg';

import paso1 from '../img/paso_1.png';
import paso2 from '../img/paso_2.png';
import paso3 from '../img/paso_3.png';

import tienda from '../img/store.png';
import sof from '../img/sof.png';
import sof1 from '../img/sof1.svg';
import capa from '../img/capa.png';

import t1 from '../img/testimonial1.jpeg';
import t2 from '../img/testimonial2.jpeg';
import t3 from '../img/testimonial3.jpeg';
import t4 from '../img/testimonial4.jpg';
import t5 from '../img/testimonial5.jpg';

import estre from '../img/estrellas.png';

import repartidor from '../img/repartidor.jpg';
import app from '../img/app.png';
import android from '../img/tienda-android.svg';
import apple from '../img/tienda-apple.svg';

import fac from '../img/fac.png';
import inve from '../img/inve.png';
import med from '../img/med.png';
import cel from '../img/cel.png';
import ti from '../img/ti.png';

import le from '../img/learning.webp';

import web from '../img/WEB.png';
import { Link } from 'react-router-dom';



export const inicio = () => {
  return (
    <>
     <body>
     <header className="header contenedor">
        <div className="header__logo">
            <img src={logo} alt="logo delivery app"/>
        </div>

        <nav className="navegacion">
        <Link to="/auth/login">
            <a href="#" className="navegacion__link">Iniciar Sesión</a>
            </Link>
            
            <a href="#" className="navegacion__link navegacion__link--registrar">Registrarse</a>
               
          
           
        </nav>
    </header>

    <section className="pasos">
       
        <img src={wavew} className="pasos__wave" alt="ola"/>

        <div className="pasos__contenido">
            <h2 className="pasos__heading">¿Qué estas buscando? </h2>
            <div className="pasos__grid contenedor">
                <div className="pasos__cuadro">
                    <img src={tienda} className="pasos__imagenp" alt="paso1"/>  
                    <p className="pasos__texto1">Tienda Virtual</p>
                </div>
                <div className="pasos__cuadro">
                    <img src={sof} className="pasos__imagen" alt="paso1"/>  
                    <p className="pasos__texto">Software</p>
                </div>
                <div className="pasos__cuadro">
                    <img src={capa} className="pasos__imagen" alt="paso1"/>  
                    <p className="pasos__texto">Capacitaciones</p>
                </div>


                
                </div>
        </div>
    </section>
 

    
    <main className="favoritos">
        <h2 className="favoritos__heading">Productos de Software disponibles</h2>

        <div className="favoritos__grid contenedor">
            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                        <img src={fac} alt="logo restaurant"/>

                    </div>

                    <div className="favorito__contenido">                        
                        <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Facturación Electrónica</h3>
                        <p className="favorito__descripcion"> Ahorre en talonarios mensuales que tienen poco tiempo de validéz, invierta en un paquete de facturación electrónica y adicionalmente contribuya el medio ambiente, paquetes desde $10.00 en adelante.</p>
                    </div>
                </div>
            </div> 

            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                    <img src={inve} alt="logo restaurant"/>

                    </div>

                    <div className="favorito__contenido">
                    <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Inventario y Facturación</h3>
                        <p className="favorito__descripcion">Controle su inventario de productos, cree y emita facturas electrónicas, registre sus ventas diarias y obtenga reportes de sus ganancias,lleve su negocio a otro nivel. Paquetes desde $200.00.</p>
                    </div>
                </div>
            </div> 

            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                    <img src={med} alt="logo restaurant"/>

                    </div>

                    <div className="favorito__contenido">
                        <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Sistema Médico</h3>
                        <p className="favorito__descripcion"> Sistema médico, completo y fácil de manejenar, registre sus consultas médicas, agendamiento de citas, página personalizda de su consultorio, impresion de recetas. Paquetes desde $500.00. </p>
                    </div>
                </div>
            </div> 

            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                        <img src={cel} alt="logo restaurant"/>
                    </div>

                    <div className="favorito__contenido">
                         <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Gestión de ordenes de reparaciones para celulares </h3>
                        <p className="favorito__descripcion">Seguimiento en tareas de reparaciones en centros dedicados a la reparación móvil. Paquetes desde $400.00.</p>
                    </div>
                </div>
            </div> 

            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                        <img src={ti} alt="logo restaurant"/>
                    </div>

                    <div className="favorito__contenido">
                        <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Tienda Virtual</h3>
                        <p className="favorito__descripcion"> Actualice su tienda y apueste a las nuevas modalidades de venta, en la actualidad no existen fronteras geográficas ni tecnológicas para hacer llegar un producto/servicio a la pupila de su público objetivo, ofrezca, promocione y venda por internet, paquetes desde $300.00.</p>
                    </div>
                </div>
            </div> 

            <div className="favorito">
                <div className="favorito__grid">
                    <div className="favorito__imagen">
                        <img src={web} alt="logo restaurant"/>
                    </div>

                    <div className="favorito__contenido">
                        <img src={estre} alt="calificacion restaurant"/>

                        <h3 className="favorito__nombre">Software a medida</h3>
                        <p className="favorito__descripcion"> Tiene una idea?. Nosotros la hacemos realidad, cuentenos los requerimientos y necesidades de su modelo negocio y nuestra empresa desarrollará un software a medida que encaje en sus necesidades y objetivos. </p>
                    </div>
                </div>
            </div> 

            </div>
    </main>

    <section className="repartidores">
        <h2 className="repartidores__heading">Capacitaciones</h2>

        <div className="repartidores__grid contenedor">
            <div className="repartidores__imagen">
               
                <img src={le} alt="imagen repartidor"/>

            </div>

            <div className="repartidores__contenido">
                <p className="repartidores__texto">Nunca pare de aprender, emprender en un nuevo campo de aprendizaje no solo nos permite incrementar nuestro conocimiento, nos convierte en personas preparadas y seguras capaces de desempeñarnos en cualquier area.</p>
                <p className="repartidores__texto"> Mantalents es una empresa dedicada no solo al desarrollo de software, sino tambien ofrecemos capacitaciones en los siguientes campos:</p>
                <li className="repartidores__texto"> Inglés para niños</li> 
                <li className="repartidores__texto"> Clases de Piano</li> 
                <li className="repartidores__texto1"> Principios de programación</li>
                <a href="#" className="repartidores__enlace">Más Información</a>
            </div>
        </div>
    </section>

    <section className="descargar">
        <div className="descargar__grid contenedor">
            <div className="descargar__imagen">
                <img src={app} alt="imagen app"/>
            </div>

            <div className="tiendas">
                <h3 className="tiendas__heading">Desarrollamos</h3>
                <p className="tiendas__texto">Aplicaciones disponibles para Android y iOS</p>

                <div className="tiendas__grid">
                    <a href="#" className="tiendas__enlace">                        
                        <img src={apple} alt="tienda apple"/>
                    </a>
                    <a href="#" className="tiendas__enlace">
                        <img src={android} alt="tienda android"/>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section className="contenedor testimoniales">
        <h2 className="testimoniales__heading">Testimoniales</h2>

        <div className="testimoniales__grid">
            <div className="testimonial">
                <header className="testimonial__header">
                    <div className="testimonial__imagen">
                        <img src={t1} alt="testi1"/>
                    </div>

                    <div className="testimonial__informacion">
                        <p className="testimonial__autor">Yorleny Briones, Smartphoneservice</p>
                        <img  className="testimonial__calificacion" src={estre} alt="estre"/>
                    </div>
                </header>

                <blockquote className="testimonial__texto">
                Una excelente aplicación, le comentamos a los desarrolladores la aplicación que buscabamos para registrar las ordenes de reparación y ellos se encargaron de realizarlo, estamos muy contentos, ahora llevamos un registro organizado. 
                </blockquote>
            </div> 

            <div className="testimonial">
                <header className="testimonial__header">
                    <div className="testimonial__imagen">
                       
                        <img src={t5} alt="testi5"/>
                    </div>

                    <div className="testimonial__informacion">
                        <p className="testimonial__autor">Wendy Solórzano</p>
                        <img  className="testimonial__calificacion" src={estre} alt="estre"/>
                    </div>
                </header>

                <blockquote className="testimonial__texto">
                    Mi tienda en linea funciona de maravilla.
                </blockquote>
            </div> 

            <div className="testimonial">
                <header className="testimonial__header">
                    <div className="testimonial__imagen">
                    <img src={t4} alt="testi4"/>
                    </div>

                    <div className="testimonial__informacion">
                        <p className="testimonial__autor">Dr. Jeovanny Santana</p>
                        <img  className="testimonial__calificacion" src={estre} alt="estre"/>
                    </div>
                </header>

                <blockquote className="testimonial__texto">
                Solicité al grupo de desarrollo una aplicación a medida para mi consultorio, estoy muy contento con la versión obtenida.
                </blockquote>
            </div> 

            <div className="testimonial">
                <header className="testimonial__header">
                    <div className="testimonial__imagen">
                    <img src={t2} alt="testi2"/>
                    </div>

                    <div className="testimonial__informacion">
                        <p className="testimonial__autor">John Miguel Cevallos</p>
                        <img  className="testimonial__calificacion" src={estre} alt="estre"/>
                    </div>
                </header>

                <blockquote className="testimonial__texto">
                    He estudiado con la Teacher Wendy por 3 años, me gusta su forma de enseñar, al momento entiendo y puedo desarrollar conversaciones intermedias, estoy muy contento he ganado concursos de spelling en la escuela.
                </blockquote>
            </div> 

            <div className="testimonial">
                <header className="testimonial__header">
                    <div className="testimonial__imagen">
                    <img src={t3} alt="testi3"/>
 
                    </div>

                    <div className="testimonial__informacion">
                        <p className="testimonial__autor">Emily Cevallos</p>
                        <img  className="testimonial__calificacion" src={estre} alt="estre"/>
                    </div>
                </header>

                <blockquote className="testimonial__texto">
                    Estudie piano, en Mantalents, aprendí una canción muy bonita en piano.
                </blockquote>
            </div>
        </div>
    </section>



    <footer className="footer">
        <div className="footer__grid contenedor">
            <div className="footer__widget">
                <h3 className="footer__heading">Nosotros</h3>
                <p className="footer__texto"> Somos una empresa dedicada al desarrollo de software comerciales y a medida, realizamos aplicaciones con las tecnologías más estables, escalables y actuales, adicionalmente nos dedicamos a la capacitación no solo de áreas técnicas, sino también en el área de idiomas y habilidades artísticas.</p>
            </div>

            <div className="footer__widget">
                <h3 className="footer__heading">Navegación</h3>
                <nav className="footer__nav">
                    <a href="#" className="footer__link">Mantalents</a>
                    <a href="#" className="footer__link">Capacítese en Mantalens</a>
                    <a href="#" className="footer__link"> Quienes somos?</a>
                    <a href="#" className="footer__link">Contáctenos</a>
                    
                </nav>
            </div>

            <div className="footer__widget">
                <h3 className="footer__heading">Síganos en:</h3>
                
                
                <div>
                
                 <a href="https://acortar.link/xF1Vf5" className="footer__social"><FontAwesomeIcon icon ={faFacebook}/></a>
                 <a href="https://www.instagram.com/mantalents.ec/"className="footer__social"><FontAwesomeIcon icon ={faInstagram}/></a>
                 
                </div>

                <h3 className="footer__heading"> Contactos :</h3>

               
                
                <div className="footer_heading">
                <p className="footer__information1" > <FontAwesomeIcon icon={faMobileScreen} /> +593 984851783  </p> 
                <p className="footer__information"> <FontAwesomeIcon icon={faPhone} /> +593 984851783  </p> 
                </div>

            </div>
        </div>

        <p className="footer__copyright">
              © Mantalents 2022. Todos los derechos Reservados
        </p>
    </footer>


    


    </body>
    </>
  )
}
