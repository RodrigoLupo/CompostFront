/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            target="_blank"
          >
            Invision
          </a>
          . Coded by{" "}
          <a
            target="_blank"
          >
            Ecompost
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
