"use client";

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        
        {/* Monitores */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Monitores</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[300px]">
              <ListItem href="/monitores/Asus" title="Asus">
                Experiencia inmersiva para gaming y productividad.
              </ListItem>
              <ListItem href="/monitores/Samsung" title="Samsung">
                Monitores confiables y comodos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* TVs */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>TVs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/tvs/Samsung" title="Samsung">
                Calidad ultra alta definición para tu hogar.
              </ListItem>
              <ListItem href="/tvs/Enxuta" title="Enxuta">
                Tamaño perfecto para salas medianas.
              </ListItem>
              <ListItem href="/tvs/Smartlife" title="Smartlife">
                Experiencia cinematográfica en casa.
              </ListItem>
              <ListItem href="/tvs/Xiaomi" title="Xiaomi">
                Pantallas grandes para máximo impacto.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Notebooks */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Notebooks</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/notebooks/HP" title="HP">
                Potencia máxima para juegos y creatividad.
              </ListItem>
              <ListItem href="/notebooks/Asus" title="Asus">
                Portátiles ligeros para profesionales.
              </ListItem>
              <ListItem href="/notebooks/Lenovo" title="Lenovo">
                Versatilidad de tablet y laptop.
              </ListItem>
              <ListItem href="/notebooks/Acer" title="Acer">
                Opciones económicas y funcionales.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Celulares */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Celulares</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/celulares/iphone" title="iPhone">
                La última tecnología de Apple.
              </ListItem>
              <ListItem href="/celulares/samsung" title="Samsung">
                Innovación y calidad Android.
              </ListItem>
              <ListItem href="/celulares/xiaomi" title="Xiaomi">
                Gran relación calidad-precio.
              </ListItem>
              <ListItem href="/celulares/huawei" title="Huawei">
                Tecnología avanzada y diseño elegante.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Componente auxiliar para los items de la lista
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-gray-100 hover:text-gray-900",       // estilo en tema claro
            "dark:hover:bg-gray-800 dark:hover:text-white", // estilo en tema oscuro
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default MenuList;
