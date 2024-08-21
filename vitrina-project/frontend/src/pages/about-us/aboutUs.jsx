import { Fragment } from "react"
import "./aboutus.css"
import Nosotros from "../../components/nosotros/nosotros"

const AboutUs = () => {
    return (
        <Fragment>
            <div id="cajaPrincipal">
                <section className="layout row">
                    <div className="sidebar col-md-12 col-lg-7">
                        <div>
                        <h1>Quienes somos</h1>
                        <h2>Vitrina, Un lugar para ser transparentes</h2>
                        <p className="parrafito">Vitrina, es un proyecto creado por el grupo homónimo del programa javascript de Generation, centrados en generar un espacio de apoyo a la comunidad mediante una plataforma que incite a la reutilizacion de prendas de vestir, para combatir la contaminacion causada por el exceso de ropa en basurales.</p>

                        </div>
                        <div className="cajas row justify-content-center">
                            <div className="Minicaja col-sm-12 col-md-6 row align-items-center">
                                <div className="text-sm-center col-sm-12 col-md-3">
                                    <img src="https://img.icons8.com/?size=100&id=79030&format=png&color=1A1A1A" alt="iconoDinero" />
                                </div>
                                <div className="minicaja-text col-sm-12 col-md-8">
                                    <p>Sin costo</p>
                                    <p>Para ser parte de esta comunidad no es necesario pagar. Nuestro pago es el ayudar a la ropa a tener una nueva vida</p>
                                </div>
                            </div>
                            <div className="Minicaja col-sm-12 col-md-6 row align-items-center">
                                <div className="text-sm-center col-sm-12 col-md-4">
                                    <img src="https://img.icons8.com/?size=100&id=11253&format=png&color=1A1A1A" alt="iconoActualizar" />
                                </div>
                                <div className="minicaja-text col-sm-12 col-md-8">
                                    <p>Actualizaciones semanales</p>
                                    <p>Además de las publicaciones en nuestra pagina de venta y donaciones, nos comprometemos con publicaciones semanales  de noticias, ideas para reutilizar la ropa, y más.  </p>
                                </div>
                            </div>

                        </div>
                        

                    </div>
                    <div className="body col-md-12 col-lg-5">
                        <div className="bolsareciclable">
                            <img src="https://media.istockphoto.com/id/1307052468/es/foto/armario-de-segunda-mano-moda-circular-alquiler-intercambiar-idea-de-ropa.jpg?s=612x612&w=0&k=20&c=Cpl54deQw5RWd2MYwe1aQ63cnka35sm_Is2Ui6Huw4o=" alt="bolsaReutilizable" />
                            <div className="fondosusc">
                            <p>Suscribete para más noticias</p>
                            <h4>¿Nuevo en la página?</h4>
                            <h6>Suscribete para recibir un newsletter semanal con las noticias más destacadas</h6>
                        </div>
                        </div>
                        


                    </div>
                </section>

            </div>
            <Nosotros/>
        </Fragment>
    )
}

export default AboutUs