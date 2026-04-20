import React from "react";

const Footer: React.FC = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Bryt19" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/bright-akoto19" },
    { name: "Twitter", url: "https://x.com/airxqhobarbryt" },
    { name: "Email", url: "mailto:Ac.bryt19@gmail.com" },
    { name: "Instagram", url: "https://www.instagram.com/jiggy_soul/" },
  ];

  return (
    <footer className="bg-white dark:bg-dark-950 border-t border-dark-100 dark:border-dark-800">
      <div className="container-custom">
        <div className="py-20 md:py-32">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
            
            {/* Brand Logo & Tagline */}
            <div className="lg:w-1/3 space-y-8">
              <a href="/" className="inline-block group">
                <div className="flex items-center gap-0.5 select-none">
                  {/* Left bracket */}
                  <span className="text-3xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{'<'}</span>
                  {/* Wordmark */}
                  <span className="font-mono font-black text-3xl tracking-tight">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">$</span>
                    <span className="text-dark-900 dark:text-white">.dev</span>
                  </span>
                  {/* Right bracket with slash */}
                  <span className="text-3xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{'/>'}</span>
                </div>
              </a>
              <p className="text-xl md:text-2xl text-dark-500 dark:text-dark-400 font-light leading-snug">
                Building refined digital experiences through considered design and engineering.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-16 sm:gap-24">
              {/* Quick Links */}
              <div className="space-y-8">
                <h4 className="text-xs font-black text-dark-400 uppercase tracking-widest">
                  Navigation
                </h4>
                <div className="flex flex-col space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Projects", href: "/projects" },
                    { name: "Blog", href: "/blog" },
                    { name: "Contact", href: "/contact" }
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-base font-bold text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors duration-300 uppercase tracking-widest w-fit"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary-500 rounded-full transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary-500 text-xs">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-8">
                <h4 className="text-xs font-black text-dark-400 uppercase tracking-widest">
                  Social
                </h4>
                <div className="flex flex-col space-y-3">
                  {socialLinks.map(({ name, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-base font-bold text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors duration-300 uppercase tracking-widest w-fit"
                    >
                      <span className="relative">
                        {name}
                        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary-500 rounded-full transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary-500 text-xs">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-dark-100 dark:border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-bold text-dark-400 uppercase tracking-widest">
              © {new Date().getFullYear()} BRIGHT AKOTO. ALL RIGHTS RESERVED.
            </p>
            <p className="text-sm font-bold text-dark-400 uppercase tracking-widest">
              BUILT WITH PRECISION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
