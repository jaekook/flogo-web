import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { _throw } from 'rxjs/observable/throw';

import { RestApiService } from '../rest-api.service';
// TriggersBackendService
// TriggersApiService
// TriggerStorage
// TriggerRepository
@Injectable()
export class TriggersApiService {
  constructor(private restApi: RestApiService) {
  }

  listTriggersForApp(appId) {
    return this.restApi.get<any>(`apps/${appId}/triggers`)
      .toPromise();
  }

  createTrigger(appId, trigger: any) {
    return this.restApi.post<any>(`apps/${appId}/triggers`, trigger)
      .toPromise();
  }

  getTrigger(triggerId) {
    return this.restApi.get<any>(`triggers/${triggerId}`)
      .toPromise();
  }

  updateTrigger(triggerId: string, trigger: any) {
    return this.restApi
      .patch<any>(`triggers/${triggerId}`, trigger)
      // extract errors
      .catch((err: HttpErrorResponse) => {
        return _throw(this.extractErrors(err));
      })
      .toPromise();
  }

  deleteTrigger(triggerId: string) {
    return this.restApi.delete(`triggers/${triggerId}`)
      .toPromise();
  }

  private extractErrors(error: HttpErrorResponse | any) {
    const body = error.error;
    if (body instanceof Error) {
      return new Error(`Unknown error: error.error.message`);
    } else {
      return body.errors || [body];
    }
  }

}
