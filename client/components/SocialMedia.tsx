import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com",
    icon: <Github className="h-5 w-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com",
    icon: <Slack className="h-5 w-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5 text-zinc-400", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hoverEffect rounded-full border p-2 hover:border-white hover:text-white",
                  iconClassName,
                )}
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "text-darkColor bg-white font-semibold",
                tooltipClassName,
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
