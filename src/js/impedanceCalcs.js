import { ellipk } from './specialFunctions';

/**
 * Computes the lineImpedance of coplanar waveguide with only upper ground plane
 * @param {number} s - The width of the center trace
 * @param {number} w - The gap between trace and ground planes
 * @param {number} h - height above ground plane
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 * 
 * From Coplanar Waveguide Circuits, Components, and Systems. Rainee N. Simons
 * ISBNs: 0-471-16121-7 (Hardback); 0-471-22475-8 (Electronic)
 * Chapter 2
 */
export function cpw(s, w, h, eps_r) {
  
  const k0 = s/(s + 2*w);
  const k0p = Math.sqrt(1 - Math.pow(k0,2));
  const k1 = Math.sinh(Math.PI*s/(4*h)) / Math.sinh(Math.PI*(s + 2*w)/(4*h));
  const k1p = Math.sqrt(1 - Math.pow(k1,2));

  const eps_eff = 1 + (eps_r-1) / 2 * ellipk(k1) / ellipk(k1p) * ellipk(k0p) / ellipk(k0);

  const z0 = 30*Math.PI / Math.sqrt(eps_eff) * ellipk(k0p) / ellipk(k0);
  
  return {
    z0,
    eps_eff
  };
}

/**
 * Computes the lineImpedance of conductor-backed (grounded_ coplanar waveguide
 * @param {number} s - The width of the center trace
 * @param {number} w - The gap between trace and ground planes
 * @param {number} h - height above ground plane
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 * 
 * From Coplanar Waveguide Circuits, Components, and Systems. Rainee N. Simons
 * ISBNs: 0-471-16121-7 (Hardback); 0-471-22475-8 (Electronic)
 * Chapter 3
 */
export function gcpw(s, w, h, eps_r) {
  
  const k = s/(s + 2*w);
  const kp = Math.sqrt(1 - Math.pow(k,2));
  const k3 = Math.tanh(Math.PI*s/(4*h)) / Math.tanh(Math.PI*(s + 2*w)/(4*h));
  const k3p = Math.sqrt(1 - Math.pow(k3,2));

  const eps_eff = (1 + eps_r * ellipk(kp)/ellipk(k) * ellipk(k3)/ellipk(k3p)) / 
                  (1 + ellipk(kp)/ellipk(k) * ellipk(k3)/ellipk(k3p));

  const z0 = 60*Math.PI / Math.sqrt(eps_eff) * 1 / (ellipk(k)/ellipk(kp) + ellipk(k3)/ellipk(k3p));
  
  return {
    z0,
    eps_eff
  };
}

export function coax(r1,r2, eps_r) {
  return (138 / Math.sqrt(eps_r) * Math.log10(r2 / r1));
}

export default { cpw , gcpw, coax};

