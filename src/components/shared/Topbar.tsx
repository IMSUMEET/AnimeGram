import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { userSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";


const Topbar = () => {

    const { mutate: signOut, isSuccess} = userSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
      if(isSuccess) navigate(0);
    }, [isSuccess])
    

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <div className="flex justify-center items-center gap-4">
                        <img className="rounded-full h-8 w-8" src="/assets/images/luffyLogo.jpg" alt="logo" />
                        <span className="text-xl">Animegram</span>
                    </div>
                </Link>
                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img src={user.imageUrl || '/assets/images/default-avatar.png'} alt="" className="h-8 w-8 rounded-full"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar