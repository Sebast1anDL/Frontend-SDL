"use client";

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useGetCategories } from "@/api/useGetCategories";

const MenuList = () => {
  const { result: categories, loading, error } = useGetCategories();

  // Mostrar skeleton mientras carga
  if (loading) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          {[...Array(4)].map((_, index) => (
            <NavigationMenuItem key={index}>
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // Si hay error, mostrar el menú estático como fallback
  if (error || !categories || categories.length === 0) {
    console.warn('Error loading dynamic menu, falling back to static menu:', error);
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/category/monitores"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              Monitores
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/category/tvs"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              TVs
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/category/notebooks"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              Notebooks
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/category/celulares"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              Celulares
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuLink 
              href={`/category/${category.slug}`}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              {category.categoryName}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;