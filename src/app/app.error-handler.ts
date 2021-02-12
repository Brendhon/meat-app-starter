import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { LoginService } from "./security/login/login.service";
import { NotificationService } from "./shared/messages/notification.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(
    private ns: NotificationService,
    private injector: Injector,
    private zone: NgZone,
  ) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const msg = errorResponse.error.message;

      // Angular trabalha com zonas, portanto, como a aplicação quebrou o notifier perdeu a zona
      // Por essa razão devemos adiciona-la novamente
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.ns.notify(msg || "Não autorizado");
            break;
          case 404:
            this.ns.notify(msg || "Recurso não encontrado");
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
