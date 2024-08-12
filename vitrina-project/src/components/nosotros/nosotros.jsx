import "./nosotros.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


const Nosotros = ()=>{
    return(
        <section class="team section">
    <div class="container">
        <h1 class="section-title">Conoce a nuestro equipo</h1>
        <div class="row justify-content-center">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="team-item">
                    <figure>
                        <img src="https://media.licdn.com/dms/image/D4D03AQELXiM9eUkuew/profile-displayphoto-shrink_800_800/0/1720714610670?e=1728518400&v=beta&t=BFz9yAA_Q5YiU6E8xP3hUxrvJsKw09gPbsxTdc5q77A" alt="Dania"/>
                        <figcaption>
                            <div class="info">
                                <h3>Dania Candia</h3>
                                <p>Minion </p>
                            </div>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/dania-alisson-candia-fuentes-a7b0a4161/" class="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Daniaaliss" class="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                                
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="team-item">
                    <figure>
                        <img src="https://media.licdn.com/dms/image/D4E35AQGbsweYZooJmg/profile-framedphoto-shrink_800_800/0/1721311922019?e=1723762800&v=beta&t=3TuPa7c9szT0x1feEMKXTpLE2m-ymmENFSHGqqMYXzA" alt="Joan"/>
                        <figcaption>
                            <div class="info">
                                <h3>Joan Rioseco</h3>
                                <p>Minion</p>
                            </div>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/joan-rioseco-barrera-9b0681305/" class="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Grimmzx" class="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="team-item">
                    <figure>
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQG1dLd4Zy5-8g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1701999326436?e=1728518400&v=beta&t=PCKnZMC2yunfU8Q53Z2cuM0W0Ns_Mi4ax06Tb7CbyPU" alt="Stefania"/>
                        <figcaption>
                            <div class="info">
                                <h3>Stefania</h3>
                                <p>Minion</p>
                            </div>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/stefania-guzman/" class="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/SDVGB" class="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="team-item">
                    <figure>
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQF2M2lDjHyWLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1693797197679?e=1728518400&v=beta&t=e2Fn3qGkqvn_ytDxJ68jonNzD91ui_9o6CgeJIewVpI" alt="Lolo"/>
                        <figcaption>
                            <div class="info">
                                <h3>Loreto Godoy</h3>
                                <p>Minion</p>
                            </div>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/loreto-godoy-carrasco-2a605428a/" class="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/LoloTamales" class="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="team-item">
                    <figure>
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQFEX75y0hVpNg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720709357021?e=1728518400&v=beta&t=pqEm1kwVmkQGmIQt0yXrII8erBhI5pvqc-nW7TllcoQ" alt="Vale"/>
                        <figcaption>
                            <div class="info">
                                <h3>Valeria Arredondo</h3>
                                <p>Minion</p>
                            </div>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/valeria-arredondo-478744299/" class="LinkedIn" data-abc="true"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://github.com/Myounnie" class="Github" data-abc="true"><FontAwesomeIcon icon={faGithub} /></a>
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