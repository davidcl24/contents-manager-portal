import Link from "next/link";

async function SideBar({links}: {links: string[]} ) {
  return (
    <div>
      {links.map((link)=> (
        <Link key={link} href={`/${link.toLowerCase()}`}>{link} <br/></Link>
      ))}
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <main>
        <SideBar links={["Movies", "Webos"]} />
      </main>
      <footer>
       
      </footer>
    </div>
  );
}
