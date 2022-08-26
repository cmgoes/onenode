interface Props {
  IconElement: React.FC,
  redirectLink: string,
  classname: string,
  text: string,
}

export default function NavItem({ IconElement, redirectLink, classname, text } : Props) {
  return (
    <a
      className={"cursor-pointer nav-item flex item-center font-semibold gap-x-6 py-4 pl-3 text-lg mx-4 hover:bg-zinc-200 hover:bg-opacity-50 rounded-xl focus:text-indigo-600 " + classname}
      href={redirectLink}
    >
      <IconElement />
      <span className="font-medium">{text}</span>
    </a>
  );
}
