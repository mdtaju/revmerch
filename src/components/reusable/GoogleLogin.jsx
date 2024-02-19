import Image from "next/image";
import GoogleIcon from "/public/assets/images/google_icon.svg";

const GoogleLogin = ({ ...rest }) => {
      return (
            <button {...rest} className="w-[94px] h-[61px] grid place-items-center rounded-md bg-[#FDF5F5] hover:brightness-110 common_transition active:scale-95">
                  <Image
                        src={GoogleIcon}
                        alt="google"
                  />
            </button>
      );
};

export default GoogleLogin;