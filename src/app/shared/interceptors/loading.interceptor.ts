import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";

let pendingRequest = 0
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading()
    pendingRequest += 1
    return next.handle(request).pipe(
        tap({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    this.handleHideLoading()
                }
            },
            error: (_) => {
                this.handleHideLoading()
            }
        })
    )
  }
  handleHideLoading() {
    pendingRequest -= 1
    if(pendingRequest === 0) {
        this.loadingService.hideLoading()
    }
  }

}
