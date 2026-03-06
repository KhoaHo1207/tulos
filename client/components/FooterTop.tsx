import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "New Orlean, USA",
    icon: (
      <MapPin className="group-hover:text-darkColor h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+12 958 648 597",
    icon: (
      <Phone className="group-hover:text-darkColor h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="group-hover:text-darkColor h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "tulos@gmail.com",
    icon: (
      <Mail className="group-hover:text-darkColor h-6 w-6 text-gray-600 transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 gap-8 border-b md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, index) => (
        <ContactItem
          key={index}
          icon={item.icon}
          title={item.title}
          content={item.subtitle}
        />
      ))}
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactItem = ({ icon, title, content }: ContactItemProps) => {
  return (
    <div className="group flex items-center gap-3 p-4 transition-colors hover:bg-gray-50">
      {icon}
      <div>
        <h3 className="group-hover:text-darkColor font-semibold text-gray-900 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 transition-colors group-hover:text-gray-900">
          {content}
        </p>
      </div>
    </div>
  );
};

export default FooterTop;
