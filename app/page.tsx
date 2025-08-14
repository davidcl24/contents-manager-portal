"use client";

import Link from "next/link";


function openNav() {
  document.getElementById("mySidenav")!.style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav")!.style.width = "0";
}

function SideBar({links}: {links: string[]} ) {
  return (
    <div id="mySidenav" className="sidenav">
      {links.map((link)=> (
        <Link key={link} href={`/${link.toLowerCase()}`} className="sidenav-link">{link} <br/></Link>
      ))}
      <span onClick={closeNav} className="closebtn">X</span>
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <main>
        <SideBar links={["Movies", "Webos"]} />

        <span onClick={openNav}>open</span>
      </main>
      <footer>
       
      </footer>
    </div>
  );
}
