import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useState } from "react";
import { motion } from "framer-motion";
import NavButtons from "../../buttons/NavButtons";

const Header = () => {
  // navmenus
  const navMenus = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/contact",
      title: "Contact",
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);

  const handleSearch = event =>{
    event.preventDefault();
  }
  return (
    <>
      <nav>
        {/* Large Device */}
        <div className=" text-white tour_container py-3 bg-black flex justify-between items-center">
          <div>
            <Link to="/" className="logo font-bol text-2xl">AppliWiz</Link>
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <input
              type="text"
              className="py-[7px] w-96 text-sm px-2 rounded-l focus:outline-none text-black"
              placeholder="Search"
            />
            <button
              type="submit"
              className="bg-white py-[4.8px] px-2 text-black rounded-r"
            >
              <SearchIcon className="" />
            </button>
          </form>
          {/* Nav Menus */}
          <ul className="text-sm hidden md:flex items-center gap-8">
            {navMenus.map((menu, index) => (
              <li
                key={index}
                className="hover:text-violet-500 transition-all duration-500 ease-in-out font-medium text-lg"
              >
                <NavLink to={menu.path}>{menu.title}</NavLink>
              </li>
            ))}
          </ul>
          <div className="inline-flex items-center gap-1">
            <Link to="/login">
              <NavButtons title={"Get Start"} />
            </Link>
            {/*Open Menu Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="lg:hidden cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <CloseIcon style={{ fontSize: "2.6rem" }} className="" />
              ) : (
                <MenuIcon style={{ fontSize: "2.6rem" }} className="" />
              )}
            </motion.div>
          </div>
        </div>
      </nav>
      {openMenu && (
        // Extra Section for black shadow
        <>
          <div
            className="fixed z-10 top-0 left-0 w-full h-full bg-[#00000085] transition "
            onClick={() => setOpenMenu(!openMenu)}
          ></div>
          <nav className="bg-black z-20 text-white w-1/2 md:w-1/3 lg:hidden fixed top-0 h-screen  transition-transform duration-700 ease-in-out">
            <div className="flex items-center justify-between px-2 pt-4">
              <span className="logo font-bold text-2xl">appliwiz</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: 0.5,
                }}
                onClick={() => setOpenMenu(!openMenu)}
                className="cursor-pointer"
              >
                <KeyboardDoubleArrowLeftIcon style={{ fontSize: "2.7rem" }} />
              </motion.div>
            </div>
            <ul className="pt-40 space-y-2">
              {navMenus.map((menu, index) => (
                <motion.li
                  whileHover={{ scale: 1.5 }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  key={index}
                  className="text-center cursor-pointer py-2"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <NavLink to={menu.path}>{menu.title}</NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
