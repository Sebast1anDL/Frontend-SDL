"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, Heart, User } from "lucide-react";
import Image from "next/image";
import MenuList from "./menu-list";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Izquierda */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo2.png"
                alt="SDL Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          {/* MenuList - Centro */}
          <div className="hidden md:flex flex-1 justify-center">
            <MenuList />
          </div>

          {/* Acciones - Derecha */}
          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2 animate-in slide-in-from-right-2 duration-300">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-64 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <button
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-colors text-sm"
                    onMouseDown={(e) => e.preventDefault()} // Evita que se cierre el input
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                // Botón de búsqueda
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Favoritos */}
            <button
              className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-200 relative"
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
            </button>

            {/* Carrito */}
            <button
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200 relative"
              aria-label="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Cuenta */}
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Mi cuenta"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile MenuList - Aparece abajo en mobile */}
        <div className="md:hidden border-t border-border py-2">
          <MenuList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
