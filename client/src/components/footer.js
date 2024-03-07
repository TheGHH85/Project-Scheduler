// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-neutraldark text-lightgrey text-center text-xs p-3 fixed bottom-0 w-full border-t border-neutrallight">
     Powered by: Grey Hat Technologies  © {new Date().getFullYear()} 
    </footer>
  );
}

export default Footer;
