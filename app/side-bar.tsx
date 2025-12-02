"use client";

import Link from "next/link";

/**
 * @summary Opens the lateral navegation bar
 */
export function openNav() {
  document.getElementById("mySidenav")!.style.width = "250px";
}

/**
 * @summary Closes the lateral navegation bar
 */
function closeNav() {
  document.getElementById("mySidenav")!.style.width = "0";
}

/**
 * @summary Dinamically builds a lateral navigation bar with keywords passed as params
 * @param links - Array of keywords that the function will use to build the links
 * @returns HTML component
 */
export default function SideBar({links}: {links: string[]} ) {
  return (
    <div id="mySidenav" className="sidenav">
      {links.map((link)=> (
        <Link key={link} href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="sidenav-link">{link} <br/></Link>
      ))}

       <Link href="/log-out" className="absolute bottom-4 left-4 text-sm text-gray-400 hover:text-white">
        Cerrar sesión
      </Link>
      <span onClick={closeNav} className="closebtn">X</span>
    </div>
  )
}