// import LoginIcon from '@mui/icons-material/Login';
const NavButtons = ({ title }) => {
    return (
      <button className="px-3.5 py-[2px] m-1 overflow-hidden relative group cursor-pointer border border-violet-400 font-medium text-white">
        <span className="absolute w-64 h-0 transition-all origin-center rotate-45 -translate-x-20 bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease duration-1000"></span>
        <span className="relative text-white transition duration-300 ease font-medium tracking-wider">
         {title}
        </span>
      </button>
    );
  };
  
  export default NavButtons;