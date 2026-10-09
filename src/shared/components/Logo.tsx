import { Link } from "react-router";
import logo from "../../assets/landing/conversimlogo2.png";

interface LogoProps {
  to?: string;
  className?: string;
  hideTextOnMobile?: boolean;
}

export function Logo({ to = "/", className = "", hideTextOnMobile = false }: LogoProps) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <img src={logo} alt="Conversim" className="h-8 w-auto" />
      <div className={`${hideTextOnMobile ? "hidden sm:flex" : "flex"} flex-col leading-none`}>
        <span className="font-semibold text-base tracking-tight text-aurora-text">
          Conver<span className="text-brand">Sim</span>
        </span>
        <span className="text-[11px] text-aurora-text-3 font-medium">AI Avatar Studio</span>
      </div>
    </Link>
  );
}
