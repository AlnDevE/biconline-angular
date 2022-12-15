import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';
import { ValidatorsService } from './validators.service';

@Injectable({
  providedIn: 'root',
})
export class UserExistsService {
  constructor(private validatorsService: ValidatorsService) {}

  userExistsByEmail() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((userEmail) =>
          this.validatorsService.verifyUserExistsByEmail(userEmail)
        ),
        map((usuarioExiste) =>
          usuarioExiste ? { userExists: true } : null
        ),
        first()
      );
    };
  }
}
