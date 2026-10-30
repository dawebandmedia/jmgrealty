import { developments } from "../../content";
import { BreadcrumbData } from "../../site-info";
export default async function DevelopmentLayout({children,params}:{children:React.ReactNode;params:Promise<{id:string}>}) {
 const {id}=await params;const development=developments.find(item=>item.id===id);
 return <>{development && <BreadcrumbData items={[{name:"Developments",path:"/developments"},{name:development.name,path:`/developments/${id}`}]} />}{children}</>;
}
