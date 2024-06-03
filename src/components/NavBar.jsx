function NavBar() {
  return (
    <>
      <div className="position: absolute left-1/2 -translate-x-1/2">
        <ul className="text-white flex p-4 space-x-4 uppercase text-xs font-bold ">
          <li>LOGO</li>
          <li>Sign In</li>
          <li>Create Account</li>
          <li>Films</li>
          <li>Lists</li>
          <li>Members</li>
          <li>Journal</li>
          <li>
            <input
              className="p-0.5 rounded-full"
              placeholder="Search..."></input>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
