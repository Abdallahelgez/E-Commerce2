import 'animate.css';
import React from 'react'
function Footer() {
  return (
    <>
    <footer className="text-center text-white position-relative start-0 bottom-0 d-block m-auto w-100" >
        <div className="container pt-4">
            <section className='mb-4' >
            <a className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.facebook.com/apdallah.elgez/"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://twitter.com/Apdallahelgez?fbclid=IwAR1AVAXfSJm4Wr9Q-sy_5ds45fNhG8fTskLi_eRaC1janlfHA4jTlVBfbLc"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-x-twitter"></i>
            </a>
          
            <a className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.instagram.com/abdallah.elgez/?hl=bg"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-instagram"></i>
            </a>

            <a className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://eg.linkedin.com/in/abdallah-elgez-8b0178235?trk=people-guest_people_search-card"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-linkedin"></i>
            </a>
            <a className="btn btn-link  btn-floating btn-lg text-dark m-1  "
              href="https://github.com/Abdallahelgez"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-github   "></i>
            </a>

            </section>
        </div>
        <div className="text-center text-dark p-3" >
              © 2023 Copyright : Abdallah Elgez
            
        </div>
    </footer>
    
    
    </>
  )
}
export default Footer
