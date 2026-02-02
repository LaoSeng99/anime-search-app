interface SocialLinkProps {
  href: string;
  src: string;
  alt: string;
  shadowColor: string;
  className?: string;
}

const SocialLink = ({
  href,
  src,
  alt,
  shadowColor,
  className,
}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-[0.3rem] group">
      <img
        alt={alt}
        src={src}
        className={`transition-all duration-700 ease-in-out transform 
                   group-hover:-translate-y-1.25 group-hover:transform-[rotateY(360deg)]
                   ${shadowColor} ${className}`}
      />
    </a>
  );
};

export default SocialLink;
