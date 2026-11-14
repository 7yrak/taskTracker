import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { authGuard, authInterceptor } from './auth';
import { KovaAuth, kovaGuard, kovaInterceptor } from './kova-auth';

/** En una instancia KOVA se inicia sesión con la cuenta KOVA; en el resto, con el acceso local. */
export const accessGuard: CanActivateFn = (route, state) =>
  inject(KovaAuth).pilot ? kovaGuard(route, state) : authGuard(route, state);

export const accessInterceptor: HttpInterceptorFn = (request, next) =>
  inject(KovaAuth).pilot ? kovaInterceptor(request, next) : authInterceptor(request, next);
