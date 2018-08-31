import { ellipk } from './specialFunctions';

/**
 * Computes the lineImpedance of coplanar waveguide with only upper ground plane
 * @param {number} s - The width of the center trace
 * @param {number} w - The gap between trace and ground planes
 * @param {number} h - height above ground plane
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 */
export function cpw(s, w, h, eps_r) {
  
  const k0 = s/(s+2*w);
  const k0p = Math.sqrt(1 - Math.pow(k0,2));
  const k1 = Math.sinh(Math.PI*s/(4*h)) / Math.sinh(Math.PI*(s+2*w)/(4*h));
  const k1p = Math.sqrt(1 - Math.pow(k1,2));

  const eps_eff = 1 + (eps_r-1) / 2 * ellipk(k1) / ellipk(k1p) * ellipk(k0p) / ellipk(k0);

  const z0 = 30*Math.PI / Math.sqrt(eps_eff) * ellipk(k0p) / ellipk(k0);
  
  return {
    z0,
    eps_eff
  };
}

export default { cpw };

