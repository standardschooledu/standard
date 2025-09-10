import { AppSidebar } from '@/components/app-sidebar'
import AuthGuard from '@/components/AuthGuard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { Home, Users } from 'lucide-react'
import React from 'react'

const menuItems = [
  {
    title: "Dashboard",
    url: "/teacher",
    icon: <Home />,
  },
  {
    title: "Class",
    url: "/teacher",
    icon: <Users />,
  }
]

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar menuItems={menuItems} />
        <SidebarInset>
          <header className="flex sticky top-0 z-50 bg-white border-b mb-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Teacher</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}

export default layout