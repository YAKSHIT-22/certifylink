import React from "react";
import FooterLinks from "./minorComponents/FooterLinks";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-2 border-t border-[#252525]">
      <nav className="w-full flex items-center justify-center sm:px-8 py-2 max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between flex-wrap p-2 gap-2">
          <FooterLinks text="Terms & Conditions" />
          <FooterLinks text="Copyright @ CertifyLink. All rights reserved." />
          <FooterLinks text="Privacy Policy" />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
