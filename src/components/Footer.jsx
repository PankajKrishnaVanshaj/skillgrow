import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center px-6">
        <p>
          &copy; {new Date().getFullYear()} PK SkillGrow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
