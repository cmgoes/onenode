export default function NavItem(props) {
  return (
    <a
      className={"cursor-pointer nav-item flex item-center font-semibold gap-x-6 py-4 pl-3 text-lg mx-4 hover:bg-zinc-200 hover:bg-opacity-50 rounded-xl focus:text-indigo-600 " + props.classname}
      href={props.redirectLink}
    >
      <props.IconElement classname={"w-7 h-7 icon"} />
      <span className="font-medium">{props.text}</span>
    </a>
  );
}
