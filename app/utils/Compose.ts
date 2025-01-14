abstract class AbstractHandler {
    protected nextHandler?: AbstractHandler;

    setNext(handler: AbstractHandler): AbstractHandler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: HTMLElement, styles: any): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request, styles);
        }
    }
}

class ConcreteHandler extends AbstractHandler {
    handle(request: HTMLElement, styles: any): void {
        if (styles.color) {
            request.style.color = styles.color;
        }
        super.handle(request, styles);
    }
}


class CharacteristicsComposie{
    private characteristics : any[] = [];

    addCharacteristics(characteristic: any){
        this.characteristics.push(characteristic);
    }

    getDataFromCharacteristics(){
        return "";
    }
}
