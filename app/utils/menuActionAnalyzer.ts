import {
    MenuActionStrategy,
    EmptyMenuActionStrategy,
    UrlMenuActionStrategy,
    VistaMenuActionStrategy,
    DefaultMenuActionStrategy,
} from "./menuActionStrategies";

class ActionAnalyzer {
    private strategy: MenuActionStrategy;

    constructor() {
        this.strategy = new DefaultMenuActionStrategy();
    }

    setStrategy(strategy: MenuActionStrategy) {
        this.strategy = strategy;
    }

    analyze(action: string, navigate: Function, urlParamsManager: any, idVista: string, idMenu: string, templateName: undefined): void {

        if (action === "") {
            this.setStrategy(new EmptyMenuActionStrategy());
        } else if (action.startsWith("URL:")) {
            this.setStrategy(new UrlMenuActionStrategy());
        } else if (action.startsWith("Vista:")) {
            this.setStrategy(new VistaMenuActionStrategy());
        } else {
            this.setStrategy(new DefaultMenuActionStrategy());
        }

        this.strategy.execute(action, navigate, urlParamsManager, idVista, idMenu, templateName);
    }
}

export default ActionAnalyzer;