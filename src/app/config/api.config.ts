import {isKovaInstancePath} from '../core/instance-path';
// Las instancias KOVA usan su propia API y base de datos en el mismo origen;
// el resto usa el host que sirve el frontend (red local y Tailscale).
const base = new URL(document.querySelector('base')?.href || '/', window.location.origin);
const apiUrl = isKovaInstancePath(base.pathname)
  ? new URL('api', base)
  : base.pathname === '/tasktracker/'
    ? new URL('/tasktracker-api', window.location.origin)
    : new URL('api', base);
export const API_BASE_URL = apiUrl.toString();
