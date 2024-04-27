import InditexLogo from "@/assets/images/inditex.component.svg";
import IconHamburger from "@/assets/images/hamburger.component.svg";
import IconTrophy from "@/assets/images/trophy.component.svg";
import IconRocket from "@/assets/images/rocket.component.svg";
import IconUser from "@/assets/images/user.component.svg";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20 z-50">
      <div className="inline-flex items-center">
        <button type="button" className="pr-4">
          <IconHamburger />
        </button>

        <Link to="/">
          <div className="hidden md:block">
            <InditexLogo />
          </div>
        </Link>
      </div>

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="block">
            <div className="inline-flex items-center justify-evenly relative border rounded-full hover:shadow px-2 py-1 w-32">
              <Link to="/all-stars/feed">
                <IconRocket />
              </Link>

              <Link to="/all-stars/achievements">
                <IconTrophy />
              </Link>

              <button type="button">
                <IconUser />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
