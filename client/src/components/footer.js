// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 text-center text-xs p-3 absolute bottom-0 w-full border-t">
     Powered by: Grey Hat Technologies  © {new Date().getFullYear()} 
    </footer>
  );
}

export default Footer;
