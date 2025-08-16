"use client";

import Link from "next/link";

export function openNav() {
  document.getElementById("mySidenav")!.style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav")!.style.width = "0";
}

export default function SideBar({links}: {links: string[]} ) {
  return (
    <div id="mySidenav" className="sidenav">
      {links.map((link)=> (
        <Link key={link} href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="sidenav-link">{link} <br/></Link>
      ))}
      <span onClick={closeNav} className="closebtn">X</span>
    </div>
  )
}