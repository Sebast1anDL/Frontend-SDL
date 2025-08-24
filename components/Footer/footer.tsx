'use client';

import React from 'react';
import {Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const dataFooter = [
    {
        id: 1,
        name: "Mi cuenta",
        href: "#mi-cuenta"
    },
];

// Define las categorías con sus slugs correspondientes
const categories = [
  { name: "Monitores", slug: "monitores" },
  { name: "TVs", slug: "tv" },
  { name: "Notebooks", slug: "notbooks" },
  { name: "Celulares", slug: "celulares" }
];

const Footer = () => {
  const router = useRouter();

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/category/${categorySlug}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="block md:hidden py-8">
          {/* Logo y texto centrado */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Image
                src="/logo2.png"
                alt="SDL Logo"
                width={60}
                height={60}
              />
            </div>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Tu tienda de confianza para tecnología. Calidad garantizada y los mejores precios.
            </p>
          </div>

          {/* Categorías en móvil */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Productos</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm p-2 text-center border border-gray-700 rounded-lg hover:border-gray-600"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Redes sociales centradas */}
          <div className="flex justify-center space-x-6 mt-6">
            <a 
              href="https://www.linkedin.com/in/sebasti%C3%A1n-di-loreto-chavez-759605357/" 
              className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/Sebast1anDL" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-6 text-center space-y-2">
            <p className="text-gray-400 text-xs">
              © 2025 SDL E-commerce. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              Desarrollado por <span className="text-gray-400">Sebastián Di Loreto</span>
            </p>
          </div>
        </div>

        <div className="hidden md:block py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo2.png"
                  alt="SDL Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Tu tienda de confianza para monitores, celulares, TVs y notebooks. 
                Calidad garantizada y los mejores precios del mercado.
              </p>
              
              {/* Redes sociales */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/sebasti%C3%A1n-di-loreto-chavez-759605357/" 
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/Sebast1anDL" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {dataFooter.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={item.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Productos</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <button 
                      onClick={() => handleCategoryClick(category.slug)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left w-full hover:translate-x-1 transform transition-transform"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">111 111 111</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">diloretoseba@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Montevideo, Uruguay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 SDL E-commerce. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs">
                Desarrollado por <span className="text-gray-400">Sebastián Di Loreto</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;