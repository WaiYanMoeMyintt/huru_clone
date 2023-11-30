import React from "react";
import "./css/footer.css";
import { logos, banner, download } from "../data";
import { Link } from "react-router-dom";
import { Tooltip } from 'flowbite-react';
const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="footer_list">
      <div className="footer_header relative">
        <div className="logo">
          <Link to="/">huru</Link>
        </div>
        <div className="icons">
          {logos.map((items,index) => (
            <Tooltip key={index} content = {`${items.title}`} label={items.title}>
              <img className="cursor-pointer" src={items.name} alt={items.title} width={20} height={20} />
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="footer_banner">
        {banner.map((items) => (
          <div className="footer_control" key={items.id}>
            <h2 className="footer_header text_uppercase">{items.header}</h2>
            {items.name.map((title) => (
              <p className="footer_links" key={title.id}>
                {title.title}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="footer_app_content">
        <div className="footer_app_control">
          {download.map((items,index) => (
            <div className="footer_app" key={index}>
              <img src={items.name} alt="" />
            </div>
          ))}
        </div>
        <div className="footer_description">
          <p className="copyright_title">Copyright © ${currentYear}huru, Inc.</p>
          <p>
            Huru is a registered trademark of huru, Inc. All rights reserved.
          </p>
          <p>Made with 🖤 in Myanmar.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;