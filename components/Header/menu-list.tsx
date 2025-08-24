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
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* TVs */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>TVs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/tvs/Enxuta" title="Enxuta">
                Televisores prácticos y accesibles para el día a día.
              </ListItem>
              <ListItem href="/tvs/Smartlife" title="Smartlife">
                Smart TVs funcionales y fáciles de usar en tu hogar.
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
                Rendimiento confiable para estudio y trabajo.
              </ListItem>
              <ListItem href="/notebooks/Lenovo" title="Lenovo">
                Versatilidad con modelos 2 en 1 y gran durabilidad.
              </ListItem>
              <ListItem href="/notebooks/Acer" title="Acer">
                Opciones económicas con buen balance entre potencia y precio.
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
                Ecosistema Apple con cámaras y rendimiento insuperables.
              </ListItem>
              <ListItem href="/celulares/samsung" title="Samsung">
                Modelos Galaxy con innovación y calidad en cada gama.
              </ListItem>
              <ListItem href="/celulares/xiaomi" title="Xiaomi">
                Celulares potentes y accesibles con MIUI y gran batería.
              </ListItem>
              <ListItem href="/celulares/huawei" title="Huawei">
                Fotografía móvil de nivel profesional con diseño elegante.
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
