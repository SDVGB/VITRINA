import "./nosotros.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Dania from "../../assets/equipo/Dania Large.jpeg"
import Joan from"../../assets/equipo/Joan Large.jpeg"
import Loreto from"../../assets/equipo/Loreto Large.jpeg"
import Stefania from"../../assets/equipo/Stefania Large.jpeg"
import Valeria from"../../assets/equipo/Valeria Large.jpeg"




const Nosotros = ()=>{
    return(
        <section className="team section">
    <div className="container">
        <h1 className="section-title">Conoce a nuestro equipo</h1>
        <div className="row justify-content-center">
            <div className="col-md-4 col-sm-6 col-xs-12 p-2 ">
                <div className="team-item">
                    <figure>
                        <img  className="teamphoto" src={Dania} alt="Dania"/>
                        <figcaption>
                            <div className="info">
                                <h3>Dania Candia</h3>
                                <p>Minion </p>
                            </div>
                            <div className="social">
                                <a href="https://www.linkedin.com/in/dania-alisson-candia-fuentes-a7b0a4161/" className="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Daniaaliss" className="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                                
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 p-2 "  >
                <div className="team-item">
                    <figure>
                        <img className="teamphoto"src={Joan} alt="Joan"/>
                        <figcaption>
                            <div className="info">
                                <h3>Joan Rioseco</h3>
                                <p>Minion</p>
                            </div>
                            <div className="social">
                                <a href="https://www.linkedin.com/in/joan-rioseco-barrera-9b0681305/" className="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Grimmzx" className="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 p-2 ">
                <div className="team-item">
                    <figure>
                        <img className="teamphoto"src={Stefania} alt="Stefania"/>
                        <figcaption>
                            <div className="info">
                                <h3>Stefania Guzman</h3>
                                <p>Minion</p>
                            </div>
                            <div className="social">
                                <a href="https://www.linkedin.com/in/stefania-guzman/" className="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/SDVGB" className="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 p-2 ">
                <div className="team-item">
                    <figure>
                        <img  className="teamphoto" src={Loreto} alt="Lolo"/>
                        <figcaption>
                            <div className="info">
                                <h3>Loreto Godoy</h3>
                                <p>Minion</p>
                            </div>
                            <div className="social">
                                <a href="https://www.linkedin.com/in/loreto-godoy-carrasco-2a605428a/" className="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/LoloTamales" className="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 p-2 ">
                <div className="team-item">
                    <figure>
                        <img className="teamphoto" src={Valeria} alt="Vale"/>
                        <figcaption>
                            <div className="info">
                                <h3>Valeria Arredondo</h3>
                                <p>Minion</p>
                            </div>
                            <div className="social">
                                <a href="https://www.linkedin.com/in/valeria-arredondo-478744299/" className="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Myounnie" className="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}
export default Nosotros