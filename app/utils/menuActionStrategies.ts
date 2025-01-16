import ROUTE_TEMPLATE_CONFIG from "~/config/routeTemplateConfig";

interface MenuActionStrategy {
    execute(action: string, navigate: Function, urlParamsManager: any, idView: string, idMenu: string, templateName:string): void;
  }
  
  export class EmptyMenuActionStrategy implements MenuActionStrategy {

    execute(action: string, navigate: Function, urlParamsManager: any, idView: string, idMenu: string, templateName: string): void {
      // urlParamsManager.setParams({
      //   menuItemSelected: urlParamsManager.getParams().menuItemSelected,
      //   defaultAttribute: { key: "", value: "", text: "" },
      //   attributeItemsSelected: {}
      // });
      navigate(`${ROUTE_TEMPLATE_CONFIG[templateName as keyof typeof ROUTE_TEMPLATE_CONFIG](idView, idMenu)}?${urlParamsManager.toString()}`);
    }
  }
  
  export class UrlMenuActionStrategy implements MenuActionStrategy {
    execute(action: string, navigate: Function, urlParamsManager: any, idView: string, idMenu: string,  templateName: string): void {
      const [actionType, url] = action.split(":");
      window.open(`/redirect/${url}`, '_blank');
    }
  }
  
  export class VistaMenuActionStrategy implements MenuActionStrategy {
    execute(action: string, navigate: Function, urlParamsManager: any, idView: string, idMenu: string,  templateName: string): void {
      const [actionType, vista] = action.split(":");
      // urlParamsManager.setParams({
      //   menuItemSelected: urlParamsManager.getParams().menuItemSelected,
      //   defaultAttribute: { key: "", value: "", text: "" },
      //   attributeItemsSelected: {}
      // });
      window.open(`/view/${idView}/menu/${idMenu}/template/listProduct2/breadcrumb/chiplist/filters/products?${urlParamsManager.toString()}`, "_blank");
    }
  }
  
  export class DefaultMenuActionStrategy implements MenuActionStrategy {
    execute(action: string, navigate: Function, urlParamsManager: any, idView: string, idMenu: string,  templateName: string): void {
      // urlParamsManager.setParams({
      //   menuItemSelected: urlParamsManager.getParams().menuItemSelected,
      //   defaultAttribute: { key: "", value: "", text: "" },
      //   attributeItemsSelected: {}
      // });
      navigate(`/view/${idView}/menu/${idMenu}/template/listProduct2/breadcrumb/chiplist/filters/products?${urlParamsManager.toString()}`);
    
      //navigate(`/templateBasic/vista/${idView}/menu/${idMenu}/Breadcrumb/chipts/filters/products?${urlParamsManager.toString()}`);
    }
  }