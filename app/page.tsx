import Link from "next/link";

async function SideBar({links}: {links: string[]} ) {
  return (
    <div>
      {links.map((link)=> (
        <Link href={`/${link}`}>{link}</Link>
      ))}
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <main>
        <SideBar links={["movies"]} />
      </main>
      <footer>
       
      </footer>
    </div>
  );
}
