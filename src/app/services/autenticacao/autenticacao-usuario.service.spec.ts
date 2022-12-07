import { TestBed } from '@angular/core/testing';

import { AutenticacaoUsuarioService } from './autenticacao-usuario.service';

describe('AutenticacaoUsuarioService', () => {
  let service: AutenticacaoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
