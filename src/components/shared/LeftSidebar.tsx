import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { userSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";



const LeftSidebar = () => {


  const { mutate: signOut, isSuccess} = userSignOutAccount();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
      if(isSuccess) navigate(0);
    }, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
            <div className="flex justify-center items-center gap-4">
                <img className="rounded-full h-8 w-8" src="/assets/images/luffyLogo.jpg" alt="logo" />
                <span className="text-xl">Animegram</span>
            </div>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 iterms-center">
          <img src={user.imageUrl || `/assets/icons/profile-placeholder.svg`} alt="profile" className="h-8 w-8 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && `bg-primary-500`}` }>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && `invert-white`}`} />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>


        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
        </Button>
    </nav>
  )
}

export default LeftSidebar