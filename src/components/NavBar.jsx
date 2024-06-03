function NavBar() {
  return (
    <>
      <div className="navbar position: absolute w-screen">
        <ul className="flex items-center justify-center text-white flex p-4 space-x-4 uppercase text-xs font-bold ">
          <li className="cursor-pointer">LOGO</li>
          <li className="to-hide cursor-pointer">Sign In</li>
          <li className="to-hide cursor-pointer">Create Account</li>
          <li className="to-hide cursor-pointer">Films</li>
          <li className="to-hide cursor-pointer">Lists</li>
          <li className="to-hide  cursor-pointer">Members</li>
          <li className="to-hide  cursor-pointer">Journal</li>
          <li>
            <input
              className="p-0.5 rounded-full text-black pl-1 "
              placeholder="Search..."></input>
          </li>
        </ul>
        <div className="position:relative">
          <div className="sidebar position: absolute bg-black h-screen w-1/3 top-0 right-0">
            <ul className="flex flex-col items-center justify-center text-white p-4 space-y-4 uppercase text-xs font-bold">
              <li className="cursor-pointer">Sign In</li>
              <li className="cursor-pointer">Create Account</li>
              <li className="cursor-pointer">Films</li>
              <li className="cursor-pointer">Lists</li>
              <li className="cursor-pointer">Members</li>
              <li className="cursor-pointer">Journal</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
