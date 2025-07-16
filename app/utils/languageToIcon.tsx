import {
  SiC,
  SiCplusplus,
  SiCsharp,
  SiElixir,
  SiGo,
  SiHaskell,
  SiJavascript,
  SiKotlin,
  SiPerl,
  SiPhp,
  SiPython,
  SiR,
  SiRuby,
  SiRust,
  SiScala,
  SiShell,
  SiSwift,
  SiTypescript,
} from "react-icons/si";

function getLanguageIcon(language: string) {
  switch (language) {
    case "Python":
      return <SiPython size={15} className="mb-[2px]" />;
    case "C++":
      return <SiCplusplus size={15} className="mb-[2px]" />;
    case "C#":
      return <SiCsharp size={15} className="mb-[2px]" />;
    case "Ruby":
      return <SiRuby size={15} className="mb-[2px]" />;
    case "PHP":
      return <SiPhp size={15} className="mb-[2px]" />;
    case "Swift":
      return <SiSwift size={15} className="mb-[2px]" />;
    case "Go":
      return <SiGo size={15} className="mb-[2px]" />;
    case "Kotlin":
      return <SiKotlin size={15} className="mb-[2px]" />;
    case "Rust":
      return <SiRust size={15} className="mb-[2px]" />;
    case "TypeScript":
      return <SiTypescript size={15} className="mb-[2px]" />;
    case "Scala":
      return <SiScala size={15} className="mb-[2px]" />;
    case "R":
      return <SiR size={15} className="mb-[2px]" />;
    case "Haskell":
      return <SiHaskell size={15} className="mb-[2px]" />;
    case "Perl":
      return <SiPerl size={15} className="mb-[2px]" />;
    case "Elixir":
      return <SiElixir size={15} className="mb-[2px]" />;
    case "C":
      return <SiC size={15} className="mb-[2px]" />;
    case "Shell":
      return <SiShell size={15} className="mb-[2px]" />;
    default:
      return <SiJavascript size={15} className="mb-[2px]" />;
  }
}

export default getLanguageIcon;
