import React from "react";
import { CardFooter } from "react-bootstrap";

const FooterMenu = () => {
  return (
    <>
      <section >
        <footer className="footer bg-body-secondary" style={{marginTop:'20px'}}>
          <div className="text-center " >
            © 2024 Copyright
            <a  > Sistema Facturacion</a>
          </div>
        </footer>
      </section>
    </>
  );
}

export default FooterMenu;
